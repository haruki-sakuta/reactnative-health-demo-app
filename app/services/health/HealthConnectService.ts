import { Platform } from "react-native";
import { IHealthConnectService } from "../../types/health";
// import HealthConnect from "react-native-health-connect";

interface HealthConnectModule {
  initialize(): Promise<void>;
  getSdkStatus(): Promise<number>;
  requestPermission(permissions: any[]): Promise<any[]>;
  readRecords(type: string, options: any): Promise<any>;
  insertRecords(records: any[]): Promise<void>;
  SdkAvailabilityStatus: {
    SDK_UNAVAILABLE: number;
    SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED: number;
  };
}

interface ActiveCaloriesBurnedRecord {
  energy: {
    inKilocalories: number;
    inKilojoules: number;
    inJoules: number;
    inCalories: number;
  };
  startTime: string;
  endTime: string;
  metadata?: {
    dataOrigin: string;
    lastModifiedTime: string;
    id: string;
  };
}

interface NutritionRecord {
  nutrition: {
    inGrams: number;
    mealType?: string;
  };
}

let HealthConnect: HealthConnectModule | undefined;
if (Platform.OS === "android") {
  HealthConnect = require("react-native-health-connect");
}

// 定数の定義を数値に変更
const SEXUAL_ACTIVITY_TYPES = {
  NONE: 0,
  PROTECTED: 1,
  UNPROTECTED: 2,
} as const;

// 日本語表示用のマッピング
const SEXUAL_ACTIVITY_TYPES_JA: Record<number, string> = {
  [SEXUAL_ACTIVITY_TYPES.NONE]: "なし",
  [SEXUAL_ACTIVITY_TYPES.PROTECTED]: "避妊あり",
  [SEXUAL_ACTIVITY_TYPES.UNPROTECTED]: "避妊なし",
};

type SexualActivityType = (typeof SEXUAL_ACTIVITY_TYPES)[keyof typeof SEXUAL_ACTIVITY_TYPES];

export class HealthConnectService implements IHealthConnectService {
  private readonly SEXUAL_ACTIVITY_TYPES = SEXUAL_ACTIVITY_TYPES;

  async initialize(): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    const status = await HealthConnect.getSdkStatus();
    if (status === HealthConnect.SdkAvailabilityStatus.SDK_UNAVAILABLE) {
      throw new Error("Health Connect is not installed");
    }

    if (status === HealthConnect.SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED) {
      throw new Error("Health Connect provider update required");
    }

    await HealthConnect.initialize();
  }

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS !== "android" || !HealthConnect) return false;

    const permissions = await HealthConnect.requestPermission([
      { accessType: "read", recordType: "ActiveCaloriesBurned" },
      { accessType: "write", recordType: "ActiveCaloriesBurned" },
      { accessType: "read", recordType: "BasalBodyTemperature" },
      { accessType: "write", recordType: "BasalBodyTemperature" },
      { accessType: "read", recordType: "BasalMetabolicRate" },
      { accessType: "write", recordType: "BasalMetabolicRate" },
      { accessType: "read", recordType: "BloodGlucose" },
      { accessType: "write", recordType: "BloodGlucose" },
      { accessType: "read", recordType: "BloodPressure" },
      { accessType: "write", recordType: "BloodPressure" },
      { accessType: "read", recordType: "BodyFat" },
      { accessType: "write", recordType: "BodyFat" },
      { accessType: "read", recordType: "BodyTemperature" },
      { accessType: "write", recordType: "BodyTemperature" },
      { accessType: "read", recordType: "BoneMass" },
      { accessType: "write", recordType: "BoneMass" },
      { accessType: "read", recordType: "CervicalMucus" },
      { accessType: "write", recordType: "CervicalMucus" },
      { accessType: "read", recordType: "CyclingPedalingCadence" },
      { accessType: "write", recordType: "CyclingPedalingCadence" },
      { accessType: "read", recordType: "Distance" },
      { accessType: "write", recordType: "Distance" },
      { accessType: "read", recordType: "ElevationGained" },
      { accessType: "write", recordType: "ElevationGained" },
      { accessType: "read", recordType: "ExerciseSession" },
      { accessType: "write", recordType: "ExerciseSession" },
      { accessType: "read", recordType: "FloorsClimbed" },
      { accessType: "write", recordType: "FloorsClimbed" },
      { accessType: "read", recordType: "HeartRate" },
      { accessType: "write", recordType: "HeartRate" },
      { accessType: "read", recordType: "Height" },
      { accessType: "write", recordType: "Height" },
      { accessType: "read", recordType: "Hydration" },
      { accessType: "write", recordType: "Hydration" },
      { accessType: "read", recordType: "LeanBodyMass" },
      { accessType: "write", recordType: "LeanBodyMass" },
      { accessType: "read", recordType: "MenstruationFlow" },
      { accessType: "write", recordType: "MenstruationFlow" },
      { accessType: "read", recordType: "MenstruationPeriod" },
      { accessType: "write", recordType: "MenstruationPeriod" },
      { accessType: "read", recordType: "Nutrition" },
      { accessType: "write", recordType: "Nutrition" },
      { accessType: "read", recordType: "OvulationTest" },
      { accessType: "write", recordType: "OvulationTest" },
      { accessType: "read", recordType: "OxygenSaturation" },
      { accessType: "write", recordType: "OxygenSaturation" },
      { accessType: "read", recordType: "Power" },
      { accessType: "write", recordType: "Power" },
      { accessType: "read", recordType: "RespiratoryRate" },
      { accessType: "write", recordType: "RespiratoryRate" },
      { accessType: "read", recordType: "RestingHeartRate" },
      { accessType: "write", recordType: "RestingHeartRate" },
      { accessType: "read", recordType: "SexualActivity" },
      { accessType: "write", recordType: "SexualActivity" },
      { accessType: "read", recordType: "SleepSession" },
      { accessType: "write", recordType: "SleepSession" },
      { accessType: "read", recordType: "Speed" },
      { accessType: "write", recordType: "Speed" },
      { accessType: "read", recordType: "StepsCadence" },
      { accessType: "write", recordType: "StepsCadence" },
      { accessType: "read", recordType: "Steps" },
      { accessType: "write", recordType: "Steps" },
      { accessType: "read", recordType: "TotalCaloriesBurned" },
      { accessType: "write", recordType: "TotalCaloriesBurned" },
      { accessType: "read", recordType: "Vo2Max" },
      { accessType: "write", recordType: "Vo2Max" },
      { accessType: "read", recordType: "Weight" },
      { accessType: "write", recordType: "Weight" },
      { accessType: "read", recordType: "WheelchairPushes" },
      { accessType: "write", recordType: "WheelchairPushes" },
    ]);
    return permissions.length > 0;
  }

  async fetchAllHealthData(): Promise<{
    activeCaloriesBurned: string | null;
    basalBodyTemperature: string | null;
    basalMetabolicRate: string | null;
    bloodGlucose: string | null;
    bloodPressure: { systolic: string; diastolic: string } | null;
    bodyFat: string | null;
    bodyTemperature: string | null;
    boneMass: string | null;
    cervicalMucus: string | null;
    cyclingPedalingCadence: string | null;
    distance: string | null;
    elevationGained: string | null;
    exerciseSession: string | null;
    floorsClimbed: string | null;
    heartRate: string | null;
    height: string | null;
    hydration: string | null;
    leanBodyMass: string | null;
    menstruationFlow: string | null;
    menstruationPeriod: string | null;
    nutrition: string | null;
    ovulationTest: string | null;
    oxygenSaturation: string | null;
    power: string | null;
    respiratoryRate: string | null;
    restingHeartRate: string | null;
    sexualActivity: string | null;
    sleepSession: string | null;
    speed: string | null;
    stepsCadence: string | null;
    steps: string | null;
    totalCaloriesBurned: string | null;
    vo2Max: string | null;
    weight: string | null;
    wheelchairPushes: string | null;
  } | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const [
        activeCaloriesBurned,
        basalBodyTemperature,
        basalMetabolicRate,
        bloodGlucose,
        bloodPressure,
        bodyFat,
        bodyTemperature,
        boneMass,
        cervicalMucus,
        cyclingPedalingCadence,
        distance,
        elevationGained,
        exerciseSession,
        floorsClimbed,
        heartRate,
        height,
        hydration,
        leanBodyMass,
        menstruationFlow,
        menstruationPeriod,
        nutrition,
        ovulationTest,
        oxygenSaturation,
        power,
        respiratoryRate,
        restingHeartRate,
        sexualActivity,
        sleepSession,
        speed,
        stepsCadence,
        steps,
        totalCaloriesBurned,
        vo2Max,
        weight,
        wheelchairPushes,
      ] = await Promise.all([
        this.fetchActiveCaloriesBurned(),
        this.fetchBasalBodyTemperature(),
        this.fetchBasalMetabolicRate(),
        this.fetchBloodGlucose(),
        this.fetchBloodPressure(),
        this.fetchBodyFat(),
        this.fetchBodyTemperature(),
        this.fetchBoneMass(),
        this.fetchCervicalMucus(),
        this.fetchCyclingPedalingCadence(),
        this.fetchDistance(),
        this.fetchElevationGained(),
        this.fetchExerciseSession(),
        this.fetchFloorsClimbed(),
        this.fetchHeartRate(),
        this.fetchHeight(),
        this.fetchHydration(),
        this.fetchLeanBodyMass(),
        this.fetchMenstruationFlow(),
        this.fetchMenstruationPeriod(),
        this.fetchNutrition(this.NUTRITION_TYPES.PROTEIN),
        this.fetchOvulationTest(),
        this.fetchOxygenSaturation(),
        this.fetchPower(),
        this.fetchRespiratoryRate(),
        this.fetchRestingHeartRate(),
        this.fetchSexualActivity(),
        this.fetchSleepSession(),
        this.fetchSpeed(),
        this.fetchStepsCadence(),
        this.fetchSteps(),
        this.fetchTotalCaloriesBurned(),
        this.fetchVo2Max(),
        this.fetchWeight(),
        this.fetchWheelchairPushes(),
      ]);

      return {
        activeCaloriesBurned,
        basalBodyTemperature,
        basalMetabolicRate,
        bloodGlucose,
        bloodPressure,
        bodyFat,
        bodyTemperature,
        boneMass,
        cervicalMucus,
        cyclingPedalingCadence,
        distance,
        elevationGained,
        exerciseSession,
        floorsClimbed,
        heartRate,
        height,
        hydration,
        leanBodyMass,
        menstruationFlow,
        menstruationPeriod,
        nutrition,
        ovulationTest,
        oxygenSaturation,
        power,
        respiratoryRate,
        restingHeartRate,
        sexualActivity,
        sleepSession,
        speed,
        stepsCadence,
        steps,
        totalCaloriesBurned,
        vo2Max,
        weight,
        wheelchairPushes,
      };
    } catch (error) {
      console.error("Fetch all health data error:", error);
      return null;
    }
  }

  // データ取得・保存
  async fetchActiveCaloriesBurned(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      // 過去24時間のデータを取得
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

      const data = await HealthConnect.readRecords("ActiveCaloriesBurned", {
        timeRangeFilter: {
          operator: "between",
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        // 24時間分の合計を計算
        const totalCalories = data.records.reduce((sum: number, record: ActiveCaloriesBurnedRecord) => {
          return sum + Number(record.energy.inKilocalories);
        }, 0);
        return totalCalories.toString();
      }
      return null;
    } catch (error) {
      console.error("Fetch active calories burned error:", error);
      return null;
    }
  }

  async saveActiveCaloriesBurned(activeCaloriesBurned: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    // 1日あたりの消費カロリーは0-10000kcalの範囲でバリデーション
    const value = this.validateNumericInput(activeCaloriesBurned, 0, 10000);
    console.log("save value:", value);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 60 * 1000); // 1時間前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "ActiveCaloriesBurned",
          energy: {
            value: value,
            unit: "kilocalories",
          },
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
          metadata: {
            dataOrigin: "com.example.DemoHealthExpoApp",
          },
        },
      ]);
    } catch (error: any) {
      console.error("Save active calories burned error:", JSON.stringify(error));
      throw new Error(`アクティブ消費カロリーの保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchBasalBodyTemperature(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("BasalBodyTemperature", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const basalBodyTemperatureValue = Number(latestRecord.temperature.inCelsius);
        return !isNaN(basalBodyTemperatureValue) ? basalBodyTemperatureValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch basal body temperature error:", error);
      return null;
    }
  }

  async saveBasalBodyTemperature(basalBodyTemperature: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = this.validateNumericInput(basalBodyTemperature, 34, 45);
    console.log("save value:", value);
    const now = new Date();

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "BasalBodyTemperature",
          temperature: {
            value: value,
            unit: "celsius",
          },
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save basal body temperature error:", JSON.stringify(error));
      throw new Error(`基礎体温の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchBasalMetabolicRate(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("BasalMetabolicRate", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const basalMetabolicRateValue = Number(latestRecord.basalMetabolicRate.inKilocaloriesPerDay);
        return !isNaN(basalMetabolicRateValue) ? basalMetabolicRateValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch basal metabolic rate error:", error);
      return null;
    }
  }

  async saveBasalMetabolicRate(basalMetabolicRate: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = this.validateNumericInput(basalMetabolicRate, 0, 10000);
    console.log("save value:", value);
    const now = new Date();

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "BasalMetabolicRate",
          basalMetabolicRate: {
            value: value,
            unit: "kilocaloriesPerDay",
          },
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save basal metabolic rate error:", JSON.stringify(error));
      throw new Error(`基礎代謝量の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchBloodGlucose(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("BloodGlucose", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const bloodGlucoseValue = Number(latestRecord.level.inMilligramsPerDeciliter);
        return !isNaN(bloodGlucoseValue) ? bloodGlucoseValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch blood glucose error:", error);
      return null;
    }
  }

  async saveBloodGlucose(bloodGlucose: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = this.validateNumericInput(bloodGlucose, 0, 1000);

    const now = new Date();
    try {
      await HealthConnect.insertRecords([
        {
          recordType: "BloodGlucose",
          level: {
            value: value,
            unit: "milligramsPerDeciliter",
          },
          // 今は使用できるらしいということだけを明記している
          // Use SpecimenSource constant
          // specimenSource: 1,
          // Use MealType constant
          // mealType: 1,
          // Use RelationToMeal constant
          // relationToMeal: 1,
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save blood glucose error:", JSON.stringify(error));
      throw new Error(`血糖値の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchBloodPressure(): Promise<{ systolic: string; diastolic: string } | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("BloodPressure", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const systolic = Number(latestRecord.systolic.inMillimetersOfMercury);
        const diastolic = Number(latestRecord.diastolic.inMillimetersOfMercury);

        if (isNaN(systolic) || isNaN(diastolic)) {
          return null;
        }

        return {
          systolic: systolic.toString(),
          diastolic: diastolic.toString(),
        };
      }
      return null;
    } catch (error) {
      console.error("Fetch blood pressure error:", error);
      return null;
    }
  }

  async saveBloodPressure(bloodPressure: { systolic: string; diastolic: string }): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    // 血圧の妥当な範囲をチェック
    const systolic = this.validateNumericInput(bloodPressure.systolic, 60, 250);
    const diastolic = this.validateNumericInput(bloodPressure.diastolic, 40, 150);

    // 収縮期血圧が拡張期血圧より低い場合はエラー
    if (systolic <= diastolic) {
      throw new Error("収縮期血圧は拡張期血圧より高くなければなりません。");
    }

    const now = new Date();
    try {
      await HealthConnect.insertRecords([
        {
          recordType: "BloodPressure",
          systolic: {
            value: systolic,
            unit: "millimetersOfMercury",
          },
          diastolic: {
            value: diastolic,
            unit: "millimetersOfMercury",
          },
          // Use BloodPressureBodyPosition constant
          // bodyPosition: 1,
          // Use BloodPressureMeasurementLocation constant
          // measurementLocation: 1,
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save blood pressure error:", JSON.stringify(error));
      throw new Error(`血圧の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchBodyFat(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("BodyFat", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const bodyFatValue = Number(latestRecord.percentage);
        return !isNaN(bodyFatValue) ? bodyFatValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch body fat error:", error);
      return null;
    }
  }

  async saveBodyFat(bodyFat: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    // 体脂肪率は0-100%の範囲でバリデーション
    const bodyFatValue = this.validateNumericInput(bodyFat, 0, 100);
    const now = new Date();

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "BodyFat",
          percentage: bodyFatValue,
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save body fat error:", JSON.stringify(error));
      throw new Error(`体脂肪率の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchBodyTemperature(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("BodyTemperature", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        // 摂氏で返す
        const temperatureValue = Number(latestRecord.temperature.inCelsius);
        return !isNaN(temperatureValue) ? temperatureValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch body temperature error:", error);
      return null;
    }
  }

  async saveBodyTemperature(bodyTemperature: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    // 体温は35-42℃の範囲でバリデーション
    const temperatureValue = this.validateNumericInput(bodyTemperature, 35, 42);

    const now = new Date();
    try {
      await HealthConnect.insertRecords([
        {
          recordType: "BodyTemperature",
          temperature: {
            value: temperatureValue,
            unit: "celsius",
          },
          // Use TemperatureMeasurementLocation constant
          // measurementLocation: 1,
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save body temperature error:", JSON.stringify(error));
      throw new Error(`体温の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchBoneMass(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("BoneMass", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const boneMassValue = Number(latestRecord.mass.inKilograms);
        return !isNaN(boneMassValue) ? boneMassValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch bone mass error:", error);
      return null;
    }
  }

  // 余談：BodyWaterMassがあるらしい
  async saveBoneMass(boneMass: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(boneMass);

    const now = new Date();
    try {
      await HealthConnect.insertRecords([
        {
          recordType: "BoneMass",
          mass: {
            value: value,
            unit: "kilograms",
          },
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save bone mass error:", JSON.stringify(error));
      throw new Error(`骨量の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  // 定数値の定義
  private readonly CERVICAL_MUCUS_APPEARANCE = {
    DRY: 1,
    STICKY: 2,
    CREAMY: 3,
    WATERY: 4,
    EGG_WHITE: 5,
  } as const;

  private readonly CERVICAL_MUCUS_SENSATION = {
    DRY: 1,
    WET: 2,
    SLIPPERY: 3,
  } as const;

  async fetchCervicalMucus(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("CervicalMucus", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        // appearanceとsensationを組み合わせて文字列として返す
        const appearance = latestRecord.appearance;
        const sensation = latestRecord.sensation;

        if (appearance === undefined || sensation === undefined) {
          return null;
        }

        return `${appearance},${sensation}`;
      }
      return null;
    } catch (error) {
      console.error("Fetch cervical mucus error:", error);
      return null;
    }
  }

  async saveCervicalMucus(cervicalMucus: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    // 入力形式: "appearance,sensation"（例: "1,2"）
    const [appearanceStr, sensationStr] = cervicalMucus.split(",").map((s) => s.trim());

    if (!appearanceStr || !sensationStr) {
      throw new Error("無効な形式です。appearance,sensationの形式で入力してください。");
    }

    const appearance = this.validateEnumValue(appearanceStr, Object.values(this.CERVICAL_MUCUS_APPEARANCE));
    const sensation = this.validateEnumValue(sensationStr, Object.values(this.CERVICAL_MUCUS_SENSATION));
    const now = new Date();
    try {
      await HealthConnect.insertRecords([
        {
          recordType: "CervicalMucus",
          appearance: appearance,
          sensation: sensation,
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save cervical mucus error:", JSON.stringify(error));
      throw new Error(`子宮頸部粘液の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchCyclingPedalingCadence(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("CyclingPedalingCadence", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const cadenceValue = Number(latestRecord.samples[0].revolutionsPerMinute);
        return !isNaN(cadenceValue) ? cadenceValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch cycling pedaling cadence error:", error);
      return null;
    }
  }

  async saveCyclingPedalingCadence(cadence: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = this.validateNumericInput(cadence, 0, 10000);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 10000); // 10分前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "CyclingPedalingCadence",
          samples: [
            {
              time: now.toISOString(),
              revolutionsPerMinute: value,
            },
          ],
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save cycling pedaling cadence error:", JSON.stringify(error));
      throw new Error(`自転車のペダリングキャデンスの保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchDistance(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("Distance", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const distanceValue = Number(latestRecord.distance.inMeters);
        return !isNaN(distanceValue) ? distanceValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch distance error:", error);
      return null;
    }
  }

  async saveDistance(distance: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(distance);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 10000); // 10分前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "Distance",
          distance: {
            value: value,
            unit: "meters",
          },
          time: now.toISOString(),
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save distance error:", JSON.stringify(error));
      throw new Error(`距離の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchElevationGained(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("ElevationGained", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const elevationValue = Number(latestRecord.elevation.inMeters);
        return !isNaN(elevationValue) ? elevationValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch elevation gained error:", error);
      return null;
    }
  }

  async saveElevationGained(elevation: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(elevation);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 10000); // 10分前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "ElevationGained",
          elevation: {
            value: value,
            unit: "meters",
          },
          time: now.toISOString(),
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save elevation gained error:", JSON.stringify(error));
      throw new Error(`elevation gainedの保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchExerciseSession(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("ExerciseSession", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        // 運動時間を計算（分単位）
        const startTime = new Date(latestRecord.startTime);
        const endTime = new Date(latestRecord.endTime);
        const durationInMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

        // 運動タイプと時間を組み合わせて返す
        return `${latestRecord.exerciseType},${durationInMinutes}`;
      }
      return null;
    } catch (error) {
      console.error("Fetch exercise session error:", error);
      return null;
    }
  }

  async saveExerciseSession(duration: string, exerciseType: number = 1): Promise<void> {
    // TODO: 運動セッションの表示については考える必要がある
    if (Platform.OS !== "android" || !HealthConnect) return;
    const durationMinutes = this.validateNumericInput(duration, 0, 1440); // 最大24時間
    const now = new Date();
    const startTime = new Date(now.getTime() - durationMinutes * 60 * 1000);

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "ExerciseSession",
          exerciseType: exerciseType,
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
          startZoneOffset: {
            id: Intl.DateTimeFormat().resolvedOptions().timeZone,
            totalSeconds: new Date().getTimezoneOffset() * -60,
          },
          endZoneOffset: {
            id: Intl.DateTimeFormat().resolvedOptions().timeZone,
            totalSeconds: new Date().getTimezoneOffset() * -60,
          },
        },
      ]);
    } catch (error: any) {
      console.error("Save exercise session error:", JSON.stringify(error));
      throw new Error(`運動セッションの保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchFloorsClimbed(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("FloorsClimbed", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const floorsValue = Number(latestRecord.floors);
        return !isNaN(floorsValue) ? floorsValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch floors climbed error:", error);
      return null;
    }
  }

  async saveFloorsClimbed(floors: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(floors);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 10000); // 10分前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "FloorsClimbed",
          floors: value,
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save floors climbed error:", JSON.stringify(error));
      throw new Error(`階段の登り数の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchHeartRate(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      // 過去1時間のデータを取得
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - 60 * 60 * 1000);

      const data = await HealthConnect.readRecords("HeartRate", {
        timeRangeFilter: {
          operator: "between",
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        // 最新の心拍数を返す
        const latestRecord = data.records[data.records.length - 1];
        // samples配列から最新の心拍数を取得
        if (latestRecord.samples && latestRecord.samples.length > 0) {
          const latestSample = latestRecord.samples[latestRecord.samples.length - 1];
          const heartRateValue = Number(latestSample.beatsPerMinute);
          return !isNaN(heartRateValue) ? heartRateValue.toString() : null;
        }
      }
      return null;
    } catch (error) {
      console.error("Fetch heart rate error:", error);
      return null;
    }
  }

  async saveHeartRate(heartRate: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    // 心拍数は30-250bpmの範囲でバリデーション
    const value = this.validateNumericInput(heartRate, 1, 300);

    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 10000); // 10分前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "HeartRate",
          samples: [
            {
              time: startTime.toISOString(),
              beatsPerMinute: value,
            },
          ],
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save heart rate error:", JSON.stringify(error));
      throw new Error(`心拍数の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchHeight(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("Height", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const heightInMeters = Number(latestRecord.height.inMeters);
        return !isNaN(heightInMeters) ? (heightInMeters * 100).toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch height error:", error);
      return null;
    }
  }

  async saveHeight(height: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    const heightInMeters = this.validateNumericInput(height, 0, 300) / 100;

    const now = new Date();
    await HealthConnect.insertRecords([
      {
        recordType: "Height",
        height: {
          value: heightInMeters,
          unit: "meters",
        },
        time: now.toISOString(),
      },
    ]);
  }

  async fetchHydration(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("Hydration", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const hydrationValue = Number(latestRecord.volume.inMilliliters);
        return !isNaN(hydrationValue) ? hydrationValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch hydration error:", error);
      return null;
    }
  }

  async saveHydration(hydration: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(hydration);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 10000); // 10分前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "Hydration",
          volume: {
            value: value,
            unit: "milliliters",
          },
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save hydration error:", JSON.stringify(error));
      throw new Error(`水分量の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchLeanBodyMass(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("LeanBodyMass", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const leanBodyMassValue = Number(latestRecord.mass.inKilograms);
        return !isNaN(leanBodyMassValue) ? leanBodyMassValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch lean body mass error:", error);
      return null;
    }
  }

  async saveLeanBodyMass(leanBodyMass: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(leanBodyMass);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 10000); // 10分前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "LeanBodyMass",
          mass: {
            value: value,
            unit: "kilograms",
          },
          time: now.toISOString(),
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save lean body mass error:", JSON.stringify(error));
      throw new Error(`体脂肪率の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchMenstruationFlow(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("MenstruationFlow", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        return latestRecord.flow;
      }
      return null;
    } catch (error) {
      console.error("Fetch menstruation flow error:", error);
      return null;
    }
  }

  async saveMenstruationFlow(flow: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(flow);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 10000); // 10分前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "MenstruationFlow",
          flow: value,
          time: startTime.toISOString(),
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save menstruation flow error:", JSON.stringify(error));
      throw new Error(`月経量の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchMenstruationPeriod(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("MenstruationPeriod", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const startTime = new Date(latestRecord.startTime);
        const endTime = new Date(latestRecord.endTime);

        // 日付をフォーマット（YYYY-MM-DD HH:mm）
        const formatDate = (date: Date) => {
          return date
            .toLocaleString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-");
        };

        // 開始日時、終了日時、期間（分）を組み合わせて返す
        return `${formatDate(startTime)},${formatDate(endTime)}`;
      }
      return null;
    } catch (error) {
      console.error("Fetch menstruation period error:", error);
      return null;
    }
  }

  async saveMenstruationPeriod(period: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 10000); // 10分前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "MenstruationPeriod",
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save menstruation period error:", JSON.stringify(error));
      throw new Error(`月経期間の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchNutrition(nutritionType: string): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      // 過去24時間のデータを取得
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

      const data = await HealthConnect.readRecords("Nutrition", {
        timeRangeFilter: {
          operator: "between",
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
      });
      // console.log("Nutrition data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        // 最新のレコードを取得
        const latestRecord = data.records[data.records.length - 1];

        // レコードの内容を確認するためのログ
        // console.log("Latest nutrition record:", JSON.stringify(latestRecord));

        // mealTypeを返す（とりあえず）
        return latestRecord.mealType?.toString() || null;
      }
      return null;
    } catch (error) {
      console.error(`Fetch ${nutritionType} error:`, error);
      return null;
    }
  }

  async saveNutrition(nutritionType: string, value: string, mealType?: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    // 栄養素の値は0-1000gの範囲でバリデーション
    const nutritionValue = this.validateNumericInput(value, 0, 1000);

    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 60 * 1000); // 1時間前

    await HealthConnect.insertRecords([
      {
        recordType: "Nutrition",
        startTime: startTime.toISOString(),
        endTime: now.toISOString(),
        /** Biotin in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // biotin: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Caffeine in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // caffeine: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Calcium in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // calcium: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Energy in [Energy] unit. Optional field. Valid range: 0-100000 kcal. */
        // energy: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Energy from fat in [Energy] unit. Optional field. Valid range: 0-100000 kcal. */
        // energyFromFat: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Chloride in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // chloride: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Cholesterol in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // cholesterol: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Chromium in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // chromium: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Copper in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // copper: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Dietary fiber in [Mass] unit. Optional field. Valid range: 0-100000 grams. */
        // dietaryFiber: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Folate in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // folate: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Folic acid in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // folicAcid: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Iodine in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // iodine: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Iron in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // iron: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Magnesium in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // magnesium: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Manganese in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // manganese: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Molybdenum in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // molybdenum: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Monounsaturated fat in [Mass] unit. Optional field. Valid range: 0-100000 grams. */
        // monounsaturatedFat: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Niacin in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // niacin: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Pantothenic acid in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // pantothenicAcid: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Phosphorus in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // phosphorus: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Polyunsaturated fat in [Mass] unit. Optional field. Valid range: 0-100000 grams. */
        // polyunsaturatedFat: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Potassium in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // potassium: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Protein in [Mass] unit. Optional field. Valid range: 0-100000 grams. */
        // protein: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Riboflavin in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // riboflavin: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Saturated fat in [Mass] unit. Optional field. Valid range: 0-100000 grams. */
        // saturatedFat: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Selenium in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // selenium: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Sodium in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // sodium: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Sugar in [Mass] unit. Optional field. Valid range: 0-100000 grams. */
        // sugar: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Thiamin in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // thiamin: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Total carbohydrate in [Mass] unit. Optional field. Valid range: 0-100000 grams. */
        // totalCarbohydrate: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Total fat in [Mass] unit. Optional field. Valid range: 0-100000 grams. */
        // totalFat: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Trans fat in [Mass] unit. Optional field. Valid range: 0-100000 grams. */
        // transFat: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Unsaturated fat in [Mass] unit. Optional field. Valid range: 0-100000 grams. */
        // unsaturatedFat: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Vitamin A in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // vitaminA: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Vitamin B12 in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // vitaminB12: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Vitamin B6 in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // vitaminB6: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Vitamin C in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // vitaminC: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Vitamin D in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // vitaminD: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Vitamin E in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // vitaminE: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Vitamin K in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // vitaminK: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Zinc in [Mass] unit. Optional field. Valid range: 0-100 grams. */
        // zinc: {
        //   value: 1,
        //   unit: "kilograms",
        // },
        // /** Name for food or drink, provided by the user. Optional field. */
        // name: "test",
        // /** Check MealType constant */
        mealType: 1,
      },
    ]);
  }

  // 栄養データの型定義
  NUTRITION_TYPES = {
    PROTEIN: "protein",
    CARBS: "carbs",
    FAT: "fat",
    FIBER: "fiber",
    SUGAR: "sugar",
    SODIUM: "sodium",
    POTASSIUM: "potassium",
    CALCIUM: "calcium",
    IRON: "iron",
    VITAMIN_A: "vitamin_a",
    VITAMIN_C: "vitamin_c",
    VITAMIN_D: "vitamin_d",
    VITAMIN_E: "vitamin_e",
    VITAMIN_K: "vitamin_k",
    VITAMIN_B1: "vitamin_b1",
    VITAMIN_B2: "vitamin_b2",
    VITAMIN_B3: "vitamin_b3",
    VITAMIN_B5: "vitamin_b5",
    VITAMIN_B6: "vitamin_b6",
    VITAMIN_B7: "vitamin_b7",
    VITAMIN_B9: "vitamin_b9",
    VITAMIN_B12: "vitamin_b12",
  } as const;

  // 食事タイプの定義
  MEAL_TYPES = {
    UNKNOWN: "unknown",
    BREAKFAST: "breakfast",
    LUNCH: "lunch",
    DINNER: "dinner",
    SNACK: "snack",
  } as const;

  // 排卵検査結果の定数
  private readonly OVULATION_TEST_RESULT = {
    NEGATIVE: 1,
    POSITIVE: 2,
    INVALID: 3,
  } as const;

  private readonly OVULATION_TEST_RESULT_JA: Record<number, string> = {
    [this.OVULATION_TEST_RESULT.NEGATIVE]: "陰性",
    [this.OVULATION_TEST_RESULT.POSITIVE]: "陽性",
    [this.OVULATION_TEST_RESULT.INVALID]: "無効",
  };

  async fetchOvulationTest(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("OvulationTest", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const result: number = latestRecord.result;

        // 結果を日本語の文字列に変換
        return this.OVULATION_TEST_RESULT_JA[result] || "不明";
      }
      return null;
    } catch (error) {
      console.error("Fetch ovulation test error:", error);
      return null;
    }
  }

  async saveOvulationTest(result: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    // 結果を数値に変換（1: NEGATIVE, 2: POSITIVE, 3: INVALID）
    const resultValue = this.validateEnumValue(result, Object.values(this.OVULATION_TEST_RESULT));
    const now = new Date();

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "OvulationTest",
          result: resultValue,
          time: now.toISOString(),
          metadata: {
            dataOrigin: "com.example.DemoHealthExpoApp",
          },
        },
      ]);
    } catch (error: any) {
      console.error("Save ovulation test error:", JSON.stringify(error));
      throw new Error(`排卵検査の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchOxygenSaturation(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("OxygenSaturation", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const oxygenSaturationValue = Number(latestRecord.percentage);
        return !isNaN(oxygenSaturationValue) ? oxygenSaturationValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch oxygen saturation error:", error);
      return null;
    }
  }

  async saveOxygenSaturation(oxygenSaturation: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(oxygenSaturation);
    const now = new Date();
    try {
      await HealthConnect.insertRecords([
        {
          recordType: "OxygenSaturation",
          percentage: value,
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save oxygen saturation error:", JSON.stringify(error));
      throw new Error(`酸素飽和度の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchPower(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("Power", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const powerValue = Number(latestRecord.samples[0].power.inKilocaloriesPerDay);
        return !isNaN(powerValue) ? powerValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch power error:", error);
      return null;
    }
  }

  async savePower(power: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(power);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 60 * 1000); // 1時間前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "Power",
          samples: [
            {
              power: {
                value: value,
                unit: "kilocaloriesPerDay",
              },
              time: now.toISOString(),
            },
          ],
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save power error:", JSON.stringify(error));
      throw new Error(`パワーの保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchRespiratoryRate(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("RespiratoryRate", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const respiratoryRateValue = Number(latestRecord.rate);
        return !isNaN(respiratoryRateValue) ? respiratoryRateValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch respiratory rate error:", error);
      return null;
    }
  }

  async saveRespiratoryRate(respiratoryRate: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(respiratoryRate);
    const now = new Date();

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "RespiratoryRate",
          rate: value,
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save respiratory rate error:", JSON.stringify(error));
      throw new Error(`呼吸数の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchRestingHeartRate(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("RestingHeartRate", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const restingHeartRateValue = Number(latestRecord.beatsPerMinute);
        return !isNaN(restingHeartRateValue) ? restingHeartRateValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch resting heart rate error:", error);
      return null;
    }
  }

  async saveRestingHeartRate(restingHeartRate: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(restingHeartRate);
    const now = new Date();
    try {
      await HealthConnect.insertRecords([
        {
          recordType: "RestingHeartRate",
          beatsPerMinute: value,
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save resting heart rate error:", JSON.stringify(error));
      throw new Error(`安静時心拍数の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchSexualActivity(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("SexualActivity", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const activityType: number = latestRecord.protectionUsed;

        // 数値から日本語の文字列に変換
        return SEXUAL_ACTIVITY_TYPES_JA[activityType] || "不明";
      }
      return null;
    } catch (error) {
      console.error("Fetch sexual activity error:", error);
      return null;
    }
  }

  async saveSexualActivity(activity: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(activity);
    if (!Object.values(this.SEXUAL_ACTIVITY_TYPES).includes(value as any)) {
      throw new Error("無効な性行為の値です。");
    }

    const now = new Date();

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "SexualActivity",
          protectionUsed: value,
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save sexual activity error:", JSON.stringify(error));
      throw new Error(`性行為の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchSleepSession(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("SleepSession", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];

        // 睡眠の開始時間と終了時間を取得
        const startTime = new Date(latestRecord.startTime);
        const endTime = new Date(latestRecord.endTime);

        // 睡眠時間を計算（分単位）
        const durationInMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

        // 睡眠ステージを取得（存在する場合）
        const stage = latestRecord.stages?.[0]?.stage || "不明";

        // 日付をフォーマット（YYYY-MM-DD HH:mm）
        const formatDate = (date: Date) => {
          return date
            .toLocaleString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              // day: "2-digit",
              // hour: "2-digit",
              // minute: "2-digit",
              // hour12: false,
            })
            .replace(/\//g, "-");
        };

        // 睡眠情報を組み合わせて返す
        // return `${formatDate(startTime)},${formatDate(endTime)},${durationInMinutes}分,ステージ${stage}`;
        return `${durationInMinutes}分,ステージ${stage}`;
      }
      return null;
    } catch (error) {
      console.error("Fetch sleep session error:", error);
      return null;
    }
  }

  async saveSleepSession(stageStr: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    const stage = parseFloat(stageStr);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 1000);

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "SleepSession",
          stages: [
            {
              startTime: startTime.toISOString(),
              endTime: now.toISOString(),
              stage: stage,
            },
          ],
          // title: "title",
          // notes: "notes",
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save sleep session error:", JSON.stringify(error));
      throw new Error(`睡眠セッションの保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchSpeed(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      // 過去24時間のデータを取得（他のメソッドと同様の範囲）
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

      const data = await HealthConnect.readRecords("Speed", {
        timeRangeFilter: {
          operator: "between",
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        // 最新のレコードを取得（配列の最後の要素）
        const latestRecord = data.records[data.records.length - 1];
        console.log("Latest speed record:", JSON.stringify(latestRecord));

        // samples配列から最新の速度データを取得
        if (latestRecord.samples && latestRecord.samples.length > 0) {
          const latestSample = latestRecord.samples[latestRecord.samples.length - 1];
          const speedValue = latestSample.speed?.inMetersPerSecond;

          if (speedValue === undefined || isNaN(speedValue)) {
            console.log("Speed value is undefined or NaN");
            return null;
          }

          // 速度を時速（km/h）に変換して返す
          const speedKmh = (speedValue * 3.6).toFixed(1);
          return `${speedKmh}km/h`;
        }
      }
      // console.log("No speed data found");
      return "取得できてません";
    } catch (error) {
      console.error("Fetch speed error:", error);
      return null;
    }
  }

  async saveSpeed(speed: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(speed);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 1000);

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "Speed",
          speed: {
            value: value,
            unit: "metersPerSecond",
          },
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save speed error:", JSON.stringify(error));
      throw new Error(`速度の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchStepsCadence(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("StepsCadence", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const cadenceValue = Number(latestRecord.stepsCadence.inStepsPerMinute);
        return !isNaN(cadenceValue) ? cadenceValue.toString() : null;
      }
      // return null;
      return "取得できてません";
    } catch (error) {
      console.error("Fetch steps cadence error:", error);
      return null;
    }
  }

  async saveStepsCadence(cadence: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    // 歩数ケイデンスは0-300歩/分の範囲でバリデーション
    const rate = this.validateNumericInput(cadence, 0, 300);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 1000); // 1分前

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "StepsCadence",
          samples: [
            {
              time: startTime.toISOString(),
              // startTime: startTime.toISOString(),
              // endTime: now.toISOString(),
              rate: rate,
            },
          ],
          // time: startTime.toISOString(),
          // startTime: startTime.toISOString(),
          // endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save steps cadence error:", JSON.stringify(error));
      throw new Error(`歩数ケイデンスの保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchSteps(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

      const data = await HealthConnect.readRecords("Steps", {
        timeRangeFilter: {
          operator: "between",
          startTime: startOfDay,
          endTime: now.toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      return data.records.reduce((sum: number, entry: { count: number }) => sum + entry.count, 0);
    } catch (error) {
      console.error("Fetch steps error:", error);
      return null;
    }
  }

  async saveSteps(steps: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(steps);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 1000);

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "Steps",
          count: value,
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save steps error:", JSON.stringify(error));
      throw new Error(`歩数の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchTotalCaloriesBurned(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("TotalCaloriesBurned", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const caloriesValue = Number(latestRecord.energy.inKilocalories);
        return !isNaN(caloriesValue) ? caloriesValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch total calories burned error:", error);
      return null;
    }
  }

  async saveTotalCaloriesBurned(calories: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(calories);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 1000);

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "TotalCaloriesBurned",
          energy: {
            value: value,
            unit: "kilocalories",
          },
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save total calories burned error:", JSON.stringify(error));
      throw new Error(`総カロリーの保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchVo2Max(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("Vo2Max", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const vo2MaxValue = Number(latestRecord.vo2MillilitersPerMinuteKilogram);
        return !isNaN(vo2MaxValue) ? vo2MaxValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch VO2 max error:", error);
      return null;
    }
  }

  async saveVo2Max(vo2Max: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(vo2Max);
    const now = new Date();

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "Vo2Max",
          vo2MillilitersPerMinuteKilogram: value,
          // Use Vo2MaxMeasurementMethod constant
          measurementMethod: 1,
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save vo2 max error:", JSON.stringify(error));
      throw new Error(`VO2 maxの保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchWeight(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("Weight", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const weightInKg = Number(latestRecord.weight.inKilograms);
        return !isNaN(weightInKg) ? weightInKg.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch weight error:", error);
      return null;
    }
  }

  async saveWeight(weight: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const weightInKg = this.validateNumericInput(weight, 0, 500);
    const now = new Date();

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "Weight",
          weight: {
            value: weightInKg,
            unit: "kilograms",
          },
          time: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save weight error:", JSON.stringify(error));
      throw new Error(`体重の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  async fetchWheelchairPushes(): Promise<string | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const data = await HealthConnect.readRecords("WheelchairPushes", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });
      // console.log("data:", JSON.stringify(data));

      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[data.records.length - 1];
        const pushesValue = Number(latestRecord.count);
        return !isNaN(pushesValue) ? pushesValue.toString() : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch wheelchair pushes error:", error);
      return null;
    }
  }

  async saveWheelchairPushes(pushes: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;
    const value = parseFloat(pushes);
    const now = new Date();
    const startTime = new Date(now.getTime() - 60 * 1000);

    try {
      await HealthConnect.insertRecords([
        {
          recordType: "WheelchairPushes",
          count: value,
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error("Save wheelchair pushes error:", JSON.stringify(error));
      throw new Error(`車椅子の押し回数の保存に失敗しました: ${error?.message || "不明なエラー"}`);
    }
  }

  // 一回試してみたい（取得できるか）
  // async fetchWriteExerciseRoute(): Promise<string | null> {
  //   if (Platform.OS !== "android" || !HealthConnect) return null;

  //   try {
  //     const data = await HealthConnect.readRecords("ExerciseRoute", {
  //       timeRangeFilter: {
  //         operator: "between",
  //         startTime: new Date(0).toISOString(),
  //         endTime: new Date().toISOString(),
  //       },
  //     });

  //     if (data.records && data.records.length > 0) {
  //       const latestRecord = data.records[data.records.length - 1];
  //       return latestRecord.routeData || null;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error("Fetch exercise route error:", error);
  //     return null;
  //   }
  // }

  async saveWriteExerciseRoute(routeData: string): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    const now = new Date();
    await HealthConnect.insertRecords([
      {
        recordType: "ExerciseRoute",
        routeData,
        time: now.toISOString(),
      },
    ]);
  }

  // 共通のバリデーション関数
  private validateNumericInput(value: string, min: number = 0, max?: number): number {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < min) {
      throw new Error(`有効な数値を入力してください。${min}以上の値を入力してください。`);
    }
    if (max !== undefined && numValue > max) {
      throw new Error(`有効な数値を入力してください。${max}以下の値を入力してください。`);
    }
    return numValue;
  }

  private validateEnumValue(value: string, enumValues: number[]): number {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || !enumValues.includes(numValue)) {
      throw new Error(`無効な値です。有効な値を選択してください。`);
    }
    return numValue;
  }

  // 単位変換関数
  private convertToMeters(value: string, fromUnit: "meters" | "kilometers" | "miles" | "inches" | "feet"): number {
    const numValue = this.validateNumericInput(value);
    switch (fromUnit) {
      case "kilometers":
        return numValue * 1000;
      case "miles":
        return numValue * 1609.344;
      case "inches":
        return numValue * 0.0254;
      case "feet":
        return numValue * 0.3048;
      default:
        return numValue;
    }
  }

  private convertToKilograms(value: string, fromUnit: "grams" | "kilograms" | "milligrams" | "micrograms" | "ounces" | "pounds"): number {
    const numValue = this.validateNumericInput(value);
    switch (fromUnit) {
      case "grams":
        return numValue / 1000;
      case "milligrams":
        return numValue / 1000000;
      case "micrograms":
        return numValue / 1000000000;
      case "ounces":
        return numValue * 0.0283495;
      case "pounds":
        return numValue * 0.453592;
      default:
        return numValue;
    }
  }

  private convertToMilliliters(value: string, fromUnit: "liters" | "fluidOuncesUs" | "milliliters"): number {
    const numValue = this.validateNumericInput(value);
    switch (fromUnit) {
      case "liters":
        return numValue * 1000;
      case "fluidOuncesUs":
        return numValue * 29.5735;
      default:
        return numValue;
    }
  }

  private convertToKilocalories(value: string, fromUnit: "calories" | "joules" | "kilocalories" | "kilojoules"): number {
    const numValue = this.validateNumericInput(value);
    switch (fromUnit) {
      case "calories":
        return numValue / 1000;
      case "joules":
        return numValue / 4184;
      case "kilojoules":
        return numValue / 4.184;
      default:
        return numValue;
    }
  }
}

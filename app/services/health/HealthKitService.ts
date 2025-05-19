import HealthKit, {
  queryStatisticsForQuantity,
  HKQuantityTypeIdentifier,
  HKStatisticsOptions,
  saveQuantitySample,
  HKUnit,
} from "@kingstinct/react-native-healthkit";
import {
  IHealthService,
  HealthDataType,
  HealthDataValue,
} from "../../types/health";

export class HealthKitService implements IHealthService {
  async initialize(): Promise<void> {
    const healthKitAvailable = await HealthKit.isHealthDataAvailable();
    if (!healthKitAvailable) {
      throw new Error("HealthKit is not available");
    }
  }

  async requestPermissions(): Promise<boolean> {
    const authorized = await HealthKit.requestAuthorization(
      [HKQuantityTypeIdentifier.height, HKQuantityTypeIdentifier.stepCount],
      [HKQuantityTypeIdentifier.height, HKQuantityTypeIdentifier.stepCount]
    );
    return authorized;
  }

  async fetchHeight(): Promise<number | null> {
    try {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      const response = await queryStatisticsForQuantity(
        HKQuantityTypeIdentifier.height,
        [HKStatisticsOptions.mostRecent],
        startOfDay,
        now
      );

      if (response.mostRecentQuantity?.quantity) {
        // フィートからセンチメートルに変換
        const feet = response.mostRecentQuantity.quantity;
        const inches = feet * 12;
        const centimeters = (inches * 2.54) / 100;
        return Math.round(centimeters);
      }
      return null;
    } catch (error) {
      console.error("Fetch height error:", error);
      return null;
    }
  }

  async saveHeight(height: number): Promise<void> {
    const now = new Date();
    const startTime = new Date(now.getTime() - 60000);

    await saveQuantitySample(HKQuantityTypeIdentifier.height, "m", height, {
      start: startTime,
      end: now,
      metadata: {
        HKMetadataKeyWasUserEntered: true,
      },
    } as any);
  }

  async fetchSteps(): Promise<number | null> {
    try {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      const response = await queryStatisticsForQuantity(
        HKQuantityTypeIdentifier.stepCount,
        [HKStatisticsOptions.cumulativeSum],
        startOfDay,
        now
      );

      return response.sumQuantity?.quantity || null;
    } catch (error) {
      console.error("Fetch steps error:", error);
      return null;
    }
  }

  async fetchData(type: HealthDataType): Promise<HealthDataValue> {
    try {
      switch (type) {
        case "height":
          const height = await this.fetchHeight();
          return { value: height, unit: "cm" };
        case "steps":
          const steps = await this.fetchSteps();
          return { value: steps, unit: "歩" };
        case "respiratorySixMinuteWalk":
          // TODO: 6分間歩行テストのデータを取得する実装
          return { value: null, unit: "m" };
        case "respiratoryRateVital":
          // TODO: 呼吸数のデータを取得する実装
          // バイタルのrespiratoryRateと同じデータを使用
          return { value: null, unit: "回/分" };
        case "oxygenSaturationVital":
          // TODO: 酸素レベルのデータを取得する実装
          // バイタルのoxygenSaturationと同じデータを使用
          return { value: null, unit: "%" };
        case "cardioFitnessVital":
          // TODO: 心肺機能のデータを取得する実装
          // アクティビティのcardioFitnessと同じデータを使用
          return { value: null, unit: "VO2max" };
        case "heartRateVital":
          // TODO: 心拍数のデータを取得する実装
          return { value: null, unit: "bpm" };
        case "mentalExerciseTime":
          // TODO: メンタルヘルス関連のエクササイズ時間のデータを取得する実装
          return { value: null, unit: "分" };
        case "mentalSleep":
          // TODO: メンタルヘルス関連の睡眠データを取得する実装
          // 睡眠カテゴリーのsleepと同じデータを使用
          return { value: null, unit: "時間" };
        case "heartBloodPressure":
          // TODO: 血圧のデータを取得する実装
          // バイタルのbloodPressureと同じデータを使用
          return { value: null, unit: "mmHg" };
        case "heartCardioFitness":
          // TODO: 心肺機能のデータを取得する実装
          // アクティビティのcardioFitnessと同じデータを使用
          return { value: null, unit: "VO2max" };
        case "heartRateHeart":
          // TODO: 心拍数のデータを取得する実装
          // バイタルのheartRateVitalと同じデータを使用
          return { value: null, unit: "bpm" };
        case "heartRateCount":
          // TODO: 心拍数回数のデータを取得する実装
          // アクティビティのheartRateと同じデータを使用
          return { value: null, unit: "bpm" };
        case "bodyTemperature":
          // TODO: バイタルカテゴリーの体温データを取得する実装
          return { value: null, unit: "°C" };
        case "bodyTemperatureBody":
          // TODO: 身体測定値カテゴリーの体温データを取得する実装
          // バイタルのbodyTemperatureと同じデータを使用
          return { value: null, unit: "°C" };
        case "skinPotential":
          // TODO: 皮膚電位データを取得する実装
          return { value: null, unit: "mV" };
        case "sleepData":
          // TODO: 睡眠データを取得する実装
          return { value: null, unit: "時間" };
        case "medicationData":
          // TODO: 服薬データを取得する実装
          return { value: null, unit: "" };
        case "walkingSixMinuteWalk":
          // TODO: 歩行カテゴリーの6分間歩行データを取得する実装
          // 呼吸カテゴリーのrespiratorySixMinuteWalkと同じデータを使用
          return { value: null, unit: "m" };
        case "walkingCardioFitness":
          // TODO: 歩行カテゴリーの心肺機能データを取得する実装
          // アクティビティのcardioFitnessと同じデータを使用
          return { value: null, unit: "VO2max" };
        case "inhalerUsageOther":
          // TODO: その他のデータカテゴリーの吸入器の使用状況データを取得する実装
          // 呼吸カテゴリーのinhalerUsageと同じデータを使用
          return { value: null, unit: "回" };
        case "bloodGlucoseOther":
          // TODO: その他のデータカテゴリーの血糖値データを取得する実装
          // バイタルのbloodGlucoseと同じデータを使用
          return { value: null, unit: "mg/dL" };
        case "sunlightExposureOther":
          // TODO: その他のデータカテゴリーの日光下の時間データを取得する実装
          // 心の健康状態のsunlightExposureと同じデータを使用
          return { value: null, unit: "分" };
        default:
          return { value: null, unit: "" };
      }
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      return { value: null, unit: "" };
    }
  }

  async saveData(type: HealthDataType, value: number): Promise<void> {
    try {
      switch (type) {
        case "height":
          await this.saveHeight(value);
          break;
        default:
          throw new Error(`未対応のデータタイプ: ${type}`);
      }
    } catch (error) {
      console.error(`Error saving ${type} data:`, error);
      throw error;
    }
  }

  async getHeight(): Promise<number | null> {
    return this.fetchHeight();
  }

  async getSteps(): Promise<number | null> {
    return this.fetchSteps();
  }
}

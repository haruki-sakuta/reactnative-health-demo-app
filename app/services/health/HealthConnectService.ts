import { Platform } from "react-native";
import {
  IHealthService,
  HealthDataType,
  HealthDataValue,
} from "../../types/health";

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

let HealthConnect: HealthConnectModule | undefined;
if (Platform.OS === "android") {
  HealthConnect = require("react-native-health-connect");
}

export class HealthConnectService implements IHealthService {
  async initialize(): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    const status = await HealthConnect.getSdkStatus();
    if (status === HealthConnect.SdkAvailabilityStatus.SDK_UNAVAILABLE) {
      throw new Error("Health Connect is not installed");
    }

    if (
      status ===
      HealthConnect.SdkAvailabilityStatus
        .SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
    ) {
      throw new Error("Health Connect provider update required");
    }

    await HealthConnect.initialize();
  }

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS !== "android" || !HealthConnect) return false;

    const permissions = await HealthConnect.requestPermission([
      { accessType: "read", recordType: "Steps" },
      { accessType: "read", recordType: "Height" },
      { accessType: "write", recordType: "Height" },
    ]);
    return permissions.length > 0;
  }

  async fetchHeight(): Promise<number | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const heightData = await HealthConnect.readRecords("Height", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(0).toISOString(),
          endTime: new Date().toISOString(),
        },
      });

      if (heightData.records && heightData.records.length > 0) {
        const latestRecord = heightData.records[heightData.records.length - 1];
        const heightValue = Number(latestRecord.height.inMeters);
        return !isNaN(heightValue) ? heightValue * 100 : null;
      }
      return null;
    } catch (error) {
      console.error("Fetch height error:", error);
      return null;
    }
  }

  async saveHeight(height: number): Promise<void> {
    if (Platform.OS !== "android" || !HealthConnect) return;

    const now = new Date();
    await HealthConnect.insertRecords([
      {
        recordType: "Height",
        height: {
          value: height / 100,
          unit: "meters",
        },
        time: now.toISOString(),
      },
    ]);
  }

  async fetchSteps(): Promise<number | null> {
    if (Platform.OS !== "android" || !HealthConnect) return null;

    try {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      ).toISOString();

      const stepsData = await HealthConnect.readRecords("Steps", {
        timeRangeFilter: {
          operator: "between",
          startTime: startOfDay,
          endTime: now.toISOString(),
        },
      });

      return stepsData.records.reduce(
        (sum: number, entry: { count: number }) => sum + entry.count,
        0
      );
    } catch (error) {
      console.error("Fetch steps error:", error);
      return null;
    }
  }

  async fetchData(type: HealthDataType): Promise<HealthDataValue> {
    if (Platform.OS !== "android" || !HealthConnect) {
      return { value: null, unit: "" };
    }

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
    if (Platform.OS !== "android" || !HealthConnect) return;

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

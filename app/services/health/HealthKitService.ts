import HealthKit, {
  queryStatisticsForQuantity,
  HKQuantityTypeIdentifier,
  HKStatisticsOptions,
  saveQuantitySample,
  HKUnit,
} from "@kingstinct/react-native-healthkit";
import { IHealthService } from "../../types/health";

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
}

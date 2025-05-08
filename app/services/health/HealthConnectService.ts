import { Platform } from "react-native";
import { IHealthService } from "../../types/health";

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
}

import { Platform } from "react-native";
import { IHealthService } from "../types/health";
import { HealthKitService } from "@/app/services/health/HealthKitService";
import { HealthConnectService } from "@/app/services/health/HealthConnectService";

export class PlatformService {
  private static instance: PlatformService;
  private healthService: IHealthService;

  private constructor() {
    this.healthService = Platform.select({
      ios: new HealthKitService(),
      android: new HealthConnectService(),
      default: new HealthKitService(),
    });
  }

  public static getInstance(): PlatformService {
    if (!PlatformService.instance) {
      PlatformService.instance = new PlatformService();
    }
    return PlatformService.instance;
  }

  public getHealthService(): IHealthService {
    return this.healthService;
  }
}

export const platformService = PlatformService.getInstance();

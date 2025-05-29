import { Platform } from "react-native";
import { IHealthKitService, IHealthConnectService } from "../types/health";
import { HealthKitService } from "@/app/services/health/HealthKitService";
import { HealthConnectService } from "@/app/services/health/HealthConnectService";

export class PlatformService {
  private static instance: PlatformService;
  private healthService: IHealthKitService | IHealthConnectService;

  private constructor() {
    this.healthService = Platform.select<IHealthKitService | IHealthConnectService>({
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

  public getHealthKitService(): IHealthKitService {
    return this.healthService as IHealthKitService;
  }

  public getHealthConnectService(): IHealthConnectService {
    return this.healthService as IHealthConnectService;
  }
}

export const platformService = PlatformService.getInstance();

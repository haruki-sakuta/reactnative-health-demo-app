import { Platform } from "react-native";
import { IHealthService } from "../types/health";
import { HealthKitService } from "@/app/services/health/HealthKitService";
import { HealthConnectService } from "@/app/services/health/HealthConnectService";

export class PlatformService {
  private static instance: PlatformService;
  private healthService: IHealthService;
  private isInitialized: boolean = false;
  private initializationPromise: Promise<void> | null = null;

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

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    if (!this.initializationPromise) {
      this.initializationPromise = this.healthService
        .initialize()
        .then(() => {
          this.isInitialized = true;
        })
        .catch((error) => {
          this.initializationPromise = null;
          throw error;
        });
    }

    return this.initializationPromise;
  }

  public isHealthServiceInitialized(): boolean {
    return this.isInitialized;
  }

  public async getHealthService(): Promise<IHealthService> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.healthService;
  }
}

export const platformService = PlatformService.getInstance();

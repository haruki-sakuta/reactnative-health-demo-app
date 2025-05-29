export type HealthDataPlatform = "ios" | "android";

export type HealthDataCategory =
  | "activity" // アクティビティ
  | "vitals" // バイタル
  | "nutrition" // 栄養
  | "respiratory" // 呼吸
  | "cycle" // 周期記録
  | "symptoms" // 症状
  | "mental" // 心の健康状態
  | "heart" // 心臓
  | "body" // 身体測定値
  | "sleep" // 睡眠
  | "hearing" // 聴覚
  | "medication" // 服薬
  | "walking" // 歩行
  | "other"; // その他のデータ

// iOS用の型定義
export type IOSHealthDataType =
  // アクティビティ
  | "nikeFuel"
  | "activity"
  | "activeEnergy"
  | "walkingRunningDistance"
  | "exerciseTime"
  | "cyclingCadence"
  | "cyclingPower"
  | "cyclingSpeed"
  | "standHours"
  | "standMinutes"
  | "downhillSnowSportsDistance"
  | "pushCount"
  | "moveTime"
  | "runningPower"
  | "runningSpeed"
  | "workout"
  | "basalEnergyBurned"
  | "swimmingDistance"
  | "functionalThresholdPower"
  | "cyclingDistance"
  | "wheelchairDistance"
  | "flightsClimbed"
  | "cardioFitness"
  | "heartRate"
  | "physicalEffort"
  | "swimmingStrokeCount"
  | "underwaterDepth"
  | "steps"
  // バイタル
  | "bloodPressure"
  | "bloodGlucose"
  | "menstruation"
  | "respiratoryRate"
  | "oxygenSaturation"
  | "bodyTemperature"
  | "heartRateVital"
  // 栄養
  | "caffeine"
  | "potassium"
  | "calcium"
  | "chromium"
  | "selenium"
  | "protein"
  | "thiamin"
  | "niacin"
  | "sodium"
  | "pantothenicAcid"
  | "biotin"
  | "vitaminA"
  | "vitaminB2"
  | "vitaminB6"
  | "vitaminB12"
  | "vitaminC"
  | "vitaminD"
  | "vitaminE"
  | "vitaminK"
  | "magnesium"
  | "manganese"
  | "molybdenum"
  | "iodine"
  | "phosphorus"
  | "zinc"
  | "monounsaturatedFat"
  | "chloride"
  | "dietaryFiber"
  | "dietaryCholesterol"
  | "dietarySugar"
  | "water"
  | "dietaryEnergy"
  | "totalFat"
  | "polyunsaturatedFat"
  | "carbohydrates"
  | "iron"
  | "copper"
  | "saturatedFat"
  | "folate"
  // 呼吸
  | "respiratorySixMinuteWalk"
  | "inhalerUsage"
  | "respiratoryRateVital"
  | "peakExpiratoryFlow"
  | "oxygenSaturationVital"
  | "cardioFitnessVital"
  | "forcedExpiratoryVolume"
  | "forcedVitalCapacity"
  // 周期記録
  | "cycleRecord"
  // 症状
  | "cough"
  | "soreThroat"
  | "hotFlash"
  | "dizziness"
  | "chills"
  | "diarrhea"
  | "drySkin"
  | "moodChanges"
  | "memoryLapse"
  | "chestTightness"
  | "heartburn"
  | "irregularHeartbeat"
  | "lowBackPain"
  | "pelvicPain"
  | "fainting"
  | "appetiteChanges"
  | "nightSweats"
  | "sleepChanges"
  | "shortnessOfBreath"
  | "bodyPain"
  | "hairLoss"
  | "nausea"
  | "headache"
  | "breastPain"
  | "urinaryIncontinence"
  | "fever"
  | "fatigue"
  | "runnyNose"
  | "rapidHeartbeat"
  | "abdominalBloating"
  | "abdominalCramps"
  | "constipation"
  | "tasteLoss"
  | "wheezing"
  | "smellLoss"
  | "vomiting"
  | "nasalCongestion"
  | "vaginalDryness"
  | "acne"
  // 心の健康状態
  | "depressionRisk"
  | "mentalExerciseTime"
  | "mindfulMinutes"
  | "mentalState"
  | "mentalSleep"
  | "sunlightExposure"
  | "anxietyRisk"
  // 心臓
  | "restingHeartRate"
  | "heartBloodPressure"
  | "highHeartRateNotification"
  | "ecg"
  | "heartCardioFitness"
  | "cardioFitnessLevel"
  | "heartRateHeart"
  | "heartRateCount"
  | "heartRateVariability"
  | "atrialFibrillation"
  | "lowHeartRateNotification"
  | "microcirculation"
  | "irregularHeartRhythmNotification"
  | "walkingHeartRate"
  // 身体測定値
  | "bmi"
  | "glassesPrescription"
  | "basalBodyTemperature"
  | "wristTemperature"
  | "leanBodyMass"
  | "height"
  | "bodyTemperatureBody"
  | "bodyFatPercentage"
  | "weight"
  | "waistCircumference"
  | "skinPotential"
  // 聴覚
  | "audiogram"
  | "noiseNotification"
  | "headphoneVolume"
  | "headphoneNotification"
  | "environmentalSoundLevel"
  | "environmentalSoundReduction"
  // 服薬
  | "medicationData"
  // 歩行
  | "walkingSixMinuteWalk"
  | "runningStrideLength"
  | "stairDescentSpeed"
  | "stairAscentSpeed"
  | "verticalOscillation"
  | "walkingCardioFitness"
  | "groundContactTime"
  | "walkingStability"
  | "walkingStabilityNotification"
  | "walkingSpeed"
  | "walkingAsymmetry"
  | "walkingDoubleSupportTime"
  | "stepLength"
  // その他のデータ
  | "uvExposure"
  | "insulinDelivery"
  | "alcoholConsumption"
  | "inhalerUsageOther"
  | "bloodAlcoholContent"
  | "bloodGlucoseOther"
  | "toothbrushing"
  | "handwashing"
  | "waterTemperature"
  | "sexualActivity"
  | "fallCount"
  | "sunlightExposureOther"
  // 睡眠
  | "sleepData";

// Android用の型定義
export type AndroidHealthDataType =
  | "activeCaloriesBurned"
  | "basalBodyTemperature"
  | "basalMetabolicRate"
  | "bloodGlucose"
  | "bloodPressure"
  | "bodyFat"
  | "bodyTemperature"
  | "boneMass"
  | "cervicalMucus"
  | "cyclingPedalingCadence"
  | "distance"
  | "elevationGained"
  | "exerciseSession"
  | "floorsClimbed"
  | "heartRate"
  | "height"
  | "hydration"
  | "leanBodyMass"
  | "menstruationFlow"
  | "menstruationPeriod"
  | "nutrition"
  | "ovulationTest"
  | "oxygenSaturation"
  | "power"
  | "respiratoryRate"
  | "restingHeartRate"
  | "sexualActivity"
  | "sleepSession"
  | "speed"
  | "stepsCadence"
  | "steps"
  | "totalCaloriesBurned"
  | "vo2Max"
  | "weight"
  | "wheelchairPushes"
  | "writeExerciseRoute";

export const androidUnitConversions: Partial<
  Record<
    AndroidHealthDataType,
    {
      to: (value: number) => number;
      from: (value: number) => number;
    }
  >
> = {
  height: {
    to: (value: number) => value * 100, // メートルからセンチメートル
    from: (value: number) => value / 100, // センチメートルからメートル
  },
  weight: {
    to: (value: number) => value,
    from: (value: number) => value,
  },
  steps: {
    to: (value: number) => value,
    from: (value: number) => value,
  },
  bloodGlucose: {
    to: (value: number) => value,
    from: (value: number) => value,
  },
  // 必要に応じて他のデータタイプの変換を追加
};

/**
 * @deprecated 今後はIHealthKitServiceとIHealthConnectServiceを使用してください
 */
export interface IHealthService {
  // initialize(): Promise<void>;
  // requestPermissions(): Promise<boolean>;
  // fetchData(type: HealthDataType): Promise<HealthDataValue>;
  // saveData(type: HealthDataType, value: number): Promise<void>;
  // fetchHeight(): Promise<number | null>;
  // saveHeight(height: number): Promise<void>;
  // fetchSteps(): Promise<number | null>;
  // getHeight(): Promise<number | null>;
  // getSteps(): Promise<number | null>;
  initialize(): Promise<void>;
  requestPermissions(): Promise<boolean>;
  fetchHeight(): Promise<number | null>;
  saveHeight(height: number): Promise<void>;
  fetchSteps(): Promise<number | null>;
}

/**
 * iOS用のヘルスケアサービスインターフェース
 * HealthKitを使用したデータの取得・保存を定義
 */
export interface IHealthKitService {
  // initialize(): Promise<void>;
  // requestPermissions(): Promise<boolean>;
  // fetchData(type: HealthDataType): Promise<HealthDataValue>;
  // saveData(type: HealthDataType, value: number): Promise<void>;
  // (): Promise<void>;
  // fetchHeight(): Promise<number | null>;
  // saveHeight(height: number): Promise<void>;
  // fetchSteps(): Promise<number | null>;
  // getHeight(): Promise<number | null>;
  // getSteps(): Promise<number | null>;
}

/**
 * Android用のヘルスケアサービスインターフェース
 * Health Connectを使用したデータの取得・保存を定義
 */
export interface IHealthConnectService {
  // 初期化と権限
  initialize(): Promise<void>;
  requestPermissions(): Promise<boolean>;

  // 一括取得
  fetchAllHealthData(): Promise<{
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
  } | null>;

  // データ取得・保存
  fetchActiveCaloriesBurned(): Promise<string | null>;
  saveActiveCaloriesBurned(value: string): Promise<void>;
  fetchBasalBodyTemperature(): Promise<string | null>;
  saveBasalBodyTemperature(value: string): Promise<void>;
  fetchBasalMetabolicRate(): Promise<string | null>;
  saveBasalMetabolicRate(value: string): Promise<void>;
  fetchBloodGlucose(): Promise<string | null>;
  saveBloodGlucose(value: string): Promise<void>;
  fetchBloodPressure(): Promise<{ systolic: string; diastolic: string } | null>;
  saveBloodPressure(value: { systolic: string; diastolic: string }): Promise<void>; // 引数をどうするか迷う（数的に）
  fetchBodyFat(): Promise<string | null>;
  saveBodyFat(value: string): Promise<void>;
  fetchBodyTemperature(): Promise<string | null>;
  saveBodyTemperature(value: string): Promise<void>;
  fetchBoneMass(): Promise<string | null>;
  saveBoneMass(value: string): Promise<void>;
  fetchCervicalMucus(): Promise<string | null>;
  saveCervicalMucus(value: string): Promise<void>;
  fetchCyclingPedalingCadence(): Promise<string | null>;
  saveCyclingPedalingCadence(value: string): Promise<void>;
  fetchDistance(): Promise<string | null>;
  saveDistance(value: string): Promise<void>;
  fetchElevationGained(): Promise<string | null>;
  saveElevationGained(value: string): Promise<void>;
  fetchExerciseSession(): Promise<string | null>;
  saveExerciseSession(value: string): Promise<void>;
  fetchFloorsClimbed(): Promise<string | null>;
  saveFloorsClimbed(value: string): Promise<void>;
  fetchHeartRate(): Promise<string | null>;
  saveHeartRate(value: string): Promise<void>;
  fetchHeight(): Promise<string | null>;
  saveHeight(value: string): Promise<void>;
  fetchHydration(): Promise<string | null>;
  saveHydration(value: string): Promise<void>;
  fetchLeanBodyMass(): Promise<string | null>;
  saveLeanBodyMass(value: string): Promise<void>;
  fetchMenstruationFlow(): Promise<string | null>;
  saveMenstruationFlow(value: string): Promise<void>;
  fetchMenstruationPeriod(): Promise<string | null>;
  saveMenstruationPeriod(value: string): Promise<void>;
  fetchNutrition(nutritionType: string): Promise<string | null>;
  saveNutrition(nutritionType: string, value: string, mealType?: string): Promise<void>;
  fetchOvulationTest(): Promise<string | null>;
  saveOvulationTest(value: string): Promise<void>;
  fetchOxygenSaturation(): Promise<string | null>;
  saveOxygenSaturation(value: string): Promise<void>;
  fetchPower(): Promise<string | null>;
  savePower(value: string): Promise<void>;
  fetchRespiratoryRate(): Promise<string | null>;
  saveRespiratoryRate(value: string): Promise<void>;
  fetchRestingHeartRate(): Promise<string | null>;
  saveRestingHeartRate(value: string): Promise<void>;
  fetchSexualActivity(): Promise<string | null>;
  saveSexualActivity(value: string): Promise<void>;
  fetchSleepSession(): Promise<string | null>;
  saveSleepSession(value: string): Promise<void>;
  fetchSpeed(): Promise<string | null>;
  saveSpeed(value: string): Promise<void>;
  fetchStepsCadence(): Promise<string | null>;
  saveStepsCadence(value: string): Promise<void>;
  fetchSteps(): Promise<string | null>;
  saveSteps(value: string): Promise<void>;
  fetchTotalCaloriesBurned(): Promise<string | null>;
  saveTotalCaloriesBurned(value: string): Promise<void>;
  fetchVo2Max(): Promise<string | null>;
  saveVo2Max(value: string): Promise<void>;
  fetchWeight(): Promise<string | null>;
  saveWeight(value: string): Promise<void>;
  fetchWheelchairPushes(): Promise<string | null>;
  saveWheelchairPushes(value: string): Promise<void>;
  saveWriteExerciseRoute(value: string): Promise<void>;
}

// プラットフォーム固有の型定義
export type PlatformHealthDataType = IOSHealthDataType | AndroidHealthDataType;

// 共通の基本設定
export interface BaseHealthDataConfig {
  id: PlatformHealthDataType;
  title: string;
  unit: string;
  isEditable: boolean;
  platform: HealthDataPlatform;
  order: number;
}

// プラットフォーム固有のデータ設定
export interface PlatformDataConfig extends BaseHealthDataConfig {
  category?: HealthDataCategory;
  androidConfig?: PlatformSpecificConfig;
  iosConfig?: PlatformSpecificConfig;
}

// iOS用のデータ設定
export interface IOSHealthDataConfig extends PlatformDataConfig {
  id: IOSHealthDataType;
  platform: "ios";
  category: HealthDataCategory;
  description: string;
  icon?: string;
  minValue?: number;
  maxValue?: number;
  decimalPlaces?: number;
  isVisible: boolean;
}

// Android用のデータ設定
export interface AndroidHealthDataConfig {
  id: AndroidHealthDataType;
  title: string;
  unit: string;
  placeholder: string;
  permissions: {
    read: boolean;
    write: boolean;
  };
  order: number;
}

// 後方互換性のためにHealthDataTypeをエイリアスとして定義
export type HealthDataType = IOSHealthDataType | AndroidHealthDataType;

// プラットフォーム固有の設定を定義
export interface PlatformSpecificConfig {
  isEditable: boolean;
  unit: string;
  placeholder: string;
  permissions: {
    read: boolean;
    write: boolean;
  };
}

// 日付範囲を定義
export interface DateRange {
  start: Date;
  end: Date;
}

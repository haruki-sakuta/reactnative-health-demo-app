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

export type HealthDataType =
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
  | "sleepData"
  // Android用の型定義
  | "activeCaloriesBurned"
  | "basalBodyTemperature"
  | "basalMetabolicRate"
  | "bloodGlucoseAndroid"
  | "bloodPressureAndroid"
  | "bodyFat"
  | "bodyTemperatureAndroid"
  | "boneMass"
  | "cervicalMucus"
  | "exerciseAndroid"
  | "distanceAndroid"
  | "elevationGained"
  | "floorsClimbed"
  | "heartRateAndroid"
  | "heightAndroid"
  | "hydration"
  | "leanBodyMass"
  | "menstruationAndroid"
  | "nutrition"
  | "ovulationTest"
  | "oxygenSaturationAndroid"
  | "power"
  | "respiratoryRateAndroid"
  | "restingHeartRateAndroid"
  | "sexualActivityAndroid"
  | "sleepAndroid"
  | "speed"
  | "stepsAndroid"
  | "totalCaloriesBurned"
  | "vo2Max"
  | "wheelchairPushes"
  | "exerciseRoute";

export interface HealthDataValue {
  value: number | null;
  unit: string;
  lastUpdated?: Date;
}

export interface HealthData {
  [key: string]: HealthDataValue;
}

export interface HealthDataCardProps {
  title: string;
  value: number | null;
  unit: string;
  onPress?: () => void;
  type?: HealthDataType;
}

export interface HealthDataInputModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (value: number) => Promise<void>;
  title: string;
  placeholder: string;
  unit: string;
  isLoading?: boolean;
}

export interface InputFormProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
}

export interface IHealthService {
  initialize(): Promise<void>;
  requestPermissions(): Promise<boolean>;
  fetchData(type: HealthDataType): Promise<HealthDataValue>;
  saveData(type: HealthDataType, value: number): Promise<void>;
  fetchHeight(): Promise<number | null>;
  saveHeight(height: number): Promise<void>;
  fetchSteps(): Promise<number | null>;
  getHeight(): Promise<number | null>;
  getSteps(): Promise<number | null>;
}

// iOS用の型定義
export type IOSHealthDataType = Extract<
  HealthDataType,
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
  | "bloodPressure"
  | "bloodGlucose"
  | "menstruation"
  | "respiratoryRate"
  | "oxygenSaturation"
  | "bodyTemperature"
  | "heartRateVital"
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
  | "respiratorySixMinuteWalk"
  | "inhalerUsage"
  | "respiratoryRateVital"
  | "peakExpiratoryFlow"
  | "oxygenSaturationVital"
  | "cardioFitnessVital"
  | "forcedExpiratoryVolume"
  | "forcedVitalCapacity"
  | "cycleRecord"
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
  | "depressionRisk"
  | "mentalExerciseTime"
  | "mindfulMinutes"
  | "mentalState"
  | "mentalSleep"
  | "sunlightExposure"
  | "anxietyRisk"
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
  | "audiogram"
  | "noiseNotification"
  | "headphoneVolume"
  | "headphoneNotification"
  | "environmentalSoundLevel"
  | "environmentalSoundReduction"
  | "medicationData"
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
  | "sleepData"
>;

// Android用の型定義
export type AndroidHealthDataType = Extract<
  HealthDataType,
  | "activeCaloriesBurned"
  | "basalBodyTemperature"
  | "basalMetabolicRate"
  | "bloodGlucoseAndroid"
  | "bloodPressureAndroid"
  | "bodyFat"
  | "bodyTemperatureAndroid"
  | "boneMass"
  | "cervicalMucus"
  | "exerciseAndroid"
  | "distanceAndroid"
  | "elevationGained"
  | "floorsClimbed"
  | "heartRateAndroid"
  | "heightAndroid"
  | "hydration"
  | "leanBodyMass"
  | "menstruationAndroid"
  | "nutrition"
  | "ovulationTest"
  | "oxygenSaturationAndroid"
  | "power"
  | "respiratoryRateAndroid"
  | "restingHeartRateAndroid"
  | "sexualActivityAndroid"
  | "sleepAndroid"
  | "speed"
  | "stepsAndroid"
  | "totalCaloriesBurned"
  | "vo2Max"
  | "wheelchairPushes"
  | "exerciseRoute"
>;

// プラットフォーム固有の設定を定義
export interface PlatformSpecificConfig {
  isEditable: boolean;
  unit: string;
  permissions: {
    read: boolean;
    write: boolean;
  };
}

// 共通の基本設定
export interface BaseHealthDataConfig {
  id: HealthDataType;
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
export interface AndroidHealthDataConfig extends PlatformDataConfig {
  id: AndroidHealthDataType;
  platform: "android";
  androidConfig: PlatformSpecificConfig;
}

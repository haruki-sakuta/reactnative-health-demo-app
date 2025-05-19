import { Platform } from "react-native";
import {
  AndroidHealthDataType,
  HealthDataPlatform,
  HealthDataCategory,
  PlatformDataConfig,
  AndroidHealthDataConfig,
  IOSHealthDataConfig,
} from "../types/health";
import {
  HealthKitDataConfigs,
  HealthKitDataConfig,
} from "./HealthKitDataConfig";

// デフォルトの設定を生成する関数
const createDefaultConfig = (
  id: AndroidHealthDataType,
  title: string,
  unit: string,
  permissions: { read: boolean; write: boolean } = { read: true, write: false },
  order: number
): AndroidHealthDataConfig => ({
  id,
  title,
  unit,
  isEditable: permissions.write,
  platform: "android",
  order,
  androidConfig: {
    isEditable: permissions.write,
    unit,
    permissions,
  },
});

export const androidHealthDataConfigs: AndroidHealthDataConfig[] = [
  createDefaultConfig(
    "activeCaloriesBurned",
    "アクティブカロリー",
    "kcal",
    { read: true, write: false },
    1
  ),
  createDefaultConfig(
    "basalBodyTemperature",
    "基礎体温",
    "°C",
    { read: true, write: true },
    2
  ),
  createDefaultConfig(
    "basalMetabolicRate",
    "基礎代謝率",
    "kcal/日",
    { read: true, write: false },
    3
  ),
  createDefaultConfig(
    "bloodGlucoseAndroid",
    "血糖値",
    "mg/dL",
    { read: true, write: true },
    4
  ),
  createDefaultConfig(
    "bloodPressureAndroid",
    "血圧",
    "mmHg",
    { read: true, write: true },
    5
  ),
  createDefaultConfig(
    "bodyFat",
    "体脂肪率",
    "%",
    { read: true, write: true },
    6
  ),
  createDefaultConfig(
    "bodyTemperatureAndroid",
    "体温",
    "°C",
    { read: true, write: true },
    7
  ),
  createDefaultConfig("boneMass", "骨量", "kg", { read: true, write: true }, 8),
  createDefaultConfig(
    "cervicalMucus",
    "子宮頸管粘液",
    "",
    { read: true, write: true },
    9
  ),
  createDefaultConfig(
    "exerciseAndroid",
    "運動",
    "分",
    { read: true, write: true },
    10
  ),
  createDefaultConfig(
    "distanceAndroid",
    "距離",
    "m",
    { read: true, write: false },
    11
  ),
  createDefaultConfig(
    "elevationGained",
    "上昇高度",
    "m",
    { read: true, write: false },
    12
  ),
  createDefaultConfig(
    "floorsClimbed",
    "上った階数",
    "階",
    { read: true, write: false },
    13
  ),
  createDefaultConfig(
    "heartRateAndroid",
    "心拍数",
    "bpm",
    { read: true, write: false },
    14
  ),
  createDefaultConfig(
    "heightAndroid",
    "身長",
    "cm",
    { read: true, write: true },
    15
  ),
  createDefaultConfig(
    "hydration",
    "水分摂取量",
    "ml",
    { read: true, write: true },
    16
  ),
  createDefaultConfig(
    "leanBodyMass",
    "除脂肪体重",
    "kg",
    { read: true, write: true },
    17
  ),
  createDefaultConfig(
    "menstruationAndroid",
    "月経",
    "",
    { read: true, write: true },
    18
  ),
  createDefaultConfig("nutrition", "栄養", "", { read: true, write: true }, 19),
  createDefaultConfig(
    "ovulationTest",
    "排卵検査",
    "",
    { read: true, write: true },
    20
  ),
  createDefaultConfig(
    "oxygenSaturationAndroid",
    "血中酸素飽和度",
    "%",
    { read: true, write: false },
    21
  ),
  createDefaultConfig("power", "パワー", "W", { read: true, write: false }, 22),
  createDefaultConfig(
    "respiratoryRateAndroid",
    "呼吸数",
    "回/分",
    { read: true, write: false },
    23
  ),
  createDefaultConfig(
    "restingHeartRateAndroid",
    "安静時心拍数",
    "bpm",
    { read: true, write: false },
    24
  ),
  createDefaultConfig(
    "sexualActivityAndroid",
    "性行為",
    "",
    { read: true, write: true },
    25
  ),
  createDefaultConfig(
    "sleepAndroid",
    "睡眠",
    "時間",
    { read: true, write: true },
    26
  ),
  createDefaultConfig("speed", "速度", "m/s", { read: true, write: false }, 27),
  createDefaultConfig(
    "stepsAndroid",
    "歩数",
    "歩",
    { read: true, write: false },
    28
  ),
  createDefaultConfig(
    "totalCaloriesBurned",
    "総消費カロリー",
    "kcal",
    { read: true, write: false },
    29
  ),
  createDefaultConfig(
    "vo2Max",
    "最大酸素摂取量",
    "ml/kg/min",
    { read: true, write: false },
    30
  ),
  createDefaultConfig(
    "wheelchairPushes",
    "車椅子プッシュ数",
    "回",
    { read: true, write: false },
    31
  ),
  createDefaultConfig(
    "exerciseRoute",
    "運動ルート",
    "",
    { read: true, write: true },
    32
  ),
];

// iOS用の設定
export const iosHealthDataConfigs: IOSHealthDataConfig[] = Object.values(
  HealthKitDataConfigs
)
  .filter((config) => config.isVisible)
  .map((config) => ({
    ...config,
    platform: "ios" as const,
  }));

// カテゴリーごとのデータを取得
export const getHealthDataByCategory = (
  category: HealthDataCategory
): PlatformDataConfig[] => {
  if (Platform.OS === "android") {
    return androidHealthDataConfigs.filter(
      (config) => config.category === category
    );
  }
  return iosHealthDataConfigs.filter((config) => config.category === category);
};

// 全ての表示可能なデータを取得（カテゴリー順）
export const getAllVisibleHealthData = (): PlatformDataConfig[] => {
  return Platform.OS === "android"
    ? androidHealthDataConfigs
    : iosHealthDataConfigs;
};

// 編集可能なデータのみを取得
export const getEditableHealthData = (): PlatformDataConfig[] => {
  const configs =
    Platform.OS === "android" ? androidHealthDataConfigs : iosHealthDataConfigs;
  return configs.filter((config) => config.isEditable);
};

// 設定を取得するためのユーティリティ関数
export const getHealthConnectDataConfig = (
  type: AndroidHealthDataType
): AndroidHealthDataConfig => {
  return (
    androidHealthDataConfigs.find((config) => config.id === type) ||
    androidHealthDataConfigs[0]
  );
};

// 全ての表示可能なデータを取得
export const getAllVisibleHealthConnectData = (): AndroidHealthDataConfig[] => {
  return androidHealthDataConfigs.sort((a, b) => a.order - b.order);
};

// 編集可能なデータのみを取得
export const getEditableHealthConnectData = (): AndroidHealthDataConfig[] => {
  return androidHealthDataConfigs
    .filter((config) => config.androidConfig.permissions.write)
    .sort((a, b) => a.order - b.order);
};

// カテゴリーごとのデータを取得
export const getHealthConnectDataByCategory = (
  category: HealthDataCategory
): AndroidHealthDataConfig[] => {
  return androidHealthDataConfigs
    .filter((config) => config.category === category)
    .sort((a, b) => a.order - b.order);
};

// プラットフォームに応じた設定を取得
export const getPlatformConfigs = (): PlatformDataConfig[] => {
  return Platform.OS === "android"
    ? getAllVisibleHealthConnectData()
    : iosHealthDataConfigs;
};

// カテゴリーの表示順序
export const categoryOrder: HealthDataCategory[] = [
  "activity",
  "vitals",
  "nutrition",
  "respiratory",
  "cycle",
  "symptoms",
  "mental",
  "heart",
  "body",
  "sleep",
  "hearing",
  "medication",
  "walking",
  "other",
];

// カテゴリーの表示名
export const categoryNames: { [key in HealthDataCategory]: string } = {
  activity: "アクティビティ",
  vitals: "バイタル",
  nutrition: "栄養",
  respiratory: "呼吸",
  cycle: "周期記録",
  symptoms: "症状",
  mental: "心の健康状態",
  heart: "心臓",
  body: "身体測定値",
  sleep: "睡眠",
  hearing: "聴覚",
  medication: "服薬",
  walking: "歩行",
  other: "その他のデータ",
};

import { AndroidHealthDataType, AndroidHealthDataConfig } from "../types/health";

// デフォルトの設定を生成する関数
const createDefaultConfig = (
  id: AndroidHealthDataType,
  title: string,
  unit: string,
  placeholder: string,
  permissions: { read: boolean; write: boolean } = { read: true, write: false },
  order: number
): AndroidHealthDataConfig => ({
  id,
  title,
  unit,
  permissions,
  placeholder,
  order,
});

// Android用の設定
export const androidHealthDataConfigs: AndroidHealthDataConfig[] = [
  createDefaultConfig("activeCaloriesBurned", "アクティブ消費カロリー", "kcal", "入力してください", { read: true, write: true }, 1),
  createDefaultConfig("basalBodyTemperature", "基礎体温", "°C", "入力してください", { read: true, write: true }, 2),
  createDefaultConfig("basalMetabolicRate", "基礎代謝量", "kcal/日", "入力してください", { read: true, write: true }, 3),
  createDefaultConfig("bloodGlucose", "血糖値", "mg/dL", "入力してください", { read: true, write: true }, 4),
  createDefaultConfig("bloodPressure", "血圧", "mmHg", "入力してください", { read: true, write: true }, 5),
  createDefaultConfig("bodyFat", "体脂肪率", "%", "入力してください", { read: true, write: true }, 6),
  createDefaultConfig("bodyTemperature", "体温", "°C", "入力してください", { read: true, write: true }, 7),
  createDefaultConfig("boneMass", "骨量", "kg", "入力してください", { read: true, write: true }, 8),
  createDefaultConfig("cervicalMucus", "頸管粘液", "", "入力してください", { read: true, write: true }, 9),
  createDefaultConfig("cyclingPedalingCadence", "自転車ペダル回転数", "回/分", "入力してください", { read: true, write: true }, 10),
  createDefaultConfig("distance", "距離", "m", "入力してください", { read: true, write: true }, 11),
  createDefaultConfig("elevationGained", "上昇高度", "m", "入力してください", { read: true, write: true }, 12),
  createDefaultConfig("exerciseSession", "運動セッション", "分", "入力してください", { read: true, write: true }, 13),
  createDefaultConfig("floorsClimbed", "上った階数", "階", "入力してください", { read: true, write: true }, 14),
  createDefaultConfig("heartRate", "心拍数", "bpm", "入力してください", { read: true, write: true }, 15),
  createDefaultConfig("height", "身長", "cm", "入力してください", { read: true, write: true }, 16),
  createDefaultConfig("hydration", "水分摂取量", "ml", "入力してください", { read: true, write: true }, 17),
  createDefaultConfig("leanBodyMass", "除脂肪体重", "kg", "入力してください", { read: true, write: true }, 18),
  createDefaultConfig("menstruationFlow", "月経の量", "", "入力してください", { read: true, write: true }, 19),
  createDefaultConfig("menstruationPeriod", "月経期間", "", "入力してください", { read: true, write: true }, 20),
  createDefaultConfig("nutrition", "栄養", "", "入力してください", { read: true, write: true }, 21),
  createDefaultConfig("ovulationTest", "排卵検査結果", "", "入力してください", { read: true, write: true }, 22),
  createDefaultConfig("oxygenSaturation", "血中酸素飽和度", "%", "入力してください", { read: true, write: true }, 23),
  createDefaultConfig("power", "パワー", "W", "入力してください", { read: true, write: true }, 24),
  createDefaultConfig("respiratoryRate", "呼吸数", "回/分", "入力してください", { read: true, write: true }, 25),
  createDefaultConfig("restingHeartRate", "安静時心拍数", "bpm", "入力してください", { read: true, write: true }, 26),
  createDefaultConfig("sexualActivity", "性行為", "", "入力してください", { read: true, write: true }, 27),
  createDefaultConfig("sleepSession", "睡眠", "時間", "入力してください", { read: true, write: true }, 28),
  createDefaultConfig("speed", "速度", "m/s", "入力してください", { read: true, write: true }, 29),
  createDefaultConfig("stepsCadence", "歩行ケイデンス", "歩", "入力してください", { read: true, write: true }, 30),
  createDefaultConfig("steps", "歩数", "歩", "入力してください", { read: true, write: true }, 31),
  createDefaultConfig("totalCaloriesBurned", "総消費カロリー", "kcal", "入力してください", { read: true, write: true }, 32),
  createDefaultConfig("vo2Max", "最大酸素摂取量（VO2Max）", "ml/kg/min", "入力してください", { read: true, write: true }, 33),
  createDefaultConfig("weight", "体重", "kg", "入力してください", { read: true, write: true }, 34),
  createDefaultConfig("wheelchairPushes", "車椅子プッシュ数", "回", "入力してください", { read: true, write: true }, 35),
  createDefaultConfig("writeExerciseRoute", "運動ルートの記録", "", "入力してください", { read: true, write: false }, 36),
];

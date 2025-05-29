import {
  IOSHealthDataType,
  HealthDataCategory,
  IOSHealthDataConfig,
} from "../types/health";

export type HealthKitDataConfig = IOSHealthDataConfig;

// デフォルトの設定を生成する関数
const createDefaultConfig = (
  id: IOSHealthDataType,
  category: HealthDataCategory,
  title: string,
  unit: string,
  isEditable: boolean = false,
  order: number
): HealthKitDataConfig => ({
  id,
  title,
  unit,
  description: `${title}のデータ`,
  category,
  isEditable,
  isVisible: true,
  order,
  platform: "ios",
});

export const HealthKitDataConfigs: {
  [key in IOSHealthDataType]: HealthKitDataConfig;
} = {
  // 身体測定値
  bmi: createDefaultConfig("bmi", "body", "ボディマス指数（BMI）", "", true, 1),
  glassesPrescription: createDefaultConfig(
    "glassesPrescription",
    "body",
    "メガネ / コンタクトの処方箋",
    "",
    false,
    2
  ),
  basalBodyTemperature: createDefaultConfig(
    "basalBodyTemperature",
    "body",
    "基礎体温",
    "°C",
    true,
    3
  ),
  wristTemperature: createDefaultConfig(
    "wristTemperature",
    "body",
    "手首皮膚温",
    "°C",
    false,
    4
  ),
  leanBodyMass: createDefaultConfig(
    "leanBodyMass",
    "body",
    "除脂肪体重（LBM）",
    "kg",
    false,
    5
  ),
  height: {
    id: "height",
    title: "身長",
    unit: "cm",
    description: "現在の身長",
    category: "body",
    minValue: 50,
    maxValue: 250,
    decimalPlaces: 0,
    isEditable: true,
    isVisible: true,
    order: 6,
    platform: "ios",
  },
  bodyTemperatureBody: createDefaultConfig(
    "bodyTemperatureBody",
    "body",
    "体温",
    "°C",
    true,
    7
  ),
  bodyFatPercentage: createDefaultConfig(
    "bodyFatPercentage",
    "body",
    "体脂肪率",
    "%",
    true,
    8
  ),
  weight: createDefaultConfig("weight", "body", "体重", "kg", true, 9),
  waistCircumference: createDefaultConfig(
    "waistCircumference",
    "body",
    "胴回",
    "cm",
    true,
    10
  ),
  skinPotential: createDefaultConfig(
    "skinPotential",
    "body",
    "皮膚電位",
    "mV",
    false,
    11
  ),

  // アクティビティ
  steps: {
    id: "steps",
    title: "歩数",
    unit: "歩",
    description: "最新の歩数",
    category: "activity",
    minValue: 0,
    maxValue: 100000,
    decimalPlaces: 0,
    isEditable: false,
    isVisible: true,
    order: 28,
    platform: "ios",
  },
  nikeFuel: createDefaultConfig(
    "nikeFuel",
    "activity",
    "NikeFuel",
    "ポイント",
    false,
    1
  ),
  activity: createDefaultConfig(
    "activity",
    "activity",
    "アクティビティ",
    "",
    false,
    2
  ),
  activeEnergy: createDefaultConfig(
    "activeEnergy",
    "activity",
    "アクティブエネルギー",
    "kcal",
    false,
    3
  ),
  walkingRunningDistance: createDefaultConfig(
    "walkingRunningDistance",
    "activity",
    "ウォーキング + ランニングの距離",
    "km",
    false,
    4
  ),
  exerciseTime: createDefaultConfig(
    "exerciseTime",
    "activity",
    "エクササイズ時間",
    "分",
    false,
    5
  ),
  cyclingCadence: createDefaultConfig(
    "cyclingCadence",
    "activity",
    "サイクリングケイデンス",
    "rpm",
    false,
    6
  ),
  cyclingPower: createDefaultConfig(
    "cyclingPower",
    "activity",
    "サイクリングパワー",
    "W",
    false,
    7
  ),
  cyclingSpeed: createDefaultConfig(
    "cyclingSpeed",
    "activity",
    "サイクリング速度",
    "km/h",
    false,
    8
  ),
  standHours: createDefaultConfig(
    "standHours",
    "activity",
    "スタンド時間（時）",
    "時間",
    false,
    9
  ),
  standMinutes: createDefaultConfig(
    "standMinutes",
    "activity",
    "スタンド時間（分）",
    "分",
    false,
    10
  ),
  downhillSnowSportsDistance: createDefaultConfig(
    "downhillSnowSportsDistance",
    "activity",
    "ダウンヒルスノースポーツの距離",
    "km",
    false,
    11
  ),
  pushCount: createDefaultConfig(
    "pushCount",
    "activity",
    "プッシュ",
    "回",
    false,
    12
  ),
  moveTime: createDefaultConfig(
    "moveTime",
    "activity",
    "ムーブ時間",
    "分",
    false,
    13
  ),
  runningPower: createDefaultConfig(
    "runningPower",
    "activity",
    "ランニングパワー",
    "W",
    false,
    14
  ),
  runningSpeed: createDefaultConfig(
    "runningSpeed",
    "activity",
    "ランニング速度",
    "km/h",
    false,
    15
  ),
  workout: createDefaultConfig(
    "workout",
    "activity",
    "ワークアウト",
    "",
    false,
    16
  ),
  basalEnergyBurned: createDefaultConfig(
    "basalEnergyBurned",
    "activity",
    "安静時消費エネルギー",
    "kcal",
    false,
    17
  ),
  swimmingDistance: createDefaultConfig(
    "swimmingDistance",
    "activity",
    "泳いだ距離",
    "m",
    false,
    18
  ),
  functionalThresholdPower: createDefaultConfig(
    "functionalThresholdPower",
    "activity",
    "機能的作業閾値サイクリングパワー",
    "W",
    false,
    19
  ),
  cyclingDistance: createDefaultConfig(
    "cyclingDistance",
    "activity",
    "自転車の走行距離",
    "km",
    false,
    20
  ),
  wheelchairDistance: createDefaultConfig(
    "wheelchairDistance",
    "activity",
    "車椅子の走行距離",
    "km",
    false,
    21
  ),
  flightsClimbed: createDefaultConfig(
    "flightsClimbed",
    "activity",
    "上った階段",
    "階",
    false,
    22
  ),
  cardioFitness: createDefaultConfig(
    "cardioFitness",
    "activity",
    "心肺機能",
    "VO2max",
    false,
    23
  ),
  heartRate: createDefaultConfig(
    "heartRate",
    "activity",
    "心拍数回数",
    "bpm",
    false,
    24
  ),
  physicalEffort: createDefaultConfig(
    "physicalEffort",
    "activity",
    "身体エフォート",
    "",
    false,
    25
  ),
  swimmingStrokeCount: createDefaultConfig(
    "swimmingStrokeCount",
    "activity",
    "水泳のストローク数",
    "回",
    false,
    26
  ),
  underwaterDepth: createDefaultConfig(
    "underwaterDepth",
    "activity",
    "水中深度",
    "m",
    false,
    27
  ),

  // バイタル
  bloodPressure: createDefaultConfig(
    "bloodPressure",
    "vitals",
    "血圧",
    "mmHg",
    true,
    1
  ),
  bloodGlucose: createDefaultConfig(
    "bloodGlucose",
    "vitals",
    "血糖値",
    "mg/dL",
    true,
    2
  ),
  menstruation: createDefaultConfig(
    "menstruation",
    "vitals",
    "月経",
    "",
    true,
    3
  ),
  respiratoryRate: createDefaultConfig(
    "respiratoryRate",
    "vitals",
    "呼吸数",
    "回/分",
    false,
    4
  ),
  oxygenSaturation: createDefaultConfig(
    "oxygenSaturation",
    "vitals",
    "取り込まれた酸素のレベル",
    "%",
    false,
    5
  ),
  heartRateVital: createDefaultConfig(
    "heartRateVital",
    "vitals",
    "心拍数",
    "bpm",
    false,
    6
  ),
  bodyTemperature: createDefaultConfig(
    "bodyTemperature",
    "vitals",
    "体温",
    "°C",
    true,
    7
  ),

  // 栄養
  caffeine: createDefaultConfig(
    "caffeine",
    "nutrition",
    "カフェイン",
    "mg",
    true,
    1
  ),
  potassium: createDefaultConfig(
    "potassium",
    "nutrition",
    "カリウム",
    "mg",
    true,
    2
  ),
  calcium: createDefaultConfig(
    "calcium",
    "nutrition",
    "カルシウム",
    "mg",
    true,
    3
  ),
  chromium: createDefaultConfig(
    "chromium",
    "nutrition",
    "クロム",
    "μg",
    true,
    4
  ),
  selenium: createDefaultConfig(
    "selenium",
    "nutrition",
    "セレン",
    "μg",
    true,
    5
  ),
  protein: createDefaultConfig(
    "protein",
    "nutrition",
    "タンパク質",
    "g",
    true,
    6
  ),
  thiamin: createDefaultConfig(
    "thiamin",
    "nutrition",
    "チアミン",
    "mg",
    true,
    7
  ),
  niacin: createDefaultConfig(
    "niacin",
    "nutrition",
    "ナイアシン",
    "mg",
    true,
    8
  ),
  sodium: createDefaultConfig(
    "sodium",
    "nutrition",
    "ナトリウム",
    "mg",
    true,
    9
  ),
  pantothenicAcid: createDefaultConfig(
    "pantothenicAcid",
    "nutrition",
    "パントテン酸",
    "mg",
    true,
    10
  ),
  biotin: createDefaultConfig(
    "biotin",
    "nutrition",
    "ビオチン",
    "μg",
    true,
    11
  ),
  vitaminA: createDefaultConfig(
    "vitaminA",
    "nutrition",
    "ビタミンA",
    "μg",
    true,
    12
  ),
  vitaminB2: createDefaultConfig(
    "vitaminB2",
    "nutrition",
    "ビタミンB2",
    "mg",
    true,
    13
  ),
  vitaminB6: createDefaultConfig(
    "vitaminB6",
    "nutrition",
    "ビタミンB6",
    "mg",
    true,
    14
  ),
  vitaminB12: createDefaultConfig(
    "vitaminB12",
    "nutrition",
    "ビタミンB12",
    "μg",
    true,
    15
  ),
  vitaminC: createDefaultConfig(
    "vitaminC",
    "nutrition",
    "ビタミンC",
    "mg",
    true,
    16
  ),
  vitaminD: createDefaultConfig(
    "vitaminD",
    "nutrition",
    "ビタミンD",
    "μg",
    true,
    17
  ),
  vitaminE: createDefaultConfig(
    "vitaminE",
    "nutrition",
    "ビタミンE",
    "mg",
    true,
    18
  ),
  vitaminK: createDefaultConfig(
    "vitaminK",
    "nutrition",
    "ビタミンK",
    "μg",
    true,
    19
  ),
  magnesium: createDefaultConfig(
    "magnesium",
    "nutrition",
    "マグネシウム",
    "mg",
    true,
    20
  ),
  manganese: createDefaultConfig(
    "manganese",
    "nutrition",
    "マンガン",
    "mg",
    true,
    21
  ),
  molybdenum: createDefaultConfig(
    "molybdenum",
    "nutrition",
    "モリブデン",
    "μg",
    true,
    22
  ),
  iodine: createDefaultConfig("iodine", "nutrition", "ヨウ素", "μg", true, 23),
  phosphorus: createDefaultConfig(
    "phosphorus",
    "nutrition",
    "リン",
    "mg",
    true,
    24
  ),
  zinc: createDefaultConfig("zinc", "nutrition", "亜鉛", "mg", true, 25),
  monounsaturatedFat: createDefaultConfig(
    "monounsaturatedFat",
    "nutrition",
    "一価不飽和脂肪酸",
    "g",
    true,
    26
  ),
  chloride: createDefaultConfig(
    "chloride",
    "nutrition",
    "塩化物",
    "mg",
    true,
    27
  ),
  dietaryFiber: createDefaultConfig(
    "dietaryFiber",
    "nutrition",
    "食物繊維",
    "g",
    true,
    28
  ),
  dietaryCholesterol: createDefaultConfig(
    "dietaryCholesterol",
    "nutrition",
    "食物中のコレステロール",
    "mg",
    true,
    29
  ),
  dietarySugar: createDefaultConfig(
    "dietarySugar",
    "nutrition",
    "食物中の糖分",
    "g",
    true,
    30
  ),
  water: createDefaultConfig("water", "nutrition", "水分", "ml", true, 31),
  dietaryEnergy: createDefaultConfig(
    "dietaryEnergy",
    "nutrition",
    "摂取エネルギー",
    "kcal",
    true,
    32
  ),
  totalFat: createDefaultConfig(
    "totalFat",
    "nutrition",
    "総脂肪",
    "g",
    true,
    33
  ),
  polyunsaturatedFat: createDefaultConfig(
    "polyunsaturatedFat",
    "nutrition",
    "多価不飽和脂肪酸",
    "g",
    true,
    34
  ),
  carbohydrates: createDefaultConfig(
    "carbohydrates",
    "nutrition",
    "炭水化物",
    "g",
    true,
    35
  ),
  iron: createDefaultConfig("iron", "nutrition", "鉄分", "mg", true, 36),
  copper: createDefaultConfig("copper", "nutrition", "銅", "mg", true, 37),
  saturatedFat: createDefaultConfig(
    "saturatedFat",
    "nutrition",
    "飽和脂肪酸",
    "g",
    true,
    38
  ),
  folate: createDefaultConfig("folate", "nutrition", "葉酸", "μg", true, 39),

  // 呼吸
  respiratorySixMinuteWalk: createDefaultConfig(
    "respiratorySixMinuteWalk",
    "respiratory",
    "6分間歩行",
    "m",
    false,
    1
  ),
  inhalerUsage: createDefaultConfig(
    "inhalerUsage",
    "respiratory",
    "吸入器の使用状況",
    "回",
    true,
    2
  ),
  respiratoryRateVital: createDefaultConfig(
    "respiratoryRateVital",
    "respiratory",
    "呼吸数",
    "回/分",
    false,
    3
  ),
  peakExpiratoryFlow: createDefaultConfig(
    "peakExpiratoryFlow",
    "respiratory",
    "最大呼気流量",
    "L/min",
    false,
    4
  ),
  oxygenSaturationVital: createDefaultConfig(
    "oxygenSaturationVital",
    "respiratory",
    "取り込まれた酸素のレベル",
    "%",
    false,
    5
  ),
  cardioFitnessVital: createDefaultConfig(
    "cardioFitnessVital",
    "respiratory",
    "心肺機能",
    "VO2max",
    false,
    6
  ),
  forcedExpiratoryVolume: createDefaultConfig(
    "forcedExpiratoryVolume",
    "respiratory",
    "努力呼気肺活量（1秒）",
    "L",
    false,
    7
  ),
  forcedVitalCapacity: createDefaultConfig(
    "forcedVitalCapacity",
    "respiratory",
    "努力性肺活量",
    "L",
    false,
    8
  ),

  // 周期記録
  cycleRecord: createDefaultConfig(
    "cycleRecord",
    "cycle",
    "周期データ",
    "",
    false,
    1
  ),

  // 睡眠
  sleepData: createDefaultConfig(
    "sleepData",
    "sleep",
    "睡眠データ",
    "時間",
    false,
    1
  ),

  // 症状
  cough: createDefaultConfig("cough", "symptoms", "せき", "", true, 1),
  soreThroat: createDefaultConfig(
    "soreThroat",
    "symptoms",
    "のどの痛み",
    "",
    true,
    2
  ),
  hotFlash: createDefaultConfig("hotFlash", "symptoms", "ほてり", "", true, 3),
  dizziness: createDefaultConfig(
    "dizziness",
    "symptoms",
    "めまい",
    "",
    true,
    4
  ),
  chills: createDefaultConfig("chills", "symptoms", "悪寒", "", true, 5),
  diarrhea: createDefaultConfig("diarrhea", "symptoms", "下痢", "", true, 6),
  drySkin: createDefaultConfig("drySkin", "symptoms", "乾燥肌", "", true, 7),
  moodChanges: createDefaultConfig(
    "moodChanges",
    "symptoms",
    "気分の変化",
    "",
    true,
    8
  ),
  memoryLapse: createDefaultConfig(
    "memoryLapse",
    "symptoms",
    "記憶力の衰え",
    "",
    true,
    9
  ),
  chestTightness: createDefaultConfig(
    "chestTightness",
    "symptoms",
    "胸の苦しさや痛み",
    "",
    true,
    10
  ),
  heartburn: createDefaultConfig(
    "heartburn",
    "symptoms",
    "胸やけ",
    "",
    true,
    11
  ),
  irregularHeartbeat: createDefaultConfig(
    "irregularHeartbeat",
    "symptoms",
    "結滞（欠損）",
    "",
    true,
    12
  ),
  lowBackPain: createDefaultConfig(
    "lowBackPain",
    "symptoms",
    "腰痛",
    "",
    true,
    13
  ),
  pelvicPain: createDefaultConfig(
    "pelvicPain",
    "symptoms",
    "骨盤痛",
    "",
    true,
    14
  ),
  fainting: createDefaultConfig("fainting", "symptoms", "失神", "", true, 15),
  appetiteChanges: createDefaultConfig(
    "appetiteChanges",
    "symptoms",
    "食欲の変化",
    "",
    true,
    16
  ),
  nightSweats: createDefaultConfig(
    "nightSweats",
    "symptoms",
    "寝汗",
    "",
    true,
    17
  ),
  sleepChanges: createDefaultConfig(
    "sleepChanges",
    "symptoms",
    "睡眠の変化",
    "",
    true,
    18
  ),
  shortnessOfBreath: createDefaultConfig(
    "shortnessOfBreath",
    "symptoms",
    "息切れ",
    "",
    true,
    19
  ),
  bodyPain: createDefaultConfig(
    "bodyPain",
    "symptoms",
    "体および筋肉の痛み",
    "",
    true,
    20
  ),
  hairLoss: createDefaultConfig("hairLoss", "symptoms", "脱毛", "", true, 21),
  nausea: createDefaultConfig("nausea", "symptoms", "吐き気", "", true, 22),
  headache: createDefaultConfig("headache", "symptoms", "頭痛", "", true, 23),
  breastPain: createDefaultConfig(
    "breastPain",
    "symptoms",
    "乳房痛",
    "",
    true,
    24
  ),
  urinaryIncontinence: createDefaultConfig(
    "urinaryIncontinence",
    "symptoms",
    "尿失禁",
    "",
    true,
    25
  ),
  fever: createDefaultConfig("fever", "symptoms", "発熱", "", true, 26),
  fatigue: createDefaultConfig("fatigue", "symptoms", "疲労", "", true, 27),
  runnyNose: createDefaultConfig("runnyNose", "symptoms", "鼻水", "", true, 28),
  rapidHeartbeat: createDefaultConfig(
    "rapidHeartbeat",
    "symptoms",
    "頻脈（頻拍）、激しい鼓動、または不安定な鼓動",
    "",
    true,
    29
  ),
  abdominalBloating: createDefaultConfig(
    "abdominalBloating",
    "symptoms",
    "腹部膨満感",
    "",
    true,
    30
  ),
  abdominalCramps: createDefaultConfig(
    "abdominalCramps",
    "symptoms",
    "腹部疝痛",
    "",
    true,
    31
  ),
  constipation: createDefaultConfig(
    "constipation",
    "symptoms",
    "便秘",
    "",
    true,
    32
  ),
  tasteLoss: createDefaultConfig(
    "tasteLoss",
    "symptoms",
    "味覚喪失",
    "",
    true,
    33
  ),
  wheezing: createDefaultConfig("wheezing", "symptoms", "喘鳴", "", true, 34),
  smellLoss: createDefaultConfig(
    "smellLoss",
    "symptoms",
    "嗅覚喪失",
    "",
    true,
    35
  ),
  vomiting: createDefaultConfig("vomiting", "symptoms", "嘔吐", "", true, 36),
  nasalCongestion: createDefaultConfig(
    "nasalCongestion",
    "symptoms",
    "鬱血 / 鼻詰まり / 耳詰まり",
    "",
    true,
    37
  ),
  vaginalDryness: createDefaultConfig(
    "vaginalDryness",
    "symptoms",
    "膣の乾燥",
    "",
    true,
    38
  ),
  acne: createDefaultConfig("acne", "symptoms", "痤瘡", "", true, 39),

  // 心の健康状態
  depressionRisk: createDefaultConfig(
    "depressionRisk",
    "mental",
    "うつ病リスク",
    "",
    true,
    1
  ),
  mentalExerciseTime: createDefaultConfig(
    "mentalExerciseTime",
    "mental",
    "エクササイズ時間",
    "分",
    false,
    2
  ),
  mindfulMinutes: createDefaultConfig(
    "mindfulMinutes",
    "mental",
    "マインドフル時間",
    "分",
    true,
    3
  ),
  mentalState: createDefaultConfig(
    "mentalState",
    "mental",
    "心の状態",
    "",
    true,
    4
  ),
  mentalSleep: createDefaultConfig(
    "mentalSleep",
    "mental",
    "睡眠",
    "時間",
    true,
    5
  ),
  sunlightExposure: createDefaultConfig(
    "sunlightExposure",
    "mental",
    "日光下の時間",
    "分",
    true,
    6
  ),
  anxietyRisk: createDefaultConfig(
    "anxietyRisk",
    "mental",
    "不安障害リスク",
    "",
    true,
    7
  ),

  // 心臓
  restingHeartRate: createDefaultConfig(
    "restingHeartRate",
    "heart",
    "安静時心拍数",
    "bpm",
    false,
    1
  ),
  heartBloodPressure: createDefaultConfig(
    "heartBloodPressure",
    "heart",
    "血圧",
    "mmHg",
    true,
    2
  ),
  highHeartRateNotification: createDefaultConfig(
    "highHeartRateNotification",
    "heart",
    "高心拍数の通知",
    "",
    false,
    3
  ),
  ecg: createDefaultConfig("ecg", "heart", "心電図（ECG）", "", false, 4),
  heartCardioFitness: createDefaultConfig(
    "heartCardioFitness",
    "heart",
    "心肺機能",
    "VO2max",
    false,
    5
  ),
  cardioFitnessLevel: createDefaultConfig(
    "cardioFitnessLevel",
    "heart",
    "心肺機能レベル通知",
    "",
    false,
    6
  ),
  heartRateHeart: createDefaultConfig(
    "heartRateHeart",
    "heart",
    "心拍数",
    "bpm",
    false,
    7
  ),
  heartRateCount: createDefaultConfig(
    "heartRateCount",
    "heart",
    "心拍数回数",
    "bpm",
    false,
    8
  ),
  heartRateVariability: createDefaultConfig(
    "heartRateVariability",
    "heart",
    "心拍変動",
    "ms",
    false,
    9
  ),
  atrialFibrillation: createDefaultConfig(
    "atrialFibrillation",
    "heart",
    "心房細動履歴",
    "",
    false,
    10
  ),
  lowHeartRateNotification: createDefaultConfig(
    "lowHeartRateNotification",
    "heart",
    "低心拍数の通知",
    "",
    false,
    11
  ),
  microcirculation: createDefaultConfig(
    "microcirculation",
    "heart",
    "微小循環指標",
    "",
    false,
    12
  ),
  irregularHeartRhythmNotification: createDefaultConfig(
    "irregularHeartRhythmNotification",
    "heart",
    "不規則な心拍の通知",
    "",
    false,
    13
  ),
  walkingHeartRate: createDefaultConfig(
    "walkingHeartRate",
    "heart",
    "歩行時平均心拍数",
    "bpm",
    false,
    14
  ),

  // 聴覚
  audiogram: createDefaultConfig(
    "audiogram",
    "hearing",
    "オージオグラム",
    "",
    false,
    1
  ),
  noiseNotification: createDefaultConfig(
    "noiseNotification",
    "hearing",
    "ノイズ通知",
    "",
    false,
    2
  ),
  headphoneVolume: createDefaultConfig(
    "headphoneVolume",
    "hearing",
    "ヘッドフォン音量",
    "dB",
    false,
    3
  ),
  headphoneNotification: createDefaultConfig(
    "headphoneNotification",
    "hearing",
    "ヘッドフォン通知",
    "",
    false,
    4
  ),
  environmentalSoundLevel: createDefaultConfig(
    "environmentalSoundLevel",
    "hearing",
    "環境音レベル",
    "dB",
    false,
    5
  ),
  environmentalSoundReduction: createDefaultConfig(
    "environmentalSoundReduction",
    "hearing",
    "環境音除去",
    "dB",
    false,
    6
  ),

  // 服薬
  medicationData: createDefaultConfig(
    "medicationData",
    "medication",
    "服薬データ",
    "",
    true,
    1
  ),

  // 歩行
  walkingSixMinuteWalk: createDefaultConfig(
    "walkingSixMinuteWalk",
    "walking",
    "6分間歩行",
    "m",
    false,
    1
  ),
  runningStrideLength: createDefaultConfig(
    "runningStrideLength",
    "walking",
    "ランニングの歩幅の長さ",
    "m",
    false,
    2
  ),
  stairDescentSpeed: createDefaultConfig(
    "stairDescentSpeed",
    "walking",
    "階段速度: 下降",
    "m/s",
    false,
    3
  ),
  stairAscentSpeed: createDefaultConfig(
    "stairAscentSpeed",
    "walking",
    "階段速度: 上昇",
    "m/s",
    false,
    4
  ),
  verticalOscillation: createDefaultConfig(
    "verticalOscillation",
    "walking",
    "上下動",
    "cm",
    false,
    5
  ),
  walkingCardioFitness: createDefaultConfig(
    "walkingCardioFitness",
    "walking",
    "心肺機能",
    "VO2max",
    false,
    6
  ),
  groundContactTime: createDefaultConfig(
    "groundContactTime",
    "walking",
    "接地時間",
    "ms",
    false,
    7
  ),
  walkingStability: createDefaultConfig(
    "walkingStability",
    "walking",
    "歩行安定性",
    "",
    false,
    8
  ),
  walkingStabilityNotification: createDefaultConfig(
    "walkingStabilityNotification",
    "walking",
    "歩行安定性通知",
    "",
    false,
    9
  ),
  walkingSpeed: createDefaultConfig(
    "walkingSpeed",
    "walking",
    "歩行速度",
    "m/s",
    false,
    10
  ),
  walkingAsymmetry: createDefaultConfig(
    "walkingAsymmetry",
    "walking",
    "歩行非対称性",
    "%",
    false,
    11
  ),
  walkingDoubleSupportTime: createDefaultConfig(
    "walkingDoubleSupportTime",
    "walking",
    "歩行両脚支持時間",
    "ms",
    false,
    12
  ),
  stepLength: createDefaultConfig(
    "stepLength",
    "walking",
    "歩幅",
    "m",
    false,
    13
  ),

  // その他のデータ
  uvExposure: createDefaultConfig(
    "uvExposure",
    "other",
    "UV指数",
    "J/m²",
    false,
    1
  ),
  insulinDelivery: createDefaultConfig(
    "insulinDelivery",
    "other",
    "インスリン放出",
    "単位",
    true,
    2
  ),
  alcoholConsumption: createDefaultConfig(
    "alcoholConsumption",
    "other",
    "飲酒量",
    "ml",
    true,
    3
  ),
  inhalerUsageOther: createDefaultConfig(
    "inhalerUsageOther",
    "other",
    "吸入器の使用状況",
    "回",
    true,
    4
  ),
  bloodAlcoholContent: createDefaultConfig(
    "bloodAlcoholContent",
    "other",
    "血中アルコール濃度",
    "%",
    false,
    5
  ),
  bloodGlucoseOther: createDefaultConfig(
    "bloodGlucoseOther",
    "other",
    "血糖値",
    "mg/dL",
    true,
    6
  ),
  toothbrushing: createDefaultConfig(
    "toothbrushing",
    "other",
    "歯磨き",
    "回",
    true,
    7
  ),
  handwashing: createDefaultConfig(
    "handwashing",
    "other",
    "手洗い",
    "回",
    true,
    8
  ),
  waterTemperature: createDefaultConfig(
    "waterTemperature",
    "other",
    "水温",
    "°C",
    false,
    9
  ),
  sexualActivity: createDefaultConfig(
    "sexualActivity",
    "other",
    "性行為",
    "",
    true,
    10
  ),
  fallCount: createDefaultConfig(
    "fallCount",
    "other",
    "転倒回数",
    "回",
    false,
    11
  ),
  sunlightExposureOther: createDefaultConfig(
    "sunlightExposureOther",
    "other",
    "日光下の時間",
    "分",
    true,
    12
  ),
};

// カテゴリーごとの表示順序
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

// 設定を取得するためのユーティリティ関数
export const getHealthKitDataConfig = (
  type: IOSHealthDataType
): HealthKitDataConfig => {
  return HealthKitDataConfigs[type];
};

// カテゴリーごとのデータを取得
export const getHealthDataByCategory = (
  category: HealthDataCategory
): HealthKitDataConfig[] => {
  return Object.values(HealthKitDataConfigs)
    .filter((config) => config.category === category && config.isVisible)
    .sort((a, b) => a.order - b.order);
};

// 全ての表示可能なデータを取得（カテゴリー順）
export const getAllVisibleHealthData = (): HealthKitDataConfig[] => {
  return categoryOrder.flatMap((category) => getHealthDataByCategory(category));
};

// 編集可能なデータのみを取得
export const getEditableHealthData = (): HealthKitDataConfig[] => {
  return Object.values(HealthKitDataConfigs)
    .filter((config) => config.isEditable && config.isVisible)
    .sort((a, b) => a.order - b.order);
};

// カテゴリーごとの表示制御
const visibleCategories = ["body", "activity", "vitals"];
const filteredConfigs = Object.values(HealthKitDataConfigs)
  .filter((config) => visibleCategories.includes(config.category))
  .map((config) => ({ ...config, isVisible: true }));

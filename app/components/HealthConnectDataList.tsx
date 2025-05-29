import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { HealthDataCard } from "./HealthDataCard";
import { platformService } from "../services/PlatformService";
import { androidHealthDataConfigs } from "../config/healthConnectDataConfig";

export const HealthConnectDataList = () => {
  const [activeCaloriesBurned, setActiveCaloriesBurned] = useState("");
  const [basalBodyTemperature, setBasalBodyTemperature] = useState("");
  const [basalMetabolicRate, setBasalMetabolicRate] = useState("");
  const [bloodGlucose, setBloodGlucose] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [bodyTemperature, setBodyTemperature] = useState("");
  const [boneMass, setBoneMass] = useState("");
  const [cervicalMucus, setCervicalMucus] = useState("");
  const [cyclingPedalingCadence, setCyclingPedalingCadence] = useState("");
  const [distance, setDistance] = useState("");
  const [elevationGained, setElevationGained] = useState("");
  const [exerciseSession, setExerciseSession] = useState("");
  const [floorsClimbed, setFloorsClimbed] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [height, setHeight] = useState("");
  const [hydration, setHydration] = useState("");
  const [leanBodyMass, setLeanBodyMass] = useState("");
  const [menstruationFlow, setMenstruationFlow] = useState("");
  const [menstruationPeriod, setMenstruationPeriod] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [ovulationTest, setOvulationTest] = useState("");
  const [oxygenSaturation, setOxygenSaturation] = useState("");
  const [power, setPower] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [restingHeartRate, setRestingHeartRate] = useState("");
  const [sexualActivity, setSexualActivity] = useState("");
  const [sleepSession, setSleepSession] = useState("");
  const [speed, setSpeed] = useState("");
  const [stepsCadence, setStepsCadence] = useState("");
  const [steps, setSteps] = useState("");
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState("");
  const [vo2Max, setVo2Max] = useState("");
  const [weight, setWeight] = useState("");
  const [wheelchairPushes, setWheelchairPushes] = useState("");
  const [writeExerciseRoute, setWriteExerciseRoute] = useState(""); // 読み取り不可
  const [isLoading, setIsLoading] = useState(false);

  const configs = androidHealthDataConfigs;

  useEffect(() => {
    initHealthData();
  }, [configs]);

  const initHealthData = async () => {
    try {
      setIsLoading(true);
      const healthService = platformService.getHealthConnectService();
      await healthService.initialize();
      const granted = await healthService.requestPermissions();

      if (granted) {
        await fetchHealthData();
        setIsLoading(false);
      } else {
        Alert.alert("エラー", "ヘルスデータへのアクセス権限が必要です。");
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert("エラー", error instanceof Error ? error.message : "不明なエラー");
      setIsLoading(false);
    }
  };

  const fetchHealthData = async () => {
    setIsLoading(true);
    const healthService = platformService.getHealthConnectService();
    const healthData = await healthService.fetchAllHealthData();

    if (healthData) {
      setActiveCaloriesBurned(healthData.activeCaloriesBurned?.toString() || "");
      setBasalBodyTemperature(healthData.basalBodyTemperature?.toString() || "");
      setBasalMetabolicRate(healthData.basalMetabolicRate?.toString() || "");
      setBloodGlucose(healthData.bloodGlucose?.toString() || "");
      setBloodPressure(healthData.bloodPressure ? `${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic}` : "");
      setBodyFat(healthData.bodyFat?.toString() || "");
      setBodyTemperature(healthData.bodyTemperature?.toString() || "");
      setBoneMass(healthData.boneMass?.toString() || "");
      setCervicalMucus(healthData.cervicalMucus || "");
      setCyclingPedalingCadence(healthData.cyclingPedalingCadence?.toString() || "");
      setDistance(healthData.distance?.toString() || "");
      setElevationGained(healthData.elevationGained?.toString() || "");
      setExerciseSession(healthData.exerciseSession?.toString() || "");
      setFloorsClimbed(healthData.floorsClimbed?.toString() || "");
      setHeartRate(healthData.heartRate?.toString() || "");
      setHeight(healthData.height?.toString() || "");
      setHydration(healthData.hydration?.toString() || "");
      setLeanBodyMass(healthData.leanBodyMass?.toString() || "");
      setMenstruationFlow(healthData.menstruationFlow || "");
      setMenstruationPeriod(healthData.menstruationPeriod || "");
      setNutrition(healthData.nutrition || "");
      setOvulationTest(healthData.ovulationTest || "");
      setOxygenSaturation(healthData.oxygenSaturation?.toString() || "");
      setPower(healthData.power?.toString() || "");
      setRespiratoryRate(healthData.respiratoryRate?.toString() || "");
      setRestingHeartRate(healthData.restingHeartRate?.toString() || "");
      setSexualActivity(healthData.sexualActivity || "");
      setSleepSession(healthData.sleepSession?.toString() || "");
      setSpeed(healthData.speed?.toString() || "");
      setStepsCadence(healthData.stepsCadence?.toString() || "");
      setSteps(healthData.steps?.toString() || "");
      setTotalCaloriesBurned(healthData.totalCaloriesBurned?.toString() || "");
      setVo2Max(healthData.vo2Max?.toString() || "");
      setWeight(healthData.weight?.toString() || "");
      setWheelchairPushes(healthData.wheelchairPushes?.toString() || "");
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        {/* {Platform.OS === "ios" && category && (
          <Text style={styles.categoryTitle}>{category}</Text>
        )} */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* {Platform.OS === "ios" && category && (
        <Text style={styles.categoryTitle}>{category}</Text>
      )} */}
      <ScrollView style={styles.scrollView}>
        {configs?.map((config) => {
          // config.idに基づいて適切な値を取得
          const getValue = (id: string) => {
            switch (id) {
              case "activeCaloriesBurned":
                return activeCaloriesBurned;
              case "basalBodyTemperature":
                return basalBodyTemperature;
              case "basalMetabolicRate":
                return basalMetabolicRate;
              case "bloodGlucose":
                return bloodGlucose;
              case "bloodPressure":
                return bloodPressure;
              case "bodyFat":
                return bodyFat;
              case "bodyTemperature":
                return bodyTemperature;
              case "boneMass":
                return boneMass;
              case "cervicalMucus":
                return cervicalMucus;
              case "cyclingPedalingCadence":
                return cyclingPedalingCadence;
              case "distance":
                return distance;
              case "elevationGained":
                return elevationGained;
              case "exerciseSession":
                return exerciseSession;
              case "floorsClimbed":
                return floorsClimbed;
              case "heartRate":
                return heartRate;
              case "height":
                return height;
              case "hydration":
                return hydration;
              case "leanBodyMass":
                return leanBodyMass;
              case "menstruationFlow":
                return menstruationFlow;
              case "menstruationPeriod":
                return menstruationPeriod;
              case "nutrition":
                return nutrition;
              case "ovulationTest":
                return ovulationTest;
              case "oxygenSaturation":
                return oxygenSaturation;
              case "power":
                return power;
              case "respiratoryRate":
                return respiratoryRate;
              case "restingHeartRate":
                return restingHeartRate;
              case "sexualActivity":
                return sexualActivity;
              case "sleepSession":
                return sleepSession;
              case "speed":
                return speed;
              case "stepsCadence":
                return stepsCadence;
              case "steps":
                return steps;
              case "totalCaloriesBurned":
                return totalCaloriesBurned;
              case "vo2Max":
                return vo2Max;
              case "weight":
                return weight;
              case "wheelchairPushes":
                return wheelchairPushes;
              default:
                return "";
            }
          };

          return (
            <HealthDataCard
              key={config.id}
              id={config.id}
              title={config.title}
              value={getValue(config.id)}
              unit={config.unit}
              placeholder={config.placeholder ?? ""}
              onDataUpdate={fetchHealthData}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

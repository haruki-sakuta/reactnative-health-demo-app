import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { platformService } from "../services/PlatformService";

interface HealthDataInputModalProps {
  id: string;
  visible: boolean;
  title: string;
  unit: string;
  placeholder: string;
  onClose: () => void;
  onDataUpdate: () => void;
}

export const HealthDataInputModal: React.FC<HealthDataInputModalProps> = ({
  id,
  visible,
  title,
  unit,
  placeholder,
  onClose,
  onDataUpdate,
}) => {
  useEffect(() => {}, [id]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (inputValue === "") {
      Alert.alert("エラー", "有効な値を入力してください。");
      return;
    }

    try {
      const healthService = platformService.getHealthConnectService();
      console.log("id", id);

      switch (id) {
        case "activeCaloriesBurned":
          await healthService.saveActiveCaloriesBurned(inputValue);
          break;
        case "basalBodyTemperature":
          await healthService.saveBasalBodyTemperature(inputValue);
          break;
        case "basalMetabolicRate":
          await healthService.saveBasalMetabolicRate(inputValue);
          break;
        case "bloodGlucose":
          await healthService.saveBloodGlucose(inputValue);
          break;
        case "bloodPressure":
          await healthService.saveBloodPressure({ systolic: "150", diastolic: "100" });
          break;
        case "bodyFat":
          await healthService.saveBodyFat(inputValue);
          break;
        case "bodyTemperature":
          await healthService.saveBodyTemperature(inputValue);
          break;
        case "boneMass":
          await healthService.saveBoneMass(inputValue);
          break;
        case "cervicalMucus":
          await healthService.saveCervicalMucus(inputValue);
          break;
        case "cyclingPedalingCadence":
          await healthService.saveCyclingPedalingCadence(inputValue);
          break;
        case "distance":
          await healthService.saveDistance(inputValue);
          break;
        case "elevationGained":
          await healthService.saveElevationGained(inputValue);
          break;
        case "exerciseSession":
          await healthService.saveExerciseSession(inputValue);
          break;
        case "floorsClimbed":
          await healthService.saveFloorsClimbed(inputValue);
          break;
        case "heartRate":
          await healthService.saveHeartRate(inputValue);
          break;
        case "height":
          await healthService.saveHeight(inputValue);
          break;
        case "hydration":
          await healthService.saveHydration(inputValue);
          break;
        case "leanBodyMass":
          await healthService.saveLeanBodyMass(inputValue);
          break;
        case "menstruationFlow":
          await healthService.saveMenstruationFlow(inputValue);
          break;
        case "menstruationPeriod":
          await healthService.saveMenstruationPeriod(inputValue);
          break;
        case "nutrition":
          await healthService.saveNutrition("protein", inputValue);
          break;
        case "ovulationTest":
          await healthService.saveOvulationTest(inputValue);
          break;
        case "oxygenSaturation":
          await healthService.saveOxygenSaturation(inputValue);
          break;
        case "power":
          await healthService.savePower(inputValue);
          break;
        case "respiratoryRate":
          await healthService.saveRespiratoryRate(inputValue);
          break;
        case "restingHeartRate":
          await healthService.saveRestingHeartRate(inputValue);
          break;
        case "sexualActivity":
          await healthService.saveSexualActivity(inputValue);
          break;
        case "sleepSession":
          await healthService.saveSleepSession(inputValue);
          break;
        case "speed":
          await healthService.saveSpeed(inputValue);
          break;
        case "stepsCadence":
          await healthService.saveStepsCadence(inputValue);
          break;
        case "steps":
          await healthService.saveSteps(inputValue);
          break;
        case "totalCaloriesBurned":
          await healthService.saveTotalCaloriesBurned(inputValue);
          break;
        case "vo2Max":
          await healthService.saveVo2Max(inputValue);
          break;
        case "weight":
          await healthService.saveWeight(inputValue);
          break;
        case "wheelchairPushes":
          await healthService.saveWheelchairPushes(inputValue);
          break;
        default:
          break;
      }

      setInputValue("");
      onDataUpdate();
      Alert.alert("成功", "データを保存しました。");
      onClose();
    } catch (error) {
      Alert.alert("エラー", "データの保存に失敗しました。");
      console.error("handleSave error:", JSON.stringify(error));
      setIsLoading(false);
      onClose();
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={placeholder}
              keyboardType="numeric"
              editable={!isLoading}
            />
            <Text style={styles.unit}>{unit}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.cancelButton, isLoading && styles.disabledButton]} onPress={onClose} disabled={isLoading}>
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, isLoading && styles.disabledButton]} onPress={handleSave} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>保存</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 16,
  },
  unit: {
    fontSize: 16,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

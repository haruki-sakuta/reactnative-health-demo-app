import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { HealthDataCard } from "../components/HealthDataCard";
import { InputForm } from "../components/InputForm";
import { platformService } from "../services/PlatformService";

export const HomeScreen: React.FC = () => {
  const [height, setHeight] = useState<number | null>(null);
  const [steps, setSteps] = useState<number | null>(null);
  const [inputHeight, setInputHeight] = useState("");

  useEffect(() => {
    initHealthData();
  }, []);

  const initHealthData = async () => {
    try {
      const healthService = platformService.getHealthService();
      await healthService.initialize();
      const granted = await healthService.requestPermissions();

      if (granted) {
        await fetchHealthData();
      } else {
        Alert.alert("エラー", "ヘルスデータへのアクセス権限が必要です。");
      }
    } catch (error) {
      Alert.alert(
        "エラー",
        error instanceof Error ? error.message : "不明なエラー"
      );
    }
  };

  const fetchHealthData = async () => {
    const healthService = platformService.getHealthService();
    const [heightData, stepsData] = await Promise.all([
      healthService.fetchHeight(),
      healthService.fetchSteps(),
    ]);
    setHeight(heightData);
    setSteps(stepsData);
  };

  const handleSaveHeight = async () => {
    const heightValue = parseFloat(inputHeight);
    if (isNaN(heightValue) || heightValue <= 0) {
      Alert.alert("エラー", "有効な身長を入力してください。");
      return;
    }

    try {
      const healthService = platformService.getHealthService();
      await healthService.saveHeight(heightValue);
      setInputHeight("");
      await fetchHealthData();
      Alert.alert("成功", "身長データを保存しました。");
    } catch (error) {
      Alert.alert("エラー", "身長データの保存に失敗しました。");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <HealthDataCard
          title="身長"
          value={height}
          unit="cm"
          onRefresh={fetchHealthData}
        />

        <InputForm
          label="身長を入力"
          value={inputHeight}
          onChange={setInputHeight}
          onSubmit={handleSaveHeight}
          placeholder="身長を入力（cm）"
        />

        <HealthDataCard
          title="今日の歩数"
          value={steps}
          unit="歩"
          onRefresh={fetchHealthData}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
  },
});

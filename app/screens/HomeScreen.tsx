import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { HealthDataCard } from "../components/HealthDataCard";
import { HealthDataInputModal } from "../components/HealthDataInputModal";
import { platformService } from "../services/PlatformService";

export const HomeScreen: React.FC = () => {
  const [height, setHeight] = useState<number | null>(null);
  const [steps, setSteps] = useState<number | null>(null);
  const [isHeightModalVisible, setIsHeightModalVisible] = useState(false);

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

  const handleSaveHeight = async (heightValue: number) => {
    try {
      const healthService = platformService.getHealthService();
      await healthService.saveHeight(heightValue);
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
          onPress={() => setIsHeightModalVisible(true)}
        />

        <HealthDataInputModal
          visible={isHeightModalVisible}
          onClose={() => setIsHeightModalVisible(false)}
          onSave={handleSaveHeight}
          title="身長を入力"
          placeholder="身長を入力"
          unit="cm"
        />

        <HealthDataCard title="今日の歩数" value={steps} unit="歩" />
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

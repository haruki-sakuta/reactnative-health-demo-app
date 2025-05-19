import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
  Platform,
} from "react-native";
import { HealthDataList } from "../components/HealthDataList";
import {
  categoryOrder,
  categoryNames,
  getHealthDataByCategory,
  getAllVisibleHealthData,
} from "../config/healthConnectDataConfig";
import { platformService } from "../services/PlatformService";

export const HomeScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initHealthData();
  }, []);

  const initHealthData = async () => {
    try {
      await platformService.initialize();
      const healthService = await platformService.getHealthService();
      const granted = await healthService.requestPermissions();

      if (!granted) {
        Alert.alert("エラー", "ヘルスデータへのアクセス権限が必要です。");
        return;
      }

      setIsInitialized(true);
    } catch (error) {
      Alert.alert(
        "エラー",
        error instanceof Error ? error.message : "不明なエラー"
      );
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await initHealthData();
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      </View>
    );
  }

  // Androidの場合はカテゴリなしの一覧表示
  if (Platform.OS === "android") {
    const allConfigs = getAllVisibleHealthData();
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HealthDataList
          category="ヘルスデータ"
          configs={allConfigs}
          onDataUpdate={onRefresh}
        />
      </ScrollView>
    );
  }

  // iOSの場合はカテゴリ別表示
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {categoryOrder.map((category) => {
        const configs = getHealthDataByCategory(category);
        if (configs.length === 0) return null;

        return (
          <HealthDataList
            key={category}
            category={categoryNames[category]}
            configs={configs}
            onDataUpdate={onRefresh}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

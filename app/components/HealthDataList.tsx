import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  HealthDataType,
  IOSHealthDataConfig,
  AndroidHealthDataConfig,
  PlatformDataConfig,
} from "../types/health";
import { HealthDataCard } from "./HealthDataCard";
import { platformService } from "../services/PlatformService";
import { getPlatformConfigs } from "../config/healthConnectDataConfig";
import { getAllVisibleHealthConnectData } from "../config/healthConnectDataConfig";

type HealthDataConfig = PlatformDataConfig;

interface HealthDataListProps {
  category?: string;
  configs?: HealthDataConfig[];
  onDataUpdate?: () => void;
}

export const HealthDataList: React.FC<HealthDataListProps> = ({
  category,
  configs: propConfigs,
  onDataUpdate,
}) => {
  const [dataValues, setDataValues] = useState<{
    [key: string]: number | null;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // プラットフォームに応じた設定を取得
  const configs =
    propConfigs ||
    (Platform.OS === "android"
      ? getAllVisibleHealthConnectData()
      : getPlatformConfigs());

  useEffect(() => {
    fetchAllData();
  }, [configs]);

  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);
    const newValues: { [key: string]: number | null } = {};

    try {
      const healthService = await platformService.getHealthService();

      for (const config of configs) {
        try {
          const value = await healthService.fetchData(config.id);
          newValues[config.id] = value.value;
        } catch (error) {
          console.error(`Error fetching ${config.id} data:`, error);
          newValues[config.id] = null;
        }
      }

      setDataValues(newValues);
    } catch (error) {
      console.error("Error initializing health service:", error);
      setError("ヘルスデータの初期化に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataUpdate = async (type: HealthDataType, value: number) => {
    try {
      const healthService = await platformService.getHealthService();
      await healthService.saveData(type, value);
      await fetchAllData();
      if (onDataUpdate) {
        onDataUpdate();
      }
    } catch (error) {
      console.error(`Error saving ${type} data:`, error);
      setError("データの保存に失敗しました");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && category && (
          <Text style={styles.categoryTitle}>{category}</Text>
        )}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && category && (
          <Text style={styles.categoryTitle}>{category}</Text>
        )}
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  const isEditable = (config: HealthDataConfig) => {
    if (Platform.OS === "android") {
      return config.androidConfig?.permissions.write ?? false;
    }
    return config.isEditable;
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && category && (
        <Text style={styles.categoryTitle}>{category}</Text>
      )}
      <ScrollView style={styles.scrollView}>
        {configs.map((config) => (
          <HealthDataCard
            key={config.id}
            title={config.title}
            value={dataValues[config.id] ?? null}
            unit={config.unit}
            type={config.id}
            onPress={
              isEditable(config)
                ? () => handleDataUpdate(config.id, 0)
                : undefined
            }
          />
        ))}
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

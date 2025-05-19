import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { HealthDataCardProps } from "../types/health";
import { HealthDataInputModal } from "./HealthDataInputModal";
import { platformService } from "../services/PlatformService";

export const HealthDataCard: React.FC<HealthDataCardProps> = ({
  title,
  value,
  unit,
  onPress,
  type,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setIsModalVisible(true);
    }
  };

  const handleSave = async (newValue: number) => {
    if (!type) return;

    try {
      setIsSaving(true);
      const healthService = await platformService.getHealthService();

      switch (type) {
        case "height":
          await healthService.saveHeight(newValue);
          break;
        // 他のデータタイプの保存処理を追加
        default:
          throw new Error("未対応のデータタイプです");
      }

      setIsModalVisible(false);
      // 保存成功後にデータを再取得するためのコールバック
      if (onPress) {
        onPress();
      }
    } catch (error) {
      Alert.alert("エラー", "データの保存に失敗しました");
      console.error("Save data error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>
              {value !== null ? `${value}${unit}` : "データなし"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <HealthDataInputModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
        title={title}
        placeholder="数値を入力"
        unit={unit}
        isLoading={isSaving}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  valueContainer: {
    minWidth: 80,
    alignItems: "flex-end",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});

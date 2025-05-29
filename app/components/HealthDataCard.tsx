/**
 * TODO
 * configのwriteの状況によって、タップ時無効にする（見分けるタブも表示したい）
 */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { HealthDataInputModal } from "./HealthDataInputModal";

interface HealthDataCardProps {
  id: string;
  title: string;
  value: string;
  unit: string;
  placeholder: string;
  onDataUpdate: () => void;
}

export const HealthDataCard: React.FC<HealthDataCardProps> = ({ id, title, value, unit, placeholder, onDataUpdate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={() => setIsModalVisible(true)}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{value !== "" ? `${value}${unit}` : "データなし"}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <HealthDataInputModal
        id={id}
        visible={isModalVisible}
        title={title}
        unit={unit}
        placeholder={placeholder}
        onClose={() => setIsModalVisible(false)}
        onDataUpdate={onDataUpdate}
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

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { HealthDataCardProps } from "../types/health";

export const HealthDataCard: React.FC<HealthDataCardProps> = ({
  title,
  value,
  unit,
  onRefresh,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <Text style={styles.refreshText}>更新</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.value}>
        {value !== null ? `${value}${unit}` : "データなし"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  refreshButton: {
    padding: 4,
  },
  refreshText: {
    color: "#007AFF",
    fontSize: 14,
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
});

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { HealthConnectDataList } from "../components/HealthConnectDataList";

export const HomeScreen: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <ScrollView style={styles.container}>
      <HealthConnectDataList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

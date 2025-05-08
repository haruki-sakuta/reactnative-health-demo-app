import { Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { useCallback } from "react";
import { platformService } from "./services/PlatformService";

export default function RootLayout() {
  const handleRefresh = useCallback(async () => {
    try {
      const healthService = platformService.getHealthService();
      await healthService.fetchHeight();
      await healthService.fetchSteps();
    } catch (error) {
      console.error("データの更新に失敗しました:", error);
    }
  }, []);

  return (
    <Stack
      screenOptions={{
        headerTitle: "健康データ",
        headerRight: () => (
          <TouchableOpacity onPress={handleRefresh} style={{ marginRight: 16 }}>
            <Text style={{ color: "#007AFF", fontSize: 16, fontWeight: "600" }}>
              更新
            </Text>
          </TouchableOpacity>
        ),
      }}
    />
  );
}

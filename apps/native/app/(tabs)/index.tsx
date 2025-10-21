import { Container } from "@/components/container";
import { ScrollView, Text, View } from "react-native";

export default function TabOne() {
  return (
    <Container>
      <View className="flex-1 items-center justify-center">
        <Text className="text-foreground font-sans">Home</Text>
      </View>
    </Container>
  );
}

import { Text, View } from "react-native";
import "../global.css"
 

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-2xl border-2 border-green-700">Hello, World Hey!</Text>
    </View>
  );
}

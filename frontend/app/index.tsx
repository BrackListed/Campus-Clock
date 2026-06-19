import { Bell } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View className="flex-1 bg-slate-950 flex flex-col">
      <View className="bg-slate-800/70 h-28 rounded-t-lg flex flex-row items-center justify-between">
        <View className="flex-row gap-2 px-4 py-3 h-full w-1/2 items-center">
          <Image
            source={require("../assets/images/Campus-Clock-logo.png")}
            className="w-12 h-full"
            resizeMode="contain"
          />
          <Text className="text-zinc-50 font-semibold">CAMPUS CLOCK</Text>
        </View>
        <View className="flex-row gap-3 flex justify-end px-4 py-3 items-center text-zinc-50">
          <Image
            source={require("../assets/images/esquie.jpg")}
            className="w-10 h-10 rounded-full"
            resizeMode="contain"
          />
          <Bell fill={"white"} color={"white"} />
        </View>
      </View>
      <View className="flex-1 flex-col flex px-3 py-2 text-zinc-50 overflow-y-auto">
        <View className="bg-slate-800/70 border-2 border-green-50 h-56 p-2 flex flex-col gap-1">
          <Text className="text-zinc-50 font-bold text-lg">
            School Commute Tracker
          </Text>
          <View className="flex flex-row gap-1">
            <Text className="text-zinc-50">Status:</Text>
            <Text className="text-lime-300">
              Actively Monitoring(Background)
            </Text>
          </View>
          <View className="flex flex-col gap-3 w-full border items-center border-white/10 rounded-xl py-1 h-28">
            <Text className="font-bold text-lime-300 text-xl">LIVE TIMER</Text>
            <Text className="font-bold text-lime-200 text-3xl">00:00:000</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

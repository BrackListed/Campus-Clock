import { Link } from "expo-router";
import {
    CalendarClock,
    History,
    Home,
    LogOut,
    Notebook,
    Settings,
    TextAlignJustify,
    User,
} from "lucide-react-native";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LeftProps = {
  setToggleDropdown: (value: boolean) => void;
};

export default function Left({ setToggleDropdown }: LeftProps) {
  return (
    <SafeAreaView edges={["top"]} className="absolute inset-0 z-[9999]">
      <Pressable
        className="absolute inset-0 bg-black/60"
        onPress={() => setToggleDropdown(false)}
      />
      <ScrollView className="absolute top-0 left-0 bottom-0 w-64 bg-slate-800 border-r border-white/10 p-4">
        <Pressable onPress={() => setToggleDropdown(false)}>
          <View className="flex-row flex gap-2 h-20 items-center">
            <TextAlignJustify color="white" size={16} />
            <Image
              source={require("../../assets/images/Campus-Clock-logo.png")}
              className="w-12 h-full"
              resizeMode="contain"
            />
            <Text className="text-zinc-50 font-semibold text-xl">
              Campus Clock
            </Text>
          </View>
        </Pressable>
        <View className="flex gap-5 mt-5">
          <Link href={"/"}>
            <View className="flex flex-row items-center gap-1">
              <Home color="white" size={20} />
              <Text className="text-zinc-50">Home</Text>
            </View>
          </Link>
          <View className="flex flex-row items-center gap-1">
            <User color="white" size={20} />
            <Text className="text-zinc-50">Profile</Text>
          </View>
          <View className="flex flex-row items-center gap-1">
            <Notebook color="white" size={20} />
            <Text className="text-zinc-50">Assignments</Text>
          </View>
          <Link href="/Timetable" asChild>
            <Pressable className="flex flex-row items-center gap-1">
              <History color="white" size={20} />
              <Text className="text-zinc-50">History</Text>
            </Pressable>
          </Link>
          <View className="flex flex-row items-center gap-1">
            <CalendarClock color="white" size={20} />
            <Text className="text-zinc-50">Time Records</Text>
          </View>
          <View className="flex flex-row items-center gap-1">
            <Settings color="white" size={20} />
            <Text className="text-zinc-50">Settings</Text>
          </View>
          <View className="flex flex-row items-center gap-1">
            <LogOut color="white" size={20} />
            <Text className="text-zinc-50">Logout</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { Bell, TextAlignJustify } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

type HeaderProps = {
  toggleDropdown: boolean;
  setToggleDropdown: (value: boolean) => void;
};

export default function Header({
  toggleDropdown,
  setToggleDropdown,
}: HeaderProps) {
  return (
    <View className="bg-slate-800/70 h-28 rounded-t-lg flex flex-row items-center justify-between">
      <View className="flex-row gap-2 px-4 py-3 h-full w-1/2 items-center">
        <TextAlignJustify
          color="white"
          size={20}
          onPress={() => setToggleDropdown(!toggleDropdown)}
        />
        <Pressable onPress={() => setToggleDropdown(!toggleDropdown)}>
          <Image
            source={require("../../assets/images/Campus-Clock-logo.png")}
            className="w-12 h-full"
            resizeMode="contain"
          />
        </Pressable>
        <Text className="text-zinc-50 font-semibold">CAMPUS CLOCK</Text>
      </View>
      <View className="flex-row gap-3 flex justify-end px-4 py-3 items-center text-zinc-50">
        <Image
          source={require("../../assets/images/esquie.jpg")}
          className="w-10 h-10 rounded-full"
          resizeMode="contain"
        />
        <Bell fill="white" color="white" />
      </View>
    </View>
  );
}

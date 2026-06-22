import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as HeaderModule from "./_components/Header";
import * as LeftModule from "./_components/Left";

const Header = HeaderModule.default;
const Left = LeftModule.default;

export default function Timetable() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-slate-950 flex flex-col">
      <ScrollView
        className="flex-1 bg-slate-950"
        contentContainerClassName="flex-grow"
      >
        <Header
          toggleDropdown={toggleDropdown}
          setToggleDropdown={setToggleDropdown}
        />
        <View className="flex-1 bg-slate-950" />
      </ScrollView>
      {toggleDropdown && <Left setToggleDropdown={setToggleDropdown} />}
    </SafeAreaView>
  );
}

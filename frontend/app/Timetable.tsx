import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as HeaderModule from "./_components/Header";
import * as LeftModule from "./_components/Left";

const Header = HeaderModule.default;
const Left = LeftModule.default;

export default function Timetable() {
  const [timeStorage, setTimeStorage] = useState<string[]>([]);
  useEffect(() => {
    const getTimeRecords = async () => {
      try {
        const timeRecords = await AsyncStorage.getItem("timerecords");
        setTimeStorage(timeRecords ? JSON.parse(timeRecords) : []);
        return timeRecords;
      } catch (error) {
        console.error("Failed to get timerecords:", error);
        return null;
      }
    };
    getTimeRecords();
  }, []);
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
        <View className="flex-1 bg-slate-950 px-4 pt-4 pb-8">
          <Text className="mb-4 text-2xl font-bold text-white">Timetable</Text>
          {timeStorage.length === 0 ? (
            <View className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-5">
              <Text className="text-base text-slate-300">
                No time records available.
              </Text>
            </View>
          ) : (
            timeStorage.map((record, index) => (
              <View
                key={`${record}-${index}`}
                className="mb-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-white">
                    Record {index + 1}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <View className="rounded-full bg-cyan-500/15 px-3 py-1">
                      <Text className="text-xs font-semibold text-cyan-300">
                        Saved
                      </Text>
                    </View>
                    <Text
                      onPress={() => removeRecord(index)}
                      className="rounded-full px-2 py-1 text-sm font-bold text-red-400"
                    >
                      X
                    </Text>
                  </View>
                </View>

                <Text className="mt-3 text-base leading-6 text-slate-300">
                  {record}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      {toggleDropdown && <Left setToggleDropdown={setToggleDropdown} />}
    </SafeAreaView>
  );
  function removeRecord(index: number) {
    const newRecords = timeStorage.filter((_, i) => i !== index);
    setTimeStorage(newRecords);
    AsyncStorage.setItem("timerecords", JSON.stringify(newRecords)).catch(
      (err) => console.error("Failed to save timerecords:", err),
    );
  }
}

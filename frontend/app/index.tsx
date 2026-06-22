import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";
import { AlarmClock, Calendar, ChevronDown } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TimerPickerModal } from "react-native-timer-picker";
import "../global.css";
import Header from "./_components/Header";
import Left from "./_components/Left";

export default function Index() {
  const [today, setToday] = useState<Date>();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleTimePicker, setToggleTimePicker] = useState(false);
  const [alarmString, setAlarmString] = useState<string | null>(null);
  const [alarmHours, setAlarmHours] = useState(0);
  const [alarmMinutes, setAlarmMinutes] = useState(0);
  const [alarmSeconds, setAlarmSeconds] = useState(0);
  const [toggleAlarm, setToggleAlarm] = useState(false);
  const [toggleStopwatch, setToggleStopwatch] = useState(false);
  const player = useAudioPlayer(require("../assets/alarm.mp3"));
  const pulse = useRef(new Animated.Value(1)).current;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [stopwatchTime, setStopwatchTime] = useState<string>();
  const [timeStorage, setTimeStorage] = useState<string[]>([]);
  const [rawTimeStorage, setRawTimeStorage] = useState<number[]>([]);
  useEffect(() => {
    function getTime() {
      const unformattedToday = new Date();
      const today = unformattedToday.toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTimeout(() => {
        getTime();
        setToday(unformattedToday);
      }, 1000);
    }
    getTime();
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
  useEffect(() => {
    const hours = today?.getHours();
    const minutes = today?.getMinutes();
    const seconds = today?.getSeconds();
    if (
      hours === alarmHours &&
      minutes === alarmMinutes &&
      seconds === alarmSeconds
    ) {
      setToggleAlarm(true);
    }
  }, [today]);
  useEffect(() => {
    if (toggleAlarm === true) {
      player.loop = true;
      player.play();
      setToggleStopwatch(true);
      setTimeout(() => {
        setToggleAlarm(false);
      }, 300000);
    } else {
      player.pause();
      player.seekTo(0);
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.15,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    }
  }, [toggleAlarm]);

  useEffect(() => {
    if (toggleStopwatch) {
      const tempStopwatchStorage: string[] = [];
      const hours = Math.floor(elapsedSeconds / 3600);
      const minutes = Math.floor((elapsedSeconds % 3600) / 60);
      const seconds = elapsedSeconds % 60;
      setTimeout(() => {
        setElapsedSeconds(elapsedSeconds + 1);
        tempStopwatchStorage.push(hours.toString().padStart(2, "0"));
        tempStopwatchStorage.push(minutes.toString().padStart(2, "0"));
        tempStopwatchStorage.push(seconds.toString().padStart(2, "0"));
        setStopwatchTime(tempStopwatchStorage.join(":"));
      }, 1000);
    }
  }, [toggleStopwatch, elapsedSeconds]);

  const formatTime = ({
    hours,
    minutes,
    seconds,
  }: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => {
    const timeParts = [];
    if (hours !== undefined) {
      timeParts.push((hours % 12).toString().padStart(2, "0"));
      setAlarmHours(hours);
    }
    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
      setAlarmMinutes(minutes);
    }
    if (seconds !== undefined) {
      timeParts.push(seconds.toString().padStart(2, "0"));
      setAlarmSeconds(seconds);
    }
    return timeParts.join(":");
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950 flex flex-col">
      <ScrollView>
        <Header
          toggleDropdown={toggleDropdown}
          setToggleDropdown={setToggleDropdown}
        />
        <View className="flex-col flex px-3 py-2 text-zinc-50 overflow-y-auto">
          <View className="bg-slate-800/70 rounded-lg border border-white/10 h-fit p-2 flex flex-col gap-1">
            <View className="flex flex-row gap-1 items-center">
              <Text className="text-zinc-50 font-bold text-lg">
                Commute Tracker |
              </Text>
              <Pressable onPress={() => setToggleTimePicker(!toggleTimePicker)}>
                <View className="flex flex-row items-center gap-1">
                  {alarmString && (
                    <Text className="text-zinc-50">
                      Start at: {alarmString}{" "}
                      {alarmHours <= 12 && <Text>AM</Text>}{" "}
                      {alarmHours > 12 && <Text>PM</Text>}
                    </Text>
                  )}
                  {!alarmString && (
                    <Text className="text-zinc-50">No alarm set yet!</Text>
                  )}
                  <ChevronDown color="white" size={16} />
                </View>
              </Pressable>
            </View>
            <View className="flex flex-row gap-1">
              <Text className="text-zinc-50">Status:</Text>
              <Text className="text-lime-300">
                Actively Monitoring(Background)
              </Text>
            </View>
            <View className="flex flex-col gap-3 w-full border items-center border-white/10 rounded-xl py-1 h-28">
              <Text className="font-bold text-lime-300 text-xl">
                LIVE TIMER
              </Text>
              {stopwatchTime && (
                <Text className="font-bold text-lime-200 text-3xl">
                  {stopwatchTime}
                </Text>
              )}
              {!stopwatchTime && alarmString && (
                <Text className="font-bold text-lime-200 text-3xl">
                  Will start at {alarmString}
                  <Text className="font-bold text-lime-200 text-3xl">
                    {alarmHours <= 12 && <Text> AM</Text>}
                    {alarmHours > 12 && <Text> PM</Text>}
                  </Text>
                </Text>
              )}
              {!stopwatchTime && !alarmString && (
                <Text className="font-bold text-lime-200 text-3xl">
                  Set an alarm first
                </Text>
              )}
            </View>
            <View className="flex flex-row gap-5 items-center">
              <Text className="text-zinc-50">Goal: Reaching School</Text>
              <View className="flex flex-row gap-1 items-center">
                <Text className="text-zinc-50">Map: </Text>
                <View className="rounded-lg w-32 h-16 border-2 border-zinc-50"></View>
              </View>
            </View>
            <View className="flex flex-row gap-5 items-center justify-between">
              <Pressable
                className="bg-lime-300 px-4 py-2 rounded-lg active:bg-lime-400"
                onPress={() => {
                  setToggleStopwatch(false);
                  setStopwatchTime("");
                  saveTime(stopwatchTime, elapsedSeconds);
                  alert("Elapsed Seconds: " + elapsedSeconds);
                }}
              >
                <Text className="font-semibold">Stop & Save</Text>
              </Pressable>
              <View className="flex flex-row gap-1">
                <Text className="text-zinc-50">Avg:</Text>
                <Text className="text-lime-300">0 Mins</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-col flex px-3 py-2 text-zinc-50">
          <View className="bg-slate-800/70 rounded-lg border border-white/10 h-fit p-2 flex flex-col gap-3">
            <Text className="text-zinc-50 font-bold text-lg">
              Add New Assignment
            </Text>
            <TextInput
              className="bg-white rounded-lg p-2"
              placeholder="Assignment Title(e.g., Math Homework)"
            />
            <View className="flex flex-col gap-2">
              <View className="flex flex-row w-full gap-2">
                <View className="flex-1 border border-white/10 rounded-lg flex flex-col justify-center p-2">
                  <Text className="text-gray-400">Due Date</Text>
                  <View className="flex flex-row items-center gap-2 rounded-lg">
                    <Calendar color={"gray"} size={"15"} />
                    <Text className="text-zinc-50">Jan 01</Text>
                  </View>
                </View>
                <View className="flex-1 border border-white/10 rounded-lg flex flex-col justify-center p-2">
                  <Text className="text-gray-400">Subject</Text>
                  <View className="flex flex-row items-center gap-2 rounded-lg">
                    <Text className="text-zinc-50">Physics</Text>
                    <ChevronDown color={"gray"} size={15} />
                  </View>
                </View>
              </View>
              <View className="flex flex-row w-full gap-2">
                <View className="flex-1 border border-white/10 rounded-lg flex flex-col justify-center p-2">
                  <Text className="text-gray-400">Reminder Time</Text>
                  <View className="flex flex-row items-center gap-2 rounded-lg">
                    <AlarmClock color={"gray"} size={"15"} />
                    <Text className="text-zinc-50">3:00 PM</Text>
                  </View>
                </View>
                <View className="flex-1 border border-white/10 rounded-lg flex flex-col justify-center p-2">
                  <Text className="text-gray-400">Priority</Text>
                  <View className="flex flex-row items-center gap-2 rounded-lg">
                    <Text className="text-zinc-50">Low</Text>
                    <ChevronDown color={"gray"} size={15} />
                  </View>
                </View>
              </View>
              <Pressable className="rounded-lg bg-cyan-300 flex items-center justify-center h-10">
                <Text className="font-semibold">
                  Create Assignment & Set Alarm
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="border border-white/10 rounded-lg mt-3 p-2 h-fit flex flex-col gap-3">
            <Text className="text-zinc-50 font-semibold">
              Recent Assignments
            </Text>
            <View className="flex bg-slate-800/70 flex-row justify-between p-2 rounded-lg border items-center border-white/10">
              <Text className="text-zinc-50">History Essay - Due June 22 </Text>
              <View className="p-2 bg-red-500 rounded-lg">
                <Text className="text-zinc-50">HIGH</Text>
              </View>
            </View>

            <View className="flex bg-slate-800/70 flex-row justify-between p-2 rounded-lg border items-center border-white/10">
              <Text className="text-zinc-50">
                Caluculus Homework - Due June 24
              </Text>
              <View className="p-2 bg-yellow-500 rounded-lg">
                <Text className="text-zinc-50">MEDIUM</Text>
              </View>
            </View>

            <View className="flex bg-slate-800/70 flex-row justify-between p-2 rounded-lg border items-center border-white/10">
              <Text className="text-zinc-50">
                Thesis Introduction - Due June 29
              </Text>
              <View className="p-2 bg-emerald-400 rounded-lg">
                <Text className="text-zinc-50">LOW</Text>
              </View>
            </View>
          </View>
        </View>
        {toggleDropdown && (
          <>
            <Left setToggleDropdown={setToggleDropdown} />
          </>
        )}
        {toggleTimePicker && (
          <TimerPickerModal
            closeOnOverlayPress
            modalProps={{
              overlayOpacity: 0.2,
            }}
            modalTitle="Set Alarm"
            onCancel={() => setToggleTimePicker(false)}
            onConfirm={(pickedDuration) => {
              setAlarmString(formatTime(pickedDuration));
              setToggleTimePicker(false);
            }}
            setIsVisible={setToggleTimePicker}
            styles={{
              theme: "dark",
            }}
            use12HourPicker
            visible={toggleTimePicker}
          />
        )}
        {toggleAlarm && (
          <View className="absolute inset-0 z-[60] bg-slate-950/95 flex items-center justify-center px-6">
            <View className="bg-slate-800 border border-white/10 rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6">
              <Animated.View style={{ transform: [{ scale: pulse }] }}>
                <View className="bg-red-500/20 rounded-full p-6">
                  <AlarmClock color="#f87171" size={56} />
                </View>
              </Animated.View>

              <View className="flex flex-col items-center gap-1">
                <Text className="text-red-400 font-bold text-2xl tracking-widest">
                  ALARM
                </Text>
                <Text className="text-zinc-400">Time to commute</Text>
              </View>

              {alarmString && (
                <Text className="text-zinc-50 font-bold text-4xl">
                  {alarmString} {alarmHours < 12 ? "AM" : "PM"}
                </Text>
              )}

              <Pressable
                onPress={() => setToggleAlarm(false)}
                className="bg-red-500 active:bg-red-600 rounded-xl w-full py-4 flex items-center justify-center"
              >
                <Text className="text-zinc-50 font-bold text-lg">
                  Cancel Alarm
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );

  async function saveTime(time: string | undefined, rawTime: number) {
    const updatedRawTimeRecords = [...rawTimeStorage, rawTime ?? ""];
    setRawTimeStorage(updatedRawTimeRecords);
    await AsyncStorage.setItem(
      "timerecords",
      JSON.stringify(updatedRawTimeRecords),
    );
  }
}

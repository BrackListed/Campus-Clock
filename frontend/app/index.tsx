import {
  AlarmClock,
  Bell,
  Calendar,
  ChevronDown,
  TextAlignJustify,
} from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import "../global.css";

export default function Index() {
  const [time, setTime] = useState(0);
  const today = new Date();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  return (
    <ScrollView className="flex-1 bg-slate-950 flex flex-col">
      <View className="bg-slate-800/70 h-28 rounded-t-lg flex flex-row items-center justify-between">
        <View className="flex-row gap-2 px-4 py-3 h-full w-1/2 items-center">
          <TextAlignJustify
            color="white"
            size={20}
            onPress={() => setToggleDropdown(!toggleDropdown)}
          />
          <Pressable onPress={() => setToggleDropdown(!toggleDropdown)}>
            <Image
              source={require("../assets/images/Campus-Clock-logo.png")}
              className="w-12 h-full"
              resizeMode="contain"
            />
          </Pressable>
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
      <View className="flex-col flex px-3 py-2 text-zinc-50 overflow-y-auto">
        <View className="bg-slate-800/70 rounded-lg border border-white/10 h-fit p-2 flex flex-col gap-1">
          <View className="flex flex-row gap-1 items-center">
            <Text className="text-zinc-50 font-bold text-lg">
              School Commute Tracker |
            </Text>
            <View className="flex flex-row items-center gap-1">
              <Text className="text-zinc-50">Start at: 5:00 AM</Text>
              <ChevronDown color="white" size={16} />
            </View>
          </View>
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
          <View className="flex flex-row gap-5 items-center">
            <Text className="text-zinc-50">Goal: Reaching School</Text>
            <View className="flex flex-row gap-1 items-center">
              <Text className="text-zinc-50">Map: </Text>
              <View className="rounded-lg w-32 h-16 border-2 border-zinc-50"></View>
            </View>
          </View>
          <View className="flex flex-row gap-5 items-center justify-between">
            <Pressable className="bg-lime-300 px-4 py-2 rounded-lg active:bg-lime-400 ">
              <Text className="font-semibold">Stop & Save</Text>
            </Pressable>
            <View className="flex flex-row gap-1">
              <Text className="text-zinc-50">Weekly Avg:</Text>
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
          <Text className="text-zinc-50 font-semibold">Recent Assignments</Text>
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
          <Pressable
            className="absolute inset-0 bg-black/60 z-40"
            onPress={() => setToggleDropdown(false)}
          ></Pressable>
          <ScrollView className="absolute top-0 left-0 bottom-0 w-64 bg-slate-800 border-r border-white/10 p-4 z-50">
            <Pressable onPress={() => setToggleDropdown(false)}>
              <View className="flex-row flex gap-2 h-20 items-center">
                <TextAlignJustify color={"white"} size={16} />
                <Image
                  source={require("../assets/images/Campus-Clock-logo.png")}
                  className="w-12 h-full"
                  resizeMode="contain"
                ></Image>
                <Text className="text-zinc-50 text-semibold text-xl">
                  Campus Clock
                </Text>
              </View>
            </Pressable>
            <View className="flex gap-3 mt-5">
              <Text className="text-zinc-50">Profile</Text>
              <Text className="text-zinc-50">Settings</Text>
              <Text className="text-zinc-50">Logout</Text>
            </View>
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
}

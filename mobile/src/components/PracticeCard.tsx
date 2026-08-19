import {
  Alert,
  Pressable,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

import { Practice } from "../types/practice";
import { usePracticeStore } from "../store/practiceStore";


interface PracticeCardProps {
  practice: Practice;
}


export default function PracticeCard({
  practice,
}: PracticeCardProps) {

  const markComplete =
    usePracticeStore(
      (state) => state.markComplete
    );

  const removePractice =
    usePracticeStore(
      (state) => state.removePractice
    );


  const isCompleted =
    practice.status === "Completed";


  const handleEdit = () => {

    router.push({
      pathname: "/practice-form",
      params: {
        id: practice.id,
      },
    });

  };


  const handleComplete = async () => {

    if (isCompleted) {
      return;
    }

    try {

      await markComplete(
        practice.id
      );

    } catch {

      Alert.alert(
        "Error",
        "Failed to mark practice as completed."
      );

    }

  };


  const handleDelete = () => {

    Alert.alert(
      "Delete Practice",
      `Are you sure you want to delete "${practice.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Delete",
          style: "destructive",

          onPress: async () => {

            try {

              await removePractice(
                practice.id
              );

            } catch {

              Alert.alert(
                "Error",
                "Failed to delete practice."
              );

            }

          },
        },
      ]
    );

  };


  return (
    <View className="mb-4 rounded-2xl border border-zinc-200 bg-white p-5">

      <View className="mb-3 flex-row items-start justify-between gap-3">

        <Text className="flex-1 text-lg font-bold text-zinc-900">
          {practice.title}
        </Text>


        <View
          className={
            isCompleted
              ? "rounded-full bg-green-100 px-3 py-1"
              : "rounded-full bg-amber-100 px-3 py-1"
          }
        >

          <Text
            className={
              isCompleted
                ? "text-xs font-semibold text-green-700"
                : "text-xs font-semibold text-amber-700"
            }
          >
            {practice.status}
          </Text>

        </View>

      </View>


      <Text className="mb-4 text-sm leading-5 text-zinc-500">
        {practice.description}
      </Text>


      <View className="mb-5 flex-row flex-wrap gap-2">

        <View className="rounded-lg bg-zinc-100 px-3 py-2">

          <Text className="text-xs font-medium text-zinc-700">
            {practice.duration} min
          </Text>

        </View>


        <View className="rounded-lg bg-zinc-100 px-3 py-2">

          <Text className="text-xs font-medium text-zinc-700">
            {practice.difficulty}
          </Text>

        </View>

      </View>


      <View className="flex-row flex-wrap gap-2">

        <Pressable
          onPress={handleEdit}
          className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 active:bg-zinc-100"
        >

          <Text className="text-sm font-semibold text-zinc-800">
            Edit
          </Text>

        </Pressable>


        {!isCompleted && (

          <Pressable
            onPress={handleComplete}
            className="rounded-lg bg-green-600 px-4 py-2.5 active:opacity-80"
          >

            <Text className="text-sm font-semibold text-white">
              Complete
            </Text>

          </Pressable>

        )}


        <Pressable
          onPress={handleDelete}
          className="rounded-lg bg-red-50 px-4 py-2.5 active:bg-red-100"
        >

          <Text className="text-sm font-semibold text-red-600">
            Delete
          </Text>

        </Pressable>

      </View>

    </View>
  );
}
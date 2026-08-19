import {
  router,
  useLocalSearchParams,
} from "expo-router";

import { useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { usePracticeStore } from "../store/practiceStore";

import {
  Difficulty,
  PracticeStatus,
} from "../types/practice";


const DIFFICULTIES: Difficulty[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const STATUSES: PracticeStatus[] = [
  "Pending",
  "Completed",
];


export default function PracticeFormScreen() {

  const { id } =
    useLocalSearchParams<{
      id?: string;
    }>();


  const practices =
    usePracticeStore(
      (state) => state.practices
    );

  const addPractice =
    usePracticeStore(
      (state) => state.addPractice
    );

  const editPractice =
    usePracticeStore(
      (state) => state.editPractice
    );


  const existingPractice =
    practices.find(
      (practice) =>
        practice.id === id
    );


  const [title, setTitle] =
    useState(
      existingPractice?.title ?? ""
    );

  const [
    description,
    setDescription,
  ] = useState(
    existingPractice?.description ?? ""
  );

  const [duration, setDuration] =
    useState(
      existingPractice
        ? String(existingPractice.duration)
        : ""
    );

  const [
    difficulty,
    setDifficulty,
  ] = useState<Difficulty>(
    existingPractice?.difficulty ??
      "Beginner"
  );

  const [status, setStatus] =
    useState<PracticeStatus>(
      existingPractice?.status ??
        "Pending"
    );

  const [error, setError] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);


  const isEditMode = Boolean(id);


  const handleSave = async () => {

    if (!title.trim()) {
      setError(
        "Practice title is required"
      );
      return;
    }

    if (title.trim().length < 2) {
      setError(
        "Practice title must be at least 2 characters"
      );
      return;
    }

    if (!description.trim()) {
      setError(
        "Description is required"
      );
      return;
    }

    if (
      description.trim().length < 2
    ) {
      setError(
        "Description must be at least 2 characters"
      );
      return;
    }

    if (!duration.trim()) {
      setError(
        "Duration is required"
      );
      return;
    }


    const parsedDuration =
      Number(duration);


    if (
      Number.isNaN(parsedDuration) ||
      parsedDuration <= 0
    ) {
      setError(
        "Duration must be greater than 0"
      );
      return;
    }


    try {

      setError("");
      setIsLoading(true);


      const data = {
        title: title.trim(),
        description:
          description.trim(),
        duration: parsedDuration,
        difficulty,
        status,
      };


      if (id) {

        await editPractice(
          id,
          data
        );

      } else {

        await addPractice(data);

      }


      router.back();

    } catch (error) {

      console.error(error);

      setError(
        isEditMode
          ? "Failed to update practice. Please try again."
          : "Failed to create practice. Please try again."
      );

    } finally {

      setIsLoading(false);

    }

  };


  const handleCancel = () => {
    router.back();
  };


  return (
    <KeyboardAvoidingView
      className="flex-1 bg-zinc-50"
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 py-6"
        keyboardShouldPersistTaps="handled"
      >

        <View className="mb-6">

          <Text className="text-2xl font-bold text-zinc-900">
            {isEditMode
              ? "Edit Practice"
              : "Add Practice"}
          </Text>

          <Text className="mt-2 text-sm leading-5 text-zinc-500">
            {isEditMode
              ? "Update your communication practice session."
              : "Create a communication practice session and track your progress."}
          </Text>

        </View>


        <View className="rounded-2xl border border-zinc-200 bg-white p-5">

          <View className="mb-5">

            <Text className="mb-2 text-sm font-semibold text-zinc-800">
              Practice Title
            </Text>

            <TextInput
              className="rounded-xl border border-zinc-300 bg-white px-4 py-3.5 text-base text-zinc-900"
              placeholder="e.g. Interview Introduction"
              placeholderTextColor="#a1a1aa"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />

          </View>


          <View className="mb-5">

            <Text className="mb-2 text-sm font-semibold text-zinc-800">
              Description
            </Text>

            <TextInput
              className="min-h-28 rounded-xl border border-zinc-300 bg-white px-4 py-3.5 text-base text-zinc-900"
              placeholder="What do you want to practice?"
              placeholderTextColor="#a1a1aa"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              maxLength={500}
            />

            <Text className="mt-1 text-right text-xs text-zinc-400">
              {description.length}/500
            </Text>

          </View>


          <View className="mb-5">

            <Text className="mb-2 text-sm font-semibold text-zinc-800">
              Duration
            </Text>

            <View className="flex-row items-center rounded-xl border border-zinc-300 bg-white">

              <TextInput
                className="flex-1 px-4 py-3.5 text-base text-zinc-900"
                placeholder="10"
                placeholderTextColor="#a1a1aa"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
              />

              <Text className="mr-4 text-sm text-zinc-500">
                minutes
              </Text>

            </View>

          </View>


          <View className="mb-5">

            <Text className="mb-3 text-sm font-semibold text-zinc-800">
              Difficulty
            </Text>

            <View className="flex-row flex-wrap gap-2">

              {DIFFICULTIES.map(
                (item) => {

                  const isSelected =
                    difficulty === item;

                  return (
                    <Pressable
                      key={item}
                      onPress={() =>
                        setDifficulty(
                          item
                        )
                      }
                      className={
                        isSelected
                          ? "rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-3"
                          : "rounded-xl border border-zinc-300 bg-white px-4 py-3 active:bg-zinc-100"
                      }
                    >

                      <Text
                        className={
                          isSelected
                            ? "text-sm font-semibold text-white"
                            : "text-sm font-medium text-zinc-700"
                        }
                      >
                        {item}
                      </Text>

                    </Pressable>
                  );

                }
              )}

            </View>

          </View>


          <View className="mb-2">

            <Text className="mb-3 text-sm font-semibold text-zinc-800">
              Status
            </Text>

            <View className="flex-row gap-2">

              {STATUSES.map(
                (item) => {

                  const isSelected =
                    status === item;

                  return (
                    <Pressable
                      key={item}
                      onPress={() =>
                        setStatus(item)
                      }
                      className={
                        isSelected
                          ? "flex-1 items-center rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-3"
                          : "flex-1 items-center rounded-xl border border-zinc-300 bg-white px-4 py-3 active:bg-zinc-100"
                      }
                    >

                      <Text
                        className={
                          isSelected
                            ? "text-sm font-semibold text-white"
                            : "text-sm font-medium text-zinc-700"
                        }
                      >
                        {item}
                      </Text>

                    </Pressable>
                  );

                }
              )}

            </View>

          </View>

        </View>


        {error ? (
          <View className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

            <Text className="text-sm font-medium text-red-700">
              {error}
            </Text>

          </View>
        ) : null}


        <View className="mt-6 flex-row gap-3">

          <Pressable
            onPress={handleCancel}
            disabled={isLoading}
            className="flex-1 items-center rounded-xl border border-zinc-300 bg-white py-4 active:bg-zinc-100"
          >

            <Text className="text-base font-semibold text-zinc-800">
              Cancel
            </Text>

          </Pressable>


          <Pressable
            onPress={handleSave}
            disabled={isLoading}
            className={
              isLoading
                ? "flex-1 items-center rounded-xl bg-zinc-400 py-4"
                : "flex-1 items-center rounded-xl bg-zinc-900 py-4 active:opacity-80"
            }
          >

            <Text className="text-base font-semibold text-white">

              {isLoading
                ? isEditMode
                  ? "Updating..."
                  : "Saving..."
                : isEditMode
                  ? "Update"
                  : "Save"}

            </Text>

          </Pressable>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}
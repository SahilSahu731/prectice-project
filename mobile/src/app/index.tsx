import { useEffect } from "react";
import { router } from "expo-router";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PracticeCard from "../components/PracticeCard";
import { usePracticeStore } from "../store/practiceStore";

export default function HomeScreen() {
  const practices = usePracticeStore(
    (state) => state.practices
  );

  const loading = usePracticeStore(
    (state) => state.loading
  );

  const error = usePracticeStore(
    (state) => state.error
  );

  const fetchPractices = usePracticeStore(
    (state) => state.fetchPractices
  );

  useEffect(() => {
    fetchPractices();
  }, [fetchPractices]);

  const handleAddPractice = () => {
    router.push("/practice-form");
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="flex-1 px-5 pt-6">

        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between gap-4">

          <View className="flex-1">
            <Text className="text-3xl font-bold text-zinc-900">
              Practices
            </Text>

            <Text className="mt-1 text-sm text-zinc-500">
              Keep improving your communication.
            </Text>
          </View>

          <Pressable
            onPress={handleAddPractice}
            className="rounded-xl bg-zinc-900 px-4 py-3 active:opacity-80"
          >
            <Text className="font-semibold text-white">
              + Add
            </Text>
          </Pressable>

        </View>

        {/* Error */}
        {error ? (
          <View className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">

            <Text className="text-sm font-medium text-red-700">
              {error}
            </Text>

            <Pressable
              onPress={fetchPractices}
              className="mt-3 self-start"
            >
              <Text className="font-semibold text-red-700">
                Try Again
              </Text>
            </Pressable>

          </View>
        ) : null}

        {/* Initial loading */}
        {loading && practices.length === 0 ? (

          <View className="flex-1 items-center justify-center">

            <ActivityIndicator size="large" />

            <Text className="mt-4 text-zinc-500">
              Loading practices...
            </Text>

          </View>

        ) : (

          <FlatList
            data={practices}

            keyExtractor={(item) => item.id}

            renderItem={({ item }) => (
              <PracticeCard practice={item} />
            )}

            showsVerticalScrollIndicator={false}

            refreshControl={
              <RefreshControl
                refreshing={
                  loading &&
                  practices.length > 0
                }
                onRefresh={fetchPractices}
              />
            }

            contentContainerStyle={{
              paddingBottom: 30,
              flexGrow:
                practices.length === 0
                  ? 1
                  : undefined,
            }}

            ListEmptyComponent={
              <View className="flex-1 items-center justify-center px-8">

                <Text className="text-xl font-semibold text-zinc-900">
                  No practices yet
                </Text>

                <Text className="mt-2 text-center text-sm leading-5 text-zinc-500">
                  Add your first practice session to get started.
                </Text>

                <Pressable
                  onPress={handleAddPractice}
                  className="mt-6 rounded-xl bg-zinc-900 px-6 py-4 active:opacity-80"
                >
                  <Text className="font-semibold text-white">
                    Add Practice
                  </Text>
                </Pressable>

              </View>
            }
          />

        )}

      </View>
    </SafeAreaView>
  );
}
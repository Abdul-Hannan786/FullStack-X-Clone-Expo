import { ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { useUserSync } from "@/hooks/useUserSync";
import { Ionicons } from "@expo/vector-icons";
import PostComposer from "@/components/PostComposer";
import PostList from "@/components/PostList";

const HomeScreen = () => {
  useUserSync();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-3 py-3">
        <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
        <Text className="font-bold text-xl text-gray-900">Home</Text>
        <SignOutButton />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <PostComposer />
        <PostList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

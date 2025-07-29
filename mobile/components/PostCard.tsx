import { View, Text, Alert, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Post, User } from "@/types";
import { formatDate } from "@/utils/formatter";
import { Feather } from "@expo/vector-icons";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
  isLiked?: boolean;
  currentUser: User;
}

const PostCard = ({
  currentUser,
  onDelete,
  onLike,
  isLiked,
  post,
}: PostCardProps) => {
  const isOwnPost = post.user._id === currentUser._id;
  const handleDelete = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(post._id),
      },
    ]);
  };

  return (
    <View className="border-b border-gray-100 bg-white">
      <View className="flex-row p-4">
        <Image
          source={{ uri: post.user.profilePicture || "" }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <View className="flex-row items-center">
              <Text className="font-bold text-gray-900 mr-1">
                {post.user.firstName} {post.user.lastName}
              </Text>
              <Text className="text-gray-500 ml-1 text-sm">
                @{post.user.username} · {formatDate(post.createdAt)}
              </Text>
            </View>
            {isOwnPost && (
              <TouchableOpacity onPress={handleDelete}>
                <Feather name="trash" size={20} color="#657786" />
              </TouchableOpacity>
            )}
          </View>

          {post.content && (
            <Text className="text-gray-900 text-base leading-5 mb-3">
              {post.content}
            </Text>
          )}

          {/* {post.image && (
            <Image
              source={{ uri: post.image }}
              className="w-full h-48 rounded-2xl mb-3"
              resizeMode="cover"
            />
          )} */}
        </View>
      </View>
    </View>
  );
};

export default PostCard;

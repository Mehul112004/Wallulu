import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { FadeInRight } from "react-native-reanimated";

import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
  const color = isActive ? theme.colors.white : theme.colors.black;
  const backgroundColor = isActive
    ? theme.colors.neutral(0.8)
    : theme.colors.white;
  return (
    <Animated.View entering={FadeInRight.delay(index * 200).duration(400).springify().damping(14)}>
      <Pressable
        onPress={() => handleChangeCategory(isActive ? null : title)}
        style={[styles.category, { backgroundColor }]}
      >
        <Text style={[styles.categoryText, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  category: {
    padding: 12,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: theme.colors.white,
    border: 1,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.grayBG,
  },
  categoryText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium,
  },
});

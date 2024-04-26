import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInLeft, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { wp, hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();
  const height = hp(100);
  const width = wp(100);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/welcome1.png")}
        style={[styles.image, { height: height, width: width }]}
        resizeMode="cover"
      />
      <Animated.View
        entering={FadeInDown.duration(1000)}
        exiting={FadeInUp.duration(600)}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <View style={styles.contentContainer}>
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            exiting={FadeInLeft.springify()}
            style={styles.title}
          >
            Wallulu
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).springify()}
            exiting={FadeInLeft.springify()}
            style={styles.punchLine}
          >
            Let's get lost in Delulu!
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(600).springify()}
            exiting={FadeInLeft.springify()}
          >
            <Pressable
              style={styles.startButton}
              onPress={() => router.push("home")}
            >
              <Text style={styles.startButtonText}>Start Exploring</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: "absolute",
  },
  gradient: {
    width: wp(100),
    height: hp(65),
    bottom: 0,
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
  },
  title: {
    fontSize: hp(7),
    color: theme.colors.neutral(0.8),
    fontWeight: theme.fontWeights.bold,
  },
  punchLine: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: theme.fontWeights.medium,
  },
  startButton: {
    marginBottom: 50,
    backgroundColor: theme.colors.neutral(0.9),
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startButtonText: {
    color: theme.colors.white,
    fontSize: hp(3),
    fontWeight: theme.fontWeights.medium,
    letterSpacing: 1,
  },
});
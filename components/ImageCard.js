import { StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import React, { useState } from "react";
import Animated, { FadeIn } from "react-native-reanimated";

import { getImageSize, wp } from "../helpers/common";
import { theme } from "../constants/theme";

const ImageCard = ({ item, index, columns,router }) => {
  const [loaded, setLoaded] = useState(false);

  const getImageHeight = () => {
    const { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };

  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };

  return (
    <Animated.View entering={FadeIn.delay(index * 150).duration(100)}>
      <Pressable onPress={()=>router.push({pathname:'home/image',params:{...item}})}
        style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}
      >
        <Image
          style={[styles.image, getImageHeight()]}
          source={item?.webformatURL}
          transition={100}
          onLoadEnd={() => setLoaded(true)}
        />
      </Pressable>
    </Animated.View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
  image: {
    width: "100%",
    height: 300,
  },
});

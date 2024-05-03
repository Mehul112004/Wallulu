import { StyleSheet, Text, View, Button, Platform } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { wp } from "../../helpers/common";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { theme } from "../../constants/theme";
import { UIActivityIndicator } from "react-native-indicators";

const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [status, setStatus] = useState("loading");
  let uri = item?.webformatURL;

  const getSize = () => {
    const apr = item?.imageWidth / item?.imageHeight;
    const maxWidth = Platform.OS == "web" ? wp(50) : wp(92);
    let calculatedHeight = maxWidth / apr;
    let calculatedWidth = maxWidth;

    if (apr < 1) {
      calculatedWidth = calculatedHeight * apr;
    }
    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const onLoad = () => {
    setStatus("");
  };
  return (
    <BlurView
      tint="dark"
      intensity={60}
      style={styles.container}
      experimentalBlurMethod="dimezisBlurView"
    >
      <View style={[getSize(),{marginBottom:50}]}>
        <View style={styles.loading}>
          {status == "loading" && <UIActivityIndicator size={40} color="white" />}
        </View>
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={uri}
          onLoad={onLoad}
        />
      </View>
      <Button title="Back" onPress={() => router.back()} />
    </BlurView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  loading:{
    position:'absolute',
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
  }
});

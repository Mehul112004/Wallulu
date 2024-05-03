import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { wp, getColumnCount } from "../helpers/common";
const image = [];

const ImageGrid = ({ images,router }) => {
  const columns = getColumnCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        initialNumToRender={10}
        renderItem={({ item, index }) => (
          <ImageCard router = {router} index={index} item={item} columns={columns} />
        )}
        contentContainerStyle={styles.contentContainer}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 100,
    width: wp(100),
  },
  contentContainer: {
    paddingHorizontal: wp(4),
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { wp, getColumnCount, hp } from "../helpers/common";
const image = [];

const ImageGrid = ({ images }) => {
  const columns = getColumnCount();
  return (
    <View style={styles.container}>
      {/* <Text>ImageGrid</Text> */}
      <MasonryFlashList
        data={images}
        numColumns={columns}
        initialNumToRender={10}
        renderItem={({ item, index }) => (
          <ImageCard index={index} item={item} columns={columns} />
        )}
        contentContainerStyle={styles.contentContainer}
        estimatedItemSize={200}
        one
        // ListEmptyComponent={
        //   <View
        //     style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        //   >
        //     <Text style={{ fontSize: hp(4),fontWeight:'bold',fontVariant:'small-caps' }}>
        //       {`Sorry Couldn't load
        //    the data!`}
        //     </Text>
        //   </View>
        // }
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

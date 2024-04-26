import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { CategoriesData } from "../constants/data";
import CategoryItem from "./CategoryItem";
import Animated, { FadeInRight } from "react-native-reanimated";
import { hp, wp } from "../helpers/common";

const Categories = ({ activeCategory, handleChangeCategory }) => {
  return (
    // <Animated.View entering={FadeInRight.duration(1000).springify()} style={{flex:1,/*width:wp(97),paddingHorizontal:hp(2)*/}}>
    <FlatList
      // entering={FadeInRight.delay(100).duration(1000).springify()}
      horizontal
      contentContainerStyle={styles.flatListContainer}
      showsHorizontalScrollIndicator={false}
      data={CategoriesData}
      keyExtractor={item=> item}
      renderItem={({ item,index }) => (
        <CategoryItem
          isActive={activeCategory === item}
          handleChangeCategory={handleChangeCategory}
          title={item}
          index={index}
        />
      )}
      ItemSeparatorComponent={<View style={{ margin: 10 }}></View>}
    />
    // </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { capitalize, hp } from "../helpers/common";
import { theme } from "../constants/theme";

export const SectionView = ({ title, content }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

export const CommonFilterRow = ({ data, filterName, filters, setFilters }) => {
  return (
      <View style={styles.felxRowWrap}>
    {data&& data.map((item,index)=>{
        return (
            <Pressable key={item} onPress={()=>{console.log(item)}} style={styles.filterContainer}>
                <Text style={styles.filterText}>{capitalize(item)}</Text>
            </Pressable>
        )
    })}
      </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.neutral(0.8),
  },
  filterContainer:{
    border:1,
    borderColor:theme.colors.black,
    borderRadius:5,
    padding:5,
    margin:5
  }
});
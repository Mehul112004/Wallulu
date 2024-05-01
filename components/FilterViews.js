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
  const onSelect = (item) => {
    setFilters({ ...filters, [filterName]:item });
  };

  return (
    <View style={styles.felxRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filters && filters[filterName] == item;
          let backgroundColor = isActive ? theme.colors.neutral(0.7) : "white";
          let color = isActive ? "white" : theme.colors.neutral(0.7);
          return (
            <Pressable
              key={item}
              onPress={() => {
                onSelect(item)
              }}
              style={[
                styles.outlinedButton,
                { color: color, backgroundColor: backgroundColor },
              ]}
            >
              <Text style={[styles.outlinedButtonText, { color: color }]}>
                {capitalize(item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};


export const ColorFilter = ({ data, filterName, filters, setFilters }) => {
  const onSelect = (item) => {
    setFilters({ ...filters, [filterName]:item });
  };

  return (
    <View style={styles.felxRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filters && filters[filterName] == item;
         let borderColor= isActive?theme.colors.black:'white';
          return (
            <Pressable
              key={item}
              onPress={() => {
                onSelect(item)
              }}
              
            >
              <View style={[styles.colorWrapper,{borderColor:borderColor}]}>
                <View style={[styles.color,{backgroundColor:item}]}></View>
              </View>
            </Pressable>
          );
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
  filterContainer: {
    border: 1,
    borderColor: theme.colors.black,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  felxRowWrap: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  outlinedButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  outlinedButtonText: {},
  colorWrapper:{
    padding:3,
    borderRadius:theme.radius.sm,
    borderWidth:2,
    borderCurve:'continuous',
  },
  color:{
    height:30,
    width:40,
    borderRadius:theme.radius.sm-3,
    borderCurve:'continous'
  }
});

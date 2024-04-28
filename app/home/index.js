import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome6, Feather, Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";

import { wp, hp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Categories from "../../components/Categories";
import { apiCall } from "../../api";
import ImageGrid from "../../components/ImageGrid";
import FiltersModal from "../../components/FiltersModal";

const Home = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(null);
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);

  const openFiltersModal = () => {
    modalRef?.current?.present();
  };
  const closeFiltersModal = () => {
    modalRef?.current?.dismiss();
  };

  const applyFilters = () => {
    console.log("Applying filters");
    closeFiltersModal();
  };
  const resetFilters = () => {
    console.log("Resetting filters");
    closeFiltersModal();
  };

  const handleChangeCategory = (cat) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let params = { page };
    if (cat) params = { page: 1, category: cat };
    fetchImages(params, false);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length >= 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, q: text }, false);
    }
    if (!text.length) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      setSearch("");
      searchInputRef.current.clear();
      fetchImages({ page }, false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    searchInputRef.current.clear();
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1 }, append = true) => {
    console.log("====================================");
    console.log(params, append);
    console.log("====================================");
    let res = await apiCall(params);
    if (res.success && res?.data?.hits) {
      if (append) setImages([...images, ...res.data.hits]);
      else setImages([...res.data.hits]);
    }
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Wallulu</Text>
        </Pressable>
        <Pressable onPress={() => openFiltersModal()}>
          <FontAwesome6
            name="bars-staggered"
            size={24}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ gap: 15, alignItems: "center" }}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
            <TextInput
              placeholder="Search for photos..."
              style={styles.searchInput}
              onChangeText={handleTextDebounce}
              // value={search}
              ref={searchInputRef}
            />
          </View>
          {search && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => handleSearch("")}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.CategoriesContainer}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        {/* {masonry layout} */}
        <View>{images.length > 0 && <ImageGrid images={images} />}</View>
      </ScrollView>
      <FiltersModal
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onClose={closeFiltersModal}
        onApply={applyFilters}
        onReset={resetFilters}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.grayBG,
    borderWidth: 1,
    width: wp(97),
    ...Platform.select({
      ios: {
        padding: wp(2),
      },
      android: {
        padding: wp(2),
      },
    }),
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: wp(4),
  },
  searchIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    // paddingVertical: 5,
    flex: 1,
    borderRadius: theme.radius.sm,
    fontSize: hp(2.2),
    fontFamily: "sans-serif",
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.05),
    borderRadius: theme.radius.sm,
    // padding: wp(1),
  },
  CategoriesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

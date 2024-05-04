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
import { UIActivityIndicator } from "react-native-indicators";
import { IOScrollView, InView } from "react-native-intersection-observer";

import Categories from "../../components/Categories";
import ImageGrid from "../../components/ImageGrid";
import FiltersModal from "../../components/FiltersModal";
import { wp, hp, capitalize } from "../../helpers/common";
import { theme } from "../../constants/theme";
import { apiCall } from "../../api";
import { useRouter } from "expo-router";
let page = 1;

const Home = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);
  console.log('====================================');
  console.log("inside home index: ",images);
  console.log('====================================');

const router = useRouter();

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length >= 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, q: text, ...filters }, false);
    }
    if (!text.length) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      setSearch("");
      searchInputRef.current.clear();
      fetchImages({ page, ...filters }, false);
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

  const handleChangeCategory = (cat) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let params = { page };
    if (cat) params = { page: 1, category: cat };
    if (filters) params = { ...params, ...filters };
    fetchImages(params, false);
  };

  const openFiltersModal = () => {
    modalRef?.current?.present();
  };
  const closeFiltersModal = () => {
    modalRef?.current?.dismiss();
  };

  const applyFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);
      let params = {
        page,
        ...filters,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
    }
    closeFiltersModal();
  };
  const resetFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);
      setFilters({});
      let params = {
        page,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
    }
    closeFiltersModal();
  };
  const clearThisFilter = (key) => {
    let filterz = { ...filters };
    delete filterz[key];
    filterz ? setFilters({ ...filterz }) : setFilters({});
    page = 1;
    setImages([]);
    let params = {
      page,
      ...filterz,
    };
    if (activeCategory) params.category = activeCategory;
    if (search) params.q = search;
    fetchImages(params, false);
  };

  const handleScrollEnd = () => {

      page += 1;
      let params = {
        page,
        ...filters,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, true);
    
  };

  const handleScrollUp = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
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
      <IOScrollView
        ref={scrollRef}
        contentContainerStyle={{ gap: 15, alignItems: "center" }}
      >
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
        {/*Categories */}
        <View style={styles.CategoriesContainer}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        {/*Filters */}
        {Object.keys(filters).length > 0 && (
          <View style={{ flex: 1 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              {Object.keys(filters).map((key, index) => {
                return (
                  <View key={key} style={styles.filterItem}>
                    {key == "colors" ? (
                      <View
                        style={{
                          height: 20,
                          width: 30,
                          borderRadius: 7,
                          backgroundColor: filters[key],
                        }}
                      />
                    ) : (
                      <Text style={styles.filterItemText}>
                        {capitalize(filters[key])}
                      </Text>
                    )}
                    <Pressable
                      style={styles.filterCloseIcon}
                      onPress={() => clearThisFilter(key)}
                    >
                      <Ionicons
                        name="close"
                        size={15}
                        color={theme.colors.neutral(0.6)}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* {masonry layout} */}
        <View style={{ flex: 1 }}>
          {images.length > 0 && <ImageGrid router = {router} images={images} />}
        </View>

        <InView
          style={{
            flex: 1,
            marginTop: images.length == 0 ? 70 : 10,
            marginBottom: 20,
          }}
          onChange={(inView) => {
            if (inView) {
              handleScrollEnd();
              // setEndReached(false)
            }
          }}
        >
          <UIActivityIndicator size={40} color={theme.colors.neutral(0.6)} />
        </InView>
        {images.length == 0 && <Text>No images found</Text>}
      </IOScrollView>
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
  filters: {
    padding: wp(2),
    gap: 10,
    paddingHorizontal: 10,
  },
  filterItem: {
    backgroundColor: theme.colors.grayBG,
    padding: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: theme.radius.xs,
    padding: 8,
    gap: 10,
    paddingHorizontal: 10,
  },
  filterItemText: {
    fontSize: hp(1.9),
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius: 7,
  },
});

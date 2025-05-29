import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import { Listing } from "@/interfaces/listing";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

interface Props {
  listings: any[];
  category: string;
  refresh: number;
}

const Listings = ({ listings: items, category, refresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  });

  useEffect(() => {
    console.log("REFRESH LISTING");
  }, [refresh]);

  useEffect(() => {
    console.log("RELOAD LISTINGS: ", items.length);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Listing> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image
              source={{
                uri:
                  item.medium_url ||
                  "https://media.istockphoto.com/id/1398814566/photo/interior-of-small-apartment-living-room-for-home-office.jpg?s=1024x1024&w=is&k=20&c=EmpbOMOx61HMHbi1wAfacfobu_P3jwsCX3FGnMoNgCY=",
              }}
              style={styles.image}
              resizeMode="cover"
            />

            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 30 }}
            >
              <Ionicons name="heart-outline" size={24} color={"#000"} />
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "monsb",
                  maxWidth: "80%",
                }}
              >
                {item.name}
              </Text>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Ionicons name="star" size={16} />
                <Text style={{ fontFamily: "monsb" }}>
                  {item.review_scores_rating / 20}
                </Text>
              </View>
            </View>

            <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>

            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontFamily: "monsb" }}> $ {item.price}</Text>
              <Text style={{ fontFamily: "mon" }}>/night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <BottomSheetFlatList
      renderItem={renderRow}
      ref={listRef}
      data={loading ? [] : items}
      ListHeaderComponent={
        <Text style={styles.info}>{items.length} homes</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 8,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: "center",
    fontFamily: "monsb",
    fontSize: 16,
    marginTop: 4,
  },
});

export default Listings;

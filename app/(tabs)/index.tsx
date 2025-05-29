import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingData from "@/assets/data/airbnb-listings.json";
import ListingMap from "@/components/ListingMap";
import listingDataGeo from "@/assets/data/airbnb-listings.geo.json";
import ListingBottomSheet from "@/components/ListingBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ListingItemCard from "@/components/ListingItemCard";

const Page = () => {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingData as any, []);
  const geoItems = useMemo(() => listingDataGeo as any, []);

  const onDataChanged = (category: string) => {
    console.log("CHANGED_", category);
    setCategory(category);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1, marginTop: 70 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />

      <ListingMap listings={geoItems} />
      <ListingBottomSheet listings={items} category={category} />
    </GestureHandlerRootView>
  );
};

export default Page;

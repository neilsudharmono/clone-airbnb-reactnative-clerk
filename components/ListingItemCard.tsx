import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ListingItem } from "@/interfaces/item";
import { Ionicons } from "@expo/vector-icons";
import { ListingGeo } from "@/interfaces/listingGeo";
import { useRouter } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";

interface Props {
  selectedItem: ListingGeo;
  onClose?: () => void;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const ListingItemCard = ({ selectedItem, onClose }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/listing/${selectedItem.properties.id}`);
  };

  return (
    //
    <AnimatedTouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={styles.card}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons color={"#fff"} name="close" size={20} />
      </TouchableOpacity>
      <View>
        <Image
          source={{
            uri:
              selectedItem.properties.medium_url ||
              "https://a0.muscache.com/im/pictures/102085641/64d657b3_original.jpg",
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.title}>{selectedItem.properties.name}</Text>
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
          {selectedItem.properties.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>
            $ {selectedItem.properties.price} /night
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={{ fontFamily: "monsb" }}>
              {(selectedItem.properties.review_scores_value ?? 0) / 20}
            </Text>
          </View>
        </View>
      </View>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 100,
    left: 10,
    right: 10,
    flexDirection: "row",
    borderRadius: 10,
    elevation: 3,
    maxHeight: 150,
  },
  title: {
    fontFamily: "monsb",
    marginBottom: 10,
  },
  image: {
    width: 150,
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
  },
  price: {
    fontSize: 16,
    fontFamily: "monsb",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  description: {
    color: "gray",
    fontFamily: "mon",
  },
  closeButton: {
    position: "absolute",
    top: 6,
    left: 6,
    zIndex: 10,
  },
});

export default ListingItemCard;

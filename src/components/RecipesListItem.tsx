import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Recipe } from "../constants/Types";
interface Props {
  item: Recipe;
  navigate: () => void;
}

const RecipesListItem: React.FC<Props> = ({ item, navigate }) => {
  return (
    <TouchableOpacity
      testID="recipeListItemTouchable"
      activeOpacity={0.5}
      onPress={navigate}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={{ uri: item.imgUrl }}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.textContainer}>
            <Text style={{ ...styles.text, ...styles.title }}>
              {item.title}
            </Text>
            <Text style={{ ...styles.text, ...styles.subTitle }}>
              {item.time} minutes
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default RecipesListItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginVertical: 10,
  },
  backgroundImage: {
    paddingVertical: 15,
    height: 250,
    borderRadius: 10,
    shadowColor: "#000",
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  text: {
    color: "#FFF",
    fontFamily: "Damascus",
  },
  title: {
    width: "70%",
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    shadowColor: "#000",
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
  },
  subTitle: {
    fontSize: 20,
  },
});

import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import fitness from "../data/fitness";
import { useNavigation } from "@react-navigation/native";

//styling consts
const containerMarginTop = 50;
const imageHeight = 140;
const pressableMargin = 10;
const pressablePaddingVertical = 10;
const pressableWidthPercentage = '42.5%';
const pressableElevation = 50;
const pressTextTop = 20;
const pressTextFontSize = 16;

const FitnessExercises = () => {
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate("Workout", {
      image: item.image,
      exercises: item.exercises,
      id: item.id,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.row}>
        {fitness.map((item, key) => (
          <Pressable
            style={({ pressed }) => [
              styles.pressableStyle,
              pressed && styles.pressablePressedStyle,
            ]}
            key={key}
            onPress={() => handlePress(item)}
        >
            <Image style={styles.pressableImage} source={{ uri: item.image }} />
            <Text style={styles.pressableText}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};
export default FitnessExercises;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: containerMarginTop,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  pressablePressedStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  pressableStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: pressableMargin,
    paddingTop: pressablePaddingVertical,
    paddingBottom: pressablePaddingVertical,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: pressableElevation,
    width: pressableWidthPercentage,
  },
  pressableImage: {
    width: '100%',
    height: imageHeight,
    borderRadius: 20,
  },
  pressableText: {
    position: 'absolute',
    color: 'black',
    fontSize: pressTextFontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    top: pressTextTop,
    left: 0,
    right: 0,
  },
});

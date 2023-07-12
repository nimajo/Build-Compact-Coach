import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import fitness from "../data/fitness";
import { useNavigation } from "@react-navigation/native";
 const FitnessTemps = () => {


  // Assign the fitness data to a variable for better readability
  const FitnessData = fitness;
  const navigation = useNavigation();
   return (
    <View>
      {/* Map through the fitness data and render each item */}
      {FitnessData.map((item, key) => (
        <Pressable style={styles.PressStyle} key={key}
        onPress={()=> navigation.navigate("Workout",{
        image:item.image,
        exercises:item.excersises,
        id:item.id,
        })}>
          <Image style={styles.PressImage} source={{ uri: item.image }} />
          <Text style={styles.PressText}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};
 export default FitnessTemps;
 const styles = StyleSheet.create({
  PressStyle: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingTop: 10,
    borderRadius:20,
  },
  PressImage: {
    width: "100%",
    height: 140,
    borderRadius: 20,
  },
  PressText: {
    position: "absolute",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    left: 20,
    top: 25,
  },
});
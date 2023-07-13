import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";

const ExerciseScreen = () => {
  const route = useRoute();
  console.log(route.params);
  const [index, setIndex] = useState(0);
  const exercises = route.params.exercises;
  const currentEx = exercises[index];
  console.log(currentEx, "First Exercise");

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.ExerciseImage} source={{ uri: currentEx.image }} />
      <Text
        className="flex-row text-2xl font-extrabold"
        style={styles.ExerciseName}
      >
        {currentEx.name}
      </Text>
      <Text className="flex-row text-3xl font-bold" style={styles.setText}>
        x{currentEx.sets}
      </Text>

      <TouchableOpacity style={styles.nextButton}>
        <Text className="text-white font-bold text-center">NEXT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  ExerciseImage: {
    width: "100%",
    height: 400,
  },
  ExerciseName: {
    marginLeft: "auto",
    marginRight: "auto",
    top: 80,
  },
  setText: {
    marginLeft: "auto",
    marginRight: "auto",
    top: 100,
    
  },
  nextButton: {
    backgroundColor: "#2F14B8",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 200,
    padding: 15,
    width:115,
    borderRadius: 15,
    
  },
});

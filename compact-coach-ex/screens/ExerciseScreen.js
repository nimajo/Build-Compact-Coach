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
import { useNavigation, useRoute } from "@react-navigation/native";

const ExerciseScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
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

      {/* Caps Exercises Shown to Limit Error using ifElse*/}
      {index + 1 >= exercises.length ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={styles.nextButton}
        >
          <Text className="text-white font-bold text-center text-xl">NEXT</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Rest");

            setTimeout(() => {
              setIndex(index + 1); //Gets Second Exercise
            }, 2000);
          }}
          style={styles.nextButton}
        >
          <Text className="text-white font-bold text-center text-xl">NEXT</Text>
        </TouchableOpacity>
      )}

      {/* Previous and Skip Button  */}

      <TouchableOpacity style={styles.prevskipContainer}>
        <TouchableOpacity style={styles.prevskipB}>
          <Text className="font-bold" style={styles.prevskipT}>
            Previous Exercise
          </Text>
        </TouchableOpacity>

        {index + 1 >= exercises.length ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={styles.prevskipB}
          >
            <Text className="font-bold" style={styles.prevskipT}>
              Skip Exercise
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
          onPress={() => {
            navigation.navigate("Rest");

            setTimeout(() => {
              setIndex(index + 1); //Gets Second Exercise
            }, 2000);
          }}
            style={styles.prevskipB}
          >
            <Text className="font-bold" style={styles.prevskipT}>
              Skip Exercise
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
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
    marginVertical: 130,
    padding: 15,
    width: 115,
    height: 60,
    borderRadius: 15,
  },
  prevskipContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -50,
  },
  prevskipB: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: -50,
    width: 150,
    height: 50,
  },
  prevskipT: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

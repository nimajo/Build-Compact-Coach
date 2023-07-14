import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WorkoutItems } from "../Context";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
const ExerciseScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Setting initial exercise index
  const [index, setIndex] = useState(0);

  // Extracting exercises from the route params
  const exercises = route.params?.exercises || [];

  // Getting current exercise
  const currentExercise = exercises[index] || {};

  // Stopwatch state variables
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Getting workout context values
  const {
    completed,
    setCompleted,
    workout,
    setWorkout,
    setMinutes,
    minutes,
    calories,
    setCalories,
  } = useContext(WorkoutItems);

  // Start the stopwatch for each exercise
  useEffect(() => {
    setSeconds(0);
    setIsActive(true);
  }, [index]);

  // Stopwatch function to pause and resume
  function toggle() {
    setIsActive(!isActive);
  }

  // Update every second
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // After pausing, update the minutes but don't reset the seconds
  useEffect(() => {
    if (!isActive) {
      setMinutes((prevMinutes) => prevMinutes + seconds / 60);
    }
  }, [isActive, seconds, setMinutes]);

  // Function checks if current exercise is the last exercise
  const isLastExercise = useCallback(
    () => index + 1 >= exercises.length,
    [index, exercises.length]
  );

  // Function to goto to the Rest screen and update exercise index
  const navigateToRest = useCallback(() => {
    navigation.navigate("Rest");
    setTimeout(() => {
      setIndex((i) => i + 1);
    }, 2000);
  }, [navigation]);

  // Function to goto to the Home screen
  const navigateToHome = useCallback(
    () => navigation.navigate("Home"),
    [navigation]
  );

  // Function to handle Next press: update workout counter for homescreen and goto to Rest
  const handleNextPress = useCallback(() => {
    setIsActive(false);
    setCompleted((prev) => [...prev, currentExercise.name]);
    setWorkout((w) => w + 1);
    setCalories((c) => c + 5);
    if (!isLastExercise()) {
      navigateToRest();
    } else {
      navigateToHome();
    }
  }, [
    setIsActive,
    setCompleted,
    currentExercise.name,
    setWorkout,
    setCalories,
    isLastExercise,
    navigateToRest,
    navigateToHome,
  ]);

  // Function to handle Previous press: navigate to Rest and update exercise index
  const handlePrevPress = useCallback(() => {
    if (index > 0) {
      setIsActive(false);
      navigation.navigate("Rest");
      setTimeout(() => {
        setIndex((i) => i - 1);
      }, 2000);
    }
  }, [index, setIsActive, navigation]);

  // Function to handle Skip press: if it's not the last exercise, navigate to Rest and update exercise index; if it's the last one, navigate to Home
  const handleSkipPress = useCallback(() => {
    if (!isLastExercise()) {
      setIsActive(false);
      navigateToRest();
    } else {
      navigateToHome();
    }
  }, [isLastExercise, setIsActive, navigateToRest, navigateToHome]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.ExerciseImage}
        source={{ uri: currentExercise.image }}
      />
              <Octicons
          style={styles.backIcon}
          name="checklist"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Tap to Return to Workout List"
        />
      <Text
        className="flex-row text-2xl font-extrabold"
        style={styles.ExerciseName}
      >
        {currentExercise.name}
      </Text>
      <Text className="flex-row text-3xl font-bold" style={styles.setText}>
        x{currentExercise.sets}
      </Text>

      <View style={styles.stopwatchContainer}>
        <Text style={styles.stopwatchText}>
          {("0" + Math.floor(seconds / 60)).slice(-2)} :{" "}
          {("0" + (seconds % 60)).slice(-2)}
        </Text>
        <TouchableOpacity onPress={toggle} style={styles.pauseButton}>
          {isActive ? (
            <AntDesign name="pause" size={28} color="white" />
          ) : (
            <FontAwesome name="play" size={21} color="white" />
          )}
        </TouchableOpacity>
      </View>

      {isLastExercise() ? (
        <TouchableOpacity onPress={navigateToHome} style={styles.nextButton}>
          <Text className="text-white font-bold text-center text-xl">NEXT</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleNextPress} style={styles.nextButton}>
          <Text className="text-white font-bold text-center text-xl">NEXT</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.prevskipContainer}>
        <TouchableOpacity
          disabled={index == 0}
          onPress={handlePrevPress}
          style={styles.prevskipB}
        >
          <Text className="font-bold" style={styles.prevskipT}>
            Previous Exercise
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkipPress} style={styles.prevskipB}>
          <Text className="font-bold" style={styles.prevskipT}>
            Skip Exercise
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
  ExerciseImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  ExerciseName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  setText: {
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#2F14B8",
    marginTop: 30,
    padding: 15,
    borderRadius: 15,
    alignSelf: "center",
  },
  prevskipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  prevskipB: {
    backgroundColor: "#2F14B8",
    padding: 12,
    borderRadius: 15,
    flex: 0.45,
  },
  prevskipT: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  stopwatchContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  stopwatchText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pauseButton: {
    width: 40,
    height: 40,
    backgroundColor: "#2F14B8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pauseText: {
    color: "#fff",
    fontSize: 16,
  },
  backIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});

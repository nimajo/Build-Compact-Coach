import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  Alert,
} from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WorkoutComponents } from "../Context";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
const ExerciseScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Setting initial exercise index
  const [index, setIndex] = useState(0);

  // Extracting exercises from the route params
  const exercises = route.params?.exercises || [];

  const currentExercise = exercises[index] || {};

  // VALUES USED FOR
  let ExperienceValue = 25; //25 xp per workout
  let CalorieValue = 5; //5 kcal per workout

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const {
    completed,
    setCompleted,
    workout,
    setWorkout,
    setMinutes,
    minutes,
    calories,
    setCalories,
    xp,
    setXp,
  } = useContext(WorkoutComponents);

  // for starting stopwatch at the beginning of each exercise
  useEffect(() => {
    setSeconds(0);
    setIsActive(true);
  }, [index]);

  // for the stopwatch pause and resume button
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
    () => index + 1 >= exercises.length, //if index+1 is >= to the number of exercises in that template
    [index, exercises.length]
  );

  // Function to goto to the Rest screen and update exercise index
  const navigateToRest = useCallback(() => {
    navigation.navigate("Rest");
    setTimeout(() => {
      setIndex((i) => i + 1); // Current Exercise + 1
    }, 2000);
  }, [navigation]);

  // Function to goto to the Home screen
  const navigateToHome = useCallback(
    () => navigation.navigate("Home"),
    [navigation]
  );

  // Function to  Next press: update workout counter and goto to rest
  const handleNextPress = useCallback(() => {
    setIsActive(false);
    setCompleted((prev) => [...prev, currentExercise.name]);
    setWorkout((w) => w + 1); //Workout Counter Increments
    setCalories((c) => c + CalorieValue); //Calorie Per Workout is set to that value
    setXp((exp) => exp + ExperienceValue); //XP Per Workout is set to that value
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
    setXp,
    isLastExercise,
    navigateToRest,
    navigateToHome,
  ]);

  // Function for Previous press: navigate to Rest and update exercise index
  const handlePrevPress = useCallback(() => {
    //will only skip if depedency is changed
    if (index > 0) {
      setIsActive(false);
      navigation.navigate("Rest");
      setTimeout(() => {
        setIndex((i) => i - 1); //current exercise - 1
      }, 2000);
    }
  }, [index, setIsActive, navigation]);

  // Function for Skip press
  const handleSkipPress = useCallback(() => {
    //will only skip if depedency is changed
    if (!isLastExercise()) {
      setIsActive(false);
      navigateToRest();
    } else {
      navigateToHome();
    }
  }, [isLastExercise, setIsActive, navigateToRest, navigateToHome]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ExerciseImagineContainer}>
        <Image
          style={styles.ExerciseImage}
          source={{ uri: currentExercise.image }}
        />
      </View>
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
      <Text className="flex-row text-4xl font-bold" style={styles.setText}>
        {currentExercise.sets} Sets x {currentExercise.reps} Reps
      </Text>

      <View style={styles.stopwatchContainer}>
        <Text style={styles.stopwatchText}>
          {("0" + Math.floor(seconds / 60)).slice(-2)} :{" "}
          {("0" + (seconds % 60)).slice(-2)}
        </Text>
        <TouchableOpacity
          onPress={toggle}
          style={styles.pauseButton}
          accessibilityLabel="Tap to Pause/Resume Workout"
        >
          {isActive ? (
            <AntDesign name="pause" size={28} color="white" />
          ) : (
            <FontAwesome name="play" size={21} color="white" />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleNextPress}
        style={styles.nextButton}
        accessibilityLabel="Tap to goto Next Workout"
      >
        <Text className="text-white font-bold text-center text-xl">NEXT</Text>
      </TouchableOpacity>

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

        <TouchableOpacity
          onPress={handleSkipPress}
          style={styles.prevskipB}
          accessibilityLabel="Tap to skip Workout"
        >
          <Text className="font-bold" style={styles.prevskipT}>
            Skip Exercise
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(`${currentExercise.name} For ${currentExercise.sets} Sets and ${currentExercise.reps} Reps!, Remember to Stay Hydrated!`);
        }}
        style={styles.DescButton}
        accessibilityLabel="Tap to Read Description"
      >
        <Text className="text-white font-bold text-center text-xl">
          DESCRIPTION
        </Text>
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
    borderColor: "#ddd",
    borderWidth: 1.75,
  },
  ExerciseName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  setText: {
    marginTop: 20,
    fontSize: 30,
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
  ExerciseImagineContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  DescButton: {
    backgroundColor: "#2F14B8",
    marginTop: 10,
    padding: 15,
    borderRadius: 15,
    alignSelf: "center",
  },
});

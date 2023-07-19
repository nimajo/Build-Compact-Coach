import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { WorkoutComponents } from "../Context";
import { Entypo } from "@expo/vector-icons";

const WorkoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { completed, setCompleted } = useContext(WorkoutComponents);
  console.log(route.params); 
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          style={styles.backIcon}
          name="arrow-back"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Tap to Return to Home"
        />
        <Image style={styles.ImageStyle} source={{ uri: route.params.image }} />
      </View>
      
      <Text style={styles.ExerciseList}>Exercise List</Text>
      <ScrollView style={styles.exerciseContainer}>
        {route.params.exercises.map((item, index) => (
          <View style={styles.ExercisePressable} key={index}>
            <Image style={styles.exerciseImage} source={{ uri: item.image }} />
            <View style={styles.textContainer}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.sets}>{item.sets} Sets</Text>
              <Text style={styles.sets}>{item.reps} Reps</Text>
            </View>
            {completed.includes(item.name) ? ( //ifelse completed exercise
              <Ionicons name="checkmark-done-circle" size={24} color="green" />
            ) : (
              <Entypo name="circle-with-cross" size={24} color="grey" />
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => {
          navigation.navigate("Exercise", {
            exercises: route.params.exercises,
          });
          setCompleted([]);
        }}
      >
        <Text style={styles.startText}>START SESSION</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    width: "100%",
    height: 170,
    position: "relative",
  },
  ImageStyle: {
    width: "100%",
    height: "100%",
  },
  backIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  exerciseImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
    marginRight: 10,
    borderWidth:2,
    borderColor:"#4e4c4c"
  },
  ExercisePressable: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', //seperates the exercises with gray border
  },
  textContainer: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sets: {
    marginTop: 4,
    fontSize: 14,
    color: "gray",
  },
  ExerciseList: {
    paddingLeft: 10,
    paddingTop: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  startButton: {
    backgroundColor: "#2F14B8",
    paddingVertical: 15,
    borderRadius: 15,
    margin: 20,
  },
  startText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  exerciseContainer: {
    flex: 1,
  },
});

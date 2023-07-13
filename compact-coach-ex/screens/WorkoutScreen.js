import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import ExerciseScreen from "./ExerciseScreen";

const WorkoutScreen = () => {
  const route = useRoute();
  console.log(route.params);
  const navigation = useNavigation();

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Image style={styles.ImageStyle} source={{ uri: route.params.image }} />
        <Ionicons
          style={styles.backIcon}
          name="arrow-back"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Tap to Return to Home"
        />
        <Text style={styles.ExerciseList}>Exercise List</Text>

        {route.params.exercises.map((item, index) => (
          <Pressable style={styles.ExercisePressable} key={index}>
            <Image style={styles.exerciseImage} source={{ uri: item.image }} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold", width: 170 }}>
                {item.name}
              </Text>
              <Text style={{ marginTop: 4, fontSize: 18, color: "gray" }}>
                {item.sets} Sets
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View className="bg-white">
        <TouchableOpacity
          style={styles.startButton}
          onPress={() =>
            navigation.navigate("Exercise", {
              exercises: route.params.exercises,
            })
          }
        >
          <Text style={styles.startText}>START SESSION</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  ImageStyle: {
    width: "100%",
    height: 170,
  },
  container: {
    backgroundColor: "white",
    marginTop: 30,
  },
  backIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  exerciseImage: {
    width: 90,
    height: 90,
  },
  ExercisePressable: {
    margin: 10,
    flexDirection: "row",
    alignContent: "center",
  },
  startText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: "#2F14B8",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
    padding: 10,
    borderRadius: 15,
  },
  ExerciseList: {
    paddingLeft: 10,
    paddingTop: 20,
    fontWeight: 600,
    fontSize: 15,
  },
});

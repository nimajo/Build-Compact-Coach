import React, { useState, useEffect, useCallback } from "react";
import { Text, View, SafeAreaView, ScrollView, Alert } from "react-native";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDocFromCache,
  getDoc,
} from "firebase/firestore";
import { Button } from "@rneui/themed";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import FitnessTemps from "../components/FitnessTemps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [totalWeightLoss, setTotalWeightLoss] = useState(0);

  const fetchData = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef, { source: "server" }); // <-- fetch from server
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting profile data: ", error);
    }
  };

  const getTotalWeightLoss = async () => {
    try {
      const storedWeightLoss = await AsyncStorage.getItem("totalWeightLoss");
      if (storedWeightLoss !== null) {
        setTotalWeightLoss(JSON.parse(storedWeightLoss));
      }
    } catch (e) {
      // Catch any reading errors
      console.log(e);
    }
  };

  // Call fetchData and getTotalWeightLoss every time the HomeScreen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
      getTotalWeightLoss();
    }, [])
  );

  // IMPLEMENTATION OF WORKOUT SESSIONS AND FEATURES
  //new states
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  //function to fetch data from firestore
  const fetchWorkoutData = async () => {
    try {
      const workoutCollection = collection(db, "workouts");
      const workoutSnapshot = await getDocs(workoutCollection);
      let workouts = 0;
      let minutes = 0;
      let calories = 0;

      // Loop over the documents in the collection
      workoutSnapshot.forEach((doc) => {
        const data = doc.data();

        // Check if the workout was done today
        if (
          data.user === user.uid &&
          new Date(data.timestamp.toDate()).toDateString() ===
            new Date().toDateString()
        ) {
          workouts += 1;
          minutes += data.duration;
          calories += data.caloriesBurnt;
        }
      });

      setTotalWorkouts(workouts);
      setTotalMinutes(minutes);
      setTotalCalories(calories);
    } catch (error) {
      console.log("Error getting workout data: ", error);
    }
  };

  //checks workout data everytime homescreen is in focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
      getTotalWeightLoss();
      fetchWorkoutData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Text Alongside Weight Update */}
        <View>
          {profileData && (
            <Text
              className="capitalize flex-row text-xl leading-relaxed font-semibold "
              style={{ marginTop: 40, marginLeft: 12 }}
            >
              Welcome {profileData.fname}
            </Text>
          )}
          {totalWeightLoss < 0 && (
            <Text
              className="flex-row  text-xl leading-relaxed font-small font-light "
              style={{
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              Well Done! You've Lost {-totalWeightLoss} kg Since Joining
            </Text>
          )}
          {totalWeightLoss > 0 && (
            <Text
              className="flex-row  text-xl leading-relaxed font-small font-light "
              style={{
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              You've Gained {+totalWeightLoss} kg
            </Text>
          )}
        </View>

        <View>
          <Text
            className="capitalize flex-row text-xl leading-relaxed font-semibold "
            style={{ marginTop: 30, marginLeft: 15 }}
          >
            Today
          </Text>
        </View>

        {/* Text For Workouts */}
        <View style={styles.topbar}>
          <View>
            <Text className="capitalize flex-row text-xl leading-relaxed font-semibold ">
              {" "}
              Workouts
            </Text>
            <Text className="flex-row  text-xl leading-relaxed font-small font-medium ">
              {" "}
              {totalWorkouts}
            </Text>
          </View>

          <View>
            <Text className="capitalize flex-row text-xl leading-relaxed font-semibold ">
              {" "}
              Minutes
            </Text>
            <Text className="flex-row  text-xl leading-relaxed font-small font-medium ">
              {" "}
              {totalMinutes}
            </Text>
          </View>

          <View>
            <Text className="capitalize flex-row text-xl leading-relaxed font-semibold ">
              Calories
            </Text>
            <Text className="flex-row  text-xl leading-relaxed font-small font-medium ">
              {" "}
              {totalCalories}
            </Text>
          </View>
        </View>

        <View style={styles.boxes}>
          <View style={styles.box1}>
            <Text
              className="font-semibold leading-relaxed text-lg"
              style={{ position: "absolute", top: 6, right: 29 }}
            >
              Steps
            </Text>
            <MaterialCommunityIcons
              name="shoe-print"
              size={30}
              color="black"
              style={{ position: "absolute", top: 40, right: 10 }}
              onPress={() => {Alert.alert('You have walked _ steps today!')}}
            />
          </View>

          <View style={styles.box2}>
            <Text
              className="font-semibold leading-relaxed text-lg"
              style={{ position: "absolute", top: 6, right: 10 }}
            >
              Heartrate
            </Text>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={30}
              color="black"
              style={{ position: "absolute", top: 40, right: 10 }}
              onPress={() => {Alert.alert('You had a heartrate of _ today')}}
            />
          </View>
        </View>

        {/* Fitness Templates */}

        <FitnessTemps accessibilityLabel="Tap me to Begin Working Out!" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // All the styles
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  topbar: {
    flexDirection: "row", //direction of items
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 6,
    backgroundColor: "#f0763c", // color of box : light grey color
    margin: 15, // space from the screen edges
    padding: 15, // space from the box edges to the content
    borderRadius: 15, // rounded corners
  },
  boxes: {
    flexDirection: "row", //direction of items
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    position: "relative",

    paddingBottom: 0,
    paddingTop: 0,
    //backgroundColor: '#f0763c', // color of box : light grey color
    margin: 15, // space from the screen edges
    padding: 75, // space from the box edges to the content
    borderRadius: 0, // rounded corners
  },
  box1: {
    paddingHorizontal: 50,
    paddingVertical: 50,

    backgroundColor: "#f0763c", // color of box : light grey color
    margin: 0, // space from the screen edges
    padding: 50, // space from the box edges to the content
    borderRadius: 15, // rounded corners
  },
  box2: {
    paddingHorizontal: 50,
    paddingVertical: 50,

    backgroundColor: "#f0763c", // color of box : light grey color
    margin: 0, // space from the screen edges
    padding: 50, // space from the box edges to the content
    borderRadius: 15, // rounded corners
  },
});
export default HomeScreen;

// Obselete Right Now, Used Fitness,js instead
import React, { useState, useEffect, useCallback } from "react";
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDocFromCache,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { Button } from "@rneui/themed";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fitness from "../data/fitness";
import { Picker } from "@react-native-picker/picker";

// Custom hook to get profile data from Firestore
function useProfileData(user) {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef, { source: "server" });

          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error getting profile data: ", error);
        }
      }
    };

    fetchData();
  }, [user]);

  return profileData;
}

// Custom hook to get total weight loss from AsyncStorage
function useTotalWeightLoss() {
  const [totalWeightLoss, setTotalWeightLoss] = useState(0);

  useEffect(() => {
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

    getTotalWeightLoss();
  }, []);

  return totalWeightLoss;
}

// Custom hook to get workout data from Firestore
function useWorkoutData(user) {
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      if (user) {
        try {
          const workoutCollection = collection(db, "workouts");
          const q = query(workoutCollection, where("user", "==", user.uid));
          const workoutSnapshot = await getDocs(q);

          let workouts = 0;
          let minutes = 0;
          let calories = 0;

          // Loop over the documents in the collection
          workoutSnapshot.forEach((doc) => {
            const data = doc.data();

            // Check if the workout was done today
            if (
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
      }
    };

    fetchWorkoutData();
  }, [user]);

  return { totalWorkouts, totalMinutes, totalCalories };
}

// Custom hook to manage workout session
function useWorkoutSession() {
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [customWorkout, setCustomWorkout] = useState([]);
  const [isWorkoutOngoing, setIsWorkoutOngoing] = useState(false);
  const [workoutDuration, setWorkoutDuration] = useState(0);

  // Start a predefined or custom workout
  const startWorkout = (custom = false) => {
    setIsWorkoutOngoing(true);
    if (custom) {
      setCurrentWorkout({ exercises: customWorkout });
    }

    setInterval(() => {
      setWorkoutDuration((prevDuration) => prevDuration + 1);
    }, 1000);
  };

  // End the current workout
  const endWorkout = () => {
    setIsWorkoutOngoing(false);
    setWorkoutDuration(0);
    setCurrentWorkout(null);
  };

  return {
    currentWorkout,
    customWorkout,
    isWorkoutOngoing,
    workoutDuration,
    setCurrentWorkout,
    setCustomWorkout,
    startWorkout,
    endWorkout,
  };
}

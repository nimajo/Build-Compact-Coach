import React, { useState, useEffect, useCallback, useContext } from "react";
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
import { WorkoutItems } from "../Context";
import GoogleFit, { Scopes } from "react-native-google-fit";

const HomeScreen = () => {
  const { workout, minutes, calories, sessions, setSessions } =
    useContext(WorkoutItems);
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [totalWeightLoss, setTotalWeightLoss] = useState(0);
  const [steps, setSteps] = useState(0);
  useEffect(() => {
    //gets data from google fit
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ, //for steps calories etc
        Scopes.FITNESS_ACTIVITY_WRITE, //for writing the data back into googlefit
        Scopes.FITNESS_BODY_READ, //for reading heartrate bodyfat percentage etc
        Scopes.FITNESS_BODY_WRITE, //for writing data back into googlefit
      ],
    };

    GoogleFit.authorize(options)
      .then((authResult) => {
        if (authResult.success) {
          GoogleFit.getDailyStepCountSamples({
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
          })
            .then((res) => {
              let totalSteps = 0;
              res.forEach((dataset) => {
                dataset.steps.forEach((step) => {
                  totalSteps += step.value;
                });
              });
              setSteps(totalSteps);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch(() => {
        console.log("authorization failed for GoogleFit");
      });
  }, []);

  const fetchData = async () => {
    //function gets user data from firestore database using the UID
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
    //uses the async (local) storage get total weightloss
    try {
      const storedWeightLoss = await AsyncStorage.getItem("totalWeightLoss");
      if (storedWeightLoss !== null) {
        setTotalWeightLoss(JSON.parse(storedWeightLoss));
      }
    } catch (error) {
      // Catch any reading errors
      console.log(error);
    }
  };

  // uses these functions every time homescreen in focus so that it updates values
  useFocusEffect(
    useCallback(() => {
      fetchData();
      getTotalWeightLoss();
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
              Well Done! You've Lost {-totalWeightLoss.toFixed(1)} kg Since
              Joining
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
              You've Gained {+totalWeightLoss.toFixed(1)} kg
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
              {workout}
            </Text>
          </View>

          <View>
            <Text className="capitalize flex-row text-xl leading-relaxed font-semibold ">
              {" "}
              Minutes
            </Text>
            <Text className="flex-row  text-xl leading-relaxed font-small font-medium ">
              {" "}
              {minutes.toFixed(1)}
            </Text>
          </View>

          <View>
            <Text className="capitalize flex-row text-xl leading-relaxed font-semibold ">
              Calories
            </Text>
            <Text className="flex-row  text-xl leading-relaxed font-small font-medium ">
              {" "}
              {calories.toFixed(1)}
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
            <Text
              style={{ position: "absolute", top: 35, left: 40 }}
              className="text-2xl font-extrabold"
            >
              {steps}
            </Text>

            <MaterialCommunityIcons
              name="shoe-print"
              size={30}
              color="black"
              style={{ position: "absolute", top: 40, right: 10 }}
              onPress={() => {
                Alert.alert(`You have walked ${steps} steps today!`);
              }}
            />
          </View>

          <View style={styles.box2}>
            <Text
              className="font-semibold leading-relaxed text-lg"
              style={{ position: "absolute", top: 6, right: 6 }}
            >
              Heart Rate
            </Text>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={30}
              color="black"
              style={{ position: "absolute", top: 40, right: 10 }}
              onPress={() => {
                Alert.alert("You had a Heart Rate of This today");
              }}
            />
            <Text
              style={{ position: "absolute", top: 38, left: 30 }}
              className="text-2xl font-extrabold"
            >
              99
            </Text>
          </View>
        </View>

        {/* Fitness Templates */}

        <FitnessTemps accessibilityLabel="Tap me to Begin Working Out!" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 6,
    backgroundColor: "#f0763c",
    margin: 15, // space from the screen edges
    padding: 15, // space from the box edges to the content
    borderRadius: 15,
  },
  boxes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    position: "relative",

    paddingBottom: 0,
    paddingTop: 0,
    margin: 15, // space from the screen edges
    padding: 75, // space from the box edges to the content
    borderRadius: 0,
  },
  box1: {
    paddingHorizontal: 50,
    paddingVertical: 50,
    backgroundColor: "#f0763c",
    margin: 0, // space from the screen edges
    padding: 50, // space from the box edges to the content
    borderRadius: 15,
  },
  box2: {
    paddingHorizontal: 50,
    paddingVertical: 50,
    backgroundColor: "#f0763c",
    margin: 0, // space from the screen edges
    padding: 50, // space from the box edges to the content
    borderRadius: 15,
  },
});
export default HomeScreen;

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native";
import { Button } from "@rneui/themed";
import { ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { WorkoutItems } from "../Context";
import useAchievements from "../data/achievements";
import { FlatList } from "react-native";
const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [latestWeight, setLatestWeight] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const achievements = useAchievements();
  const { workout, minutes, calories, sessions, setSessions } =
    useContext(WorkoutItems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef, { source: "server" }); // <-- fetch from server
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData(data);
          setProfilePictureUrl(data.profilePicture);
        } else {
          console.log("No such document");
        }

        const weights = await AsyncStorage.getItem("weights");
        if (weights !== null) {
          const weightEntries = JSON.parse(weights);
          setLatestWeight(weightEntries[weightEntries.length - 1]?.weight);
        }
      } catch (error) {
        console.log("PROFILE DATA ERROR : ", error);
      }
    };
    fetchData();
  }, [user]);

  const uploadProfilePicture = async (uri, uid) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const uploadTask = uploadBytesResumable(
      ref(storage, `profile_pictures/${uid}`),
      blob
    );

    try {
      await uploadTask;
      const url = await getDownloadURL(ref(storage, `profile_pictures/${uid}`));
      return url;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const updateProfileWithPicture = async (uid, url) => {
    await setDoc(
      doc(db, "users", uid),
      {
        profilePicture: url,
      },
      { merge: true }
    );
  };

  const onChangeProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const url = await uploadProfilePicture(result.uri, user.uid);
      await updateProfileWithPicture(user.uid, url);
      setProfilePictureUrl(url);
    }
  };

  // Sign out function
  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/** Profile Picture and Text */}
        <View style={{ alignContent: "center", marginTop: 50 }}>
          <TouchableOpacity onPress={onChangeProfilePicture}>
            <Image
              source={
                profilePictureUrl
                  ? { uri: profilePictureUrl }
                  : require("../images/grey-pic.jpg")
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
          {profileData && (
            <Text className="capitalize flex-row text-center text-xl leading-relaxed font-light ">
              Name : {profileData.fname} {"\n"}
              Current Weight: {latestWeight} kg
            </Text>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text
            className="capitalize flex-row text-center text-xl font-bold "
            style={{
              marginRight: 8,
              marginLeft: 8,
            }}
          >
            Achievements
          </Text>

          {/*  achievement badges here */}
          <View style={styles.achievementsContainer}>
          <View style={styles.achievementsGrid}>
          {achievements.map(achievement => (
            <View style={styles.achievementItem} key={achievement.id}>
              <Image source={achievement.image} style={styles.achievementImage} />
              <Text style={styles.achievementTitle}>{achievement.name}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
            </View>
          ))}
        </View>

          </View>
      </View>

          {/** SignOut Button */}

          <Button
            title="Sign Out"
            onPress={signOutUser}
            buttonStyle={{
              alignItems: "center",
              backgroundColor: "#2F14B8",

              accessibilityLabel:
                "Press to Sign Out",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 15,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 110,
            }}
            titleStyle={{ fontWeight: "bold" }}
          />
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // other styles
  achievementsContainer: {
    backgroundColor: "#D3D3D3", // color of box : light grey color
    margin: 15, // space from the screen edges
    borderRadius: 15, // rounded corners
    padding: 15, // space from the box edges to the content
    alignItems: "center", // center items horizontally
    justifyContent: "center", // center items vertically
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignSelf: 'stretch', // ensure the grid takes full width
  },
  achievementItem: {
    width: "30%", // 3 items per row
    margin: "1.66%", // Space between items
    alignItems: "center", // center items horizontally
    marginBottom: 20, // margin at the bottom of each item
  },
  achievementImage: {
    width: 70,
    height: 70,
  },
  achievementTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  achievementDescription: {
    textAlign: "center",
  },
});


export default ProfileScreen;

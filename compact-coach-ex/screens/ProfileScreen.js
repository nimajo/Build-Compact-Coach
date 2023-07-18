import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/themed";
import * as ImagePicker from 'expo-image-picker';
import useProfilePicture from "../components/ProfilePic";
import useAchievements from "../data/achievements";
import { WorkoutItems } from "../Context";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [latestWeight, setLatestWeight] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const achievements = useAchievements();
  const { xp } = useContext(WorkoutItems);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Used for the Text at the top
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef, { source: "server" }); // fetch from server
        if (docSnap.exists()) {
          const data = docSnap.data(); //data = profileData
          setProfileData(data);
          setProfilePictureUrl(data.profilePicture);
        } else {
          console.log("No such document : Profile Data");
        }

        // Gets Latest Weight Entry
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
    
    const fileRef = ref(storage, `profile_pictures/${uid}`);
  
    try {
      await uploadBytes(fileRef, blob);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const updateProfileWithPicture = async (uid, url) => {
    const userRef = doc(db, "users", uid);

    try {
      await updateDoc(userRef, {
        profilePicture: url,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onChangeProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      try {
        // Accessing the uri from the first element of the assets array
        const url = await uploadProfilePicture(result.assets[0].uri, user.uid);
        await updateProfileWithPicture(user.uid, url);
        setProfilePictureUrl(url);
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'Failed to update profile picture.');
      }
    }
  };

  // Sign out function
  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
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
              Current Weight: {latestWeight} kg {"\n"}
              Experience Points : {xp}
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
              {achievements.map((achievement) => (
                <TouchableOpacity
                  style={styles.achievementItem}
                  key={achievement.id}
                  onPress={() =>
                    Alert.alert(achievement.name, achievement.description)
                  }
                >
                  <Image
                    source={achievement.image}
                    style={styles.achievementImage}
                  />
                  <Text style={styles.achievementTitle}>
                    {achievement.name}
                  </Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                </TouchableOpacity>
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

            accessibilityLabel: "Press to Sign Out",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 15,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 110,
            marginBottom: 50,
          }}
          titleStyle={{ fontWeight: "bold" }}
        />
        <Text
          style={styles.attribution}
          title="workout icons"
          onPress={() =>
            Linking.openURL("https://www.flaticon.com/free-icons/workout")
          }
        >
          Workout icons created by Freepik - Flaticon
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  achievementsContainer: {
    backgroundColor: "#D3D3D3", // color of box : light grey color
    margin: 15,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  achievementItem: {
    width: "30%", // 3 items per row
    margin: "1.66%", // Space between items
    alignItems: "center", // center items horizontally
    marginBottom: 20,
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
  attribution: {
    textAlign: "center",
    fontSize: 11,
  },
});

export default ProfileScreen;

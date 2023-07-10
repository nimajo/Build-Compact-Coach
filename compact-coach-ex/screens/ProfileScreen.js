import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { auth , db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native';
import { Button } from '@rneui/themed';
import { ScrollView } from 'react-native';


const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [latestWeight, setLatestWeight] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef, { source: "server" }); // <-- fetch from server
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.log("No such document!");
        }

        const weights = await AsyncStorage.getItem('weights');
        if (weights !== null) {
          const weightEntries = JSON.parse(weights);
          setLatestWeight(weightEntries[weightEntries.length - 1]?.weight);
        }
      } catch (error) {
        console.log("Error getting profile data: ", error);
      }
    };
    fetchData();
  }, [user]);

  // Sign out function
  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    }).catch(err => {
      console.log(err);
    })
  }

  const goToGraphScreen = () => {
    navigation.navigate('GraphScreen');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {/** Profile Text */}
      <View style={{alignContent:'center', marginTop:50}}>
          {profileData && (
          <Text 
          className="capitalize flex-row text-center text-xl leading-relaxed font-light "
          >
          Name : {profileData.fname} {'\n'}
          Current Weight: {latestWeight} kg
          </Text>
          )}
      </View>

       {/** Update Weight Redirect Button */}       
      <Button
      title="Update Weight"
      onPress={() => navigation.navigate('Dashboard', { screen: 'Graph' })} 
      buttonStyle={{
        alignItems:"center",
        backgroundColor: '#1E2923',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
        }}
        containerStyle={{
        width: 150,
        marginHorizontal: 130,
        marginVertical: 60,
        }}
        titleStyle={{ fontWeight: 'bold' }}/>

<View style={{flex: 1}}>
<Text
  className="capitalize flex-row text-center text-xl font-bold "
  style={{
  marginRight:8,
  marginLeft:8,
  }}
>
  Achievements
</Text>


<View style={styles.achievementsContainer}>
  {/* You can put the achievement badges here */}
</View>

      {/** SignOut Button */}

          <Button
          title="Sign Out"
          onPress={signOutUser}
          buttonStyle={{
          alignItems:"center",
          backgroundColor: '#E9663B',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 15,
          }}
          containerStyle={{
          width: 200,
          marginHorizontal: 110,

          }}
          titleStyle={{ fontWeight: 'bold' }}/>

</View>





      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // other styles
  achievementsContainer: {
    backgroundColor: '#D3D3D3', // color of box : light grey color
    margin: 15, // space from the screen edges
    padding: 150, // space from the box edges to the content
    borderRadius: 15, // rounded corners
    alignItems: 'center', // center items horizontally
    justifyContent: 'center', // center items vertically
  },
});

export default ProfileScreen;

import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { auth , db} from '../firebase';
import { collection, getDocs, doc, getDocFromCache, getDoc } from "firebase/firestore";
import { Button } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';


const LeaderBoardScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);

  // Sign out function
  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    }).catch(err => {
      console.log(err);
    })
  }

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
      } catch (error) {
        console.log("Error getting profile data: ", error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <SafeAreaView>



      {/** Profile Text */}
      <SafeAreaView style={{alignContent:'center', marginTop:300}}>
          {profileData && (
          <Text 
          className="capitalize flex-row text-center text-xl leading-relaxed font-light "
          
          >
          Name : {profileData.fname} {'\n'}
          Weight: {profileData.weight} kg
          </Text>
          )}
      </SafeAreaView>
        

      {/** SignOut Button */}
      <SafeAreaView style={{alignContent:'center', marginTop:250}}>
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
          marginHorizontal: 100,
          marginVertical: 60,
          }}
          titleStyle={{ fontWeight: 'bold' }}/>
      </SafeAreaView>




    </SafeAreaView>
  );
};

export default LeaderBoardScreen;

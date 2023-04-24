import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { auth , db} from '../firebase';
import { collection, getDocs, doc, getDocFromCache, getDoc } from "firebase/firestore";
import { Button } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';





const HomeScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);

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
  <SafeAreaView style={{ flex:1}}>
    <View>





      <View>
        {profileData && (
          <Text 
          className="capitalize flex-row text-center text-xl leading-relaxed font-medium "
          style={{marginTop:70, marginLeft:-250}}
          >
          Welcome {profileData.fname} 
          </Text>
        )}
      </View>




























    </View>
  </SafeAreaView>
);
}

export default HomeScreen
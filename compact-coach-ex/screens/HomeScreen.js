import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { auth , db } from '../firebase';
import { collection, getDocs, doc, getDocFromCache, getDoc } from "firebase/firestore";
import { Button } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import TotalWeightLossMessage from './TotalWeightLossMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const storedWeightLoss = await AsyncStorage.getItem('totalWeightLoss');
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

  return (
    <SafeAreaView>
      <View>
        <View>
          {profileData && (
            <Text 
            className="capitalize flex-row text-xl leading-relaxed font-semibold "
            style={{marginTop:70, marginLeft:10}}
            >
            Welcome {profileData.fname} 
            </Text>
          )}
          {totalWeightLoss < 0 &&
            <Text 
            className="flex-row  text-xl leading-relaxed font-small font-light "
            style={{
              marginTop:10,
              marginLeft:10,
            }}
            >Well Done! You've Lost {-totalWeightLoss} kg</Text>
          }
          {totalWeightLoss > 0 &&
            <Text
            className="flex-row  text-xl leading-relaxed font-small font-light "
             style={{
              marginTop:10,
              marginLeft:10,
            }}
            >You've Gained {+totalWeightLoss} kg</Text>
          }
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen

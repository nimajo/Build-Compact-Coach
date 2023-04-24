import { Text, TextInput, TouchableOpacity, TouchableHighlight, View, StyleSheet, Image, KeyboardAvoidingView, Pressable, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Icon } from '@rneui/themed'
import { grey } from '@mui/material/colors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../firebase';
import { setDoc } from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";





const RegisterScreen = () => {
     const [email,setEmail] = useState("");
     const [password,setPassword] = useState("");
     const [fname,setFname] = useState("");
     const [weight,setWeight] = useState("");
     const navigation = useNavigation();
     const register = () => {
      if (email === "" || password === "" || fname === "" || weight === ""){
        Alert.alert('Missing Details', 'Please Fill in all the Fields', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable:false}
        );
      }
    
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const myUserUid = user.uid;
        setDoc(doc(db, "users", myUserUid), {
          email: user.email,
          fname: fname,
          weight: weight,
        }).then(() => {
          console.log("Document successfully written!");
    
          // Retrieve the user's document from Firestore and log the data
          getDoc(doc(db, "users", myUserUid)).then((doc) => {
            if (doc.exists()) {
              console.log("Document data:", doc.data());
            } else {
              console.log("No such document!");
            }
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
          
        }).catch((error) => {
          console.error("Error writing document: ", error);
        });
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
      });
    };
    






  return (
     <KeyboardAvoidingView style={{ flex: 1,alignItems:'center' }} behavior="padding"> 
     <SafeAreaView>

     {/**  Text*/}
     <View style={{justifyContent:'center', alignItems:"center",marginTop:100}}>
     <Text style={{fontSize:30,fontWeight:'bold'}}>Register</Text>
     <Text style={{fontSize:18,marginTop:8,fontWeight:'bold'}}>Create a New Account</Text>
     </View>
     {/** Input Fields */}


          {/** Email */}
          <View style={{flexDirection:"row",alignItems:"center",marginTop:50}}>
          <Icon type='font-awesome' name= "envelope-o" size={24}/>
          <TextInput 
          style={{
          borderBottomWidth:1,
          borderBottomColor:"gray",
          width:300,marginVertical:10,
          marginLeft:10,
          fontSize:email ? 18 : 18,
          }}
          placeholder='Email' 
          value={email}
          onChangeText={(text) => setEmail(text) }
          placeholderTextColor="black"
          />
          </View>
            {/** Name  */}
          <View style={{flexDirection:"row",alignItems:"center"}}>
          <Icon type='font-awesome' name= "user-o" size={24}/>
          <TextInput 
          style={{
          borderBottomWidth:1,
          borderBottomColor:"gray",
          width:300,marginVertical:30,
          marginLeft:10,
          fontSize:fname ? 18 : 18,
          }}
          placeholder='Name' 
          value={fname}
          onChangeText={(text) => setFname(text)}
          placeholderTextColor="black"/> 
          </View>

          {/** Password  */}
          <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
          <Icon type='font-awesome' name= "unlock" size={24}/>
          <TextInput 
          style={{
          borderBottomWidth:1,
          borderBottomColor:"gray",
          width:300,marginVertical:10,
          marginLeft:10,
          fontSize:password ? 18 : 18,
          }}
          placeholder='Password' 
          value={password}
          onChangeText={(text) => setPassword(text) }
          placeholderTextColor="black"
          secureTextEntry/>
          </View>

          {/** Bodyweight  */}
          <View style={{flexDirection:"row",alignItems:"center",marginTop:15}}>
          <Icon type='font-awesome' name= "balance-scale" size={24}/>
          <TextInput 
          style={{
          borderBottomWidth:1,
          borderBottomColor:"gray",
          width:300,marginVertical:10,
          marginLeft:10,
          fontSize:weight ? 18 : 18,
          }}
          placeholder='Body weight/kg' 
          value={weight}
          onChangeText={(text) => setWeight(text) }
          placeholderTextColor="black"
            />
          </View>


          {/** Register Button  */}
          <Button 
          onPress={register}
          title="Register"
          icon={{
            name: 'arrow-right',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          iconRight
          iconContainerStyle={{ marginLeft: 10 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: '#E9663B',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 80,
            marginVertical: 70,
          }}
          />

          {/** Sign In Button  */}


          <Button
              onPress={() => navigation.goBack()}
              containerStyle={{
                width: 200,
                marginHorizontal:80,
                marginVertical: -50,
              }}
              title="Already Signed Up? Press here to Login"
              type="clear"
              titleStyle={{ color: "#2089dc" }}
            />
     </SafeAreaView>
   </KeyboardAvoidingView>

  )
}

export default RegisterScreen

const styles = StyleSheet.create({})
import { Text, TextInput, TouchableOpacity, TouchableHighlight, View, StyleSheet, Image, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Icon } from '@rneui/themed'
import { grey } from '@mui/material/colors';





const RegisterScreen = () => {
     const [email,setEmail] = useState("");
     const [password,setPassword] = useState("");
     const [fname,setFname] = useState("");
     const [weight,setWeight] = useState("");
  return (
     <KeyboardAvoidingView style={{ flex: 1,alignItems:'center' }} behavior="padding"> 
     <SafeAreaView>

     {/**  Text*/}
     <View style={{justifyContent:'center', alignItems:"center",marginTop:100}}>
     <Text style={{fontSize:30,fontWeight:'bold'}}>Register</Text>
     <Text style={{fontSize:18,marginTop:8,fontWeight:'bold'}}>Create a New Account</Text>
     </View>
     {/** Input Fields */}



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
          placeholder='body weight in kg' 
          value={weight}
          onChange={(number) => setWeight(number) }
          placeholderTextColor="black"
            />
          </View>























     </SafeAreaView>
   </KeyboardAvoidingView>

  )
}

export default RegisterScreen

const styles = StyleSheet.create({})
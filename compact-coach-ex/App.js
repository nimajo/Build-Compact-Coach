import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import React, {useState} from 'react';

NativeWindStyleSheet.setOutput({
  default: "native",
});
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';


const globalScreenOptions ={
  headerShown:false,
};


function App() {
  
  return (
    <NavigationContainer>
    
      <Stack.Navigator screenOptions={globalScreenOptions}>
       
        
        

        
      <Stack.Screen name="Start" component={StartScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        
        
        
        

        

      


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


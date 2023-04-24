import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from '@rneui/themed';

import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Tab = createMaterialBottomTabNavigator();

NativeWindStyleSheet.setOutput({
  default: "native",
});
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import GraphScreen from './screens/GraphScreen';


const globalScreenOptions ={
  headerShown:false,
};

function Dashboard() {
  return (
    <Tab.Navigator   
    initialRouteName="Dashboard"
    activeColor="#042f66"
    inactiveColor="#3e2465"
    barStyle={{backgroundColor: '#E9663B'}}
    
    
      
    
    >
      <Tab.Screen name="Dashboard" component={HomeScreen} 
      options={{tabBarLabel:"Home", 
      tabBarIcon:({ color }) => (
        <MaterialCommunityIcons name="home" color={color} size={26} />
      ),
      }}/>

      <Tab.Screen name="Graph" component={GraphScreen} 
      options={{
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="chart-timeline-variant-shimmer" color={color} size={26} />
      ),
    }}/>

      <Tab.Screen name="Profile" component={ProfileScreen} 
      options={{
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="account" color={color} size={26} />
      ),
      }}/>

    </Tab.Navigator>
  );
}

function App() {
  
  return (
    <NavigationContainer>
    
      <Stack.Navigator screenOptions={globalScreenOptions}>
       
        
        

        
      <Stack.Screen name="Start" component={StartScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={Dashboard} options={{headerShown:false}}/>
        
        
        
        

        

      


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


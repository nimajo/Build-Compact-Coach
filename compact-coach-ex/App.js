import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { WorkoutContext } from "./Context";
import "react-native-gesture-handler";
const Stack = createNativeStackNavigator();


const Tab = createMaterialBottomTabNavigator();

NativeWindStyleSheet.setOutput({
  default: "native",
});
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import GraphScreen from "./screens/GraphScreen";
import ChatScreen from "./screens/ChatScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import ExerciseScreen from "./screens/ExerciseScreen";
import RestScreen from "./screens/RestScreen";

const globalScreenOptions = {
  headerShown: false,
};

function Dashboard() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor="#10b714"
      inactiveColor="#ffff"
      barStyle={{ backgroundColor: "#5710b7" }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Graph"
        component={GraphScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chart-timeline-variant-shimmer"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wechat" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <WorkoutContext>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Workout"
            component={WorkoutScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Exercise"
            component={ExerciseScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Rest"
            component={RestScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WorkoutContext>
  );
}

export default App;

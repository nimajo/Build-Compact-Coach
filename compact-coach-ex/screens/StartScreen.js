import { Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "@rneui/themed";

const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/** Welcome Text */}
      <View
        style={{marginRight: 8,marginLeft: 8,marginTop: 40,
        }}
      >
        <Text className="flex-row text-center text-lg leading-relaxed font-light dark:text-black tracking-tight">
          Welcome to Compact-Coach, your ultimate fitness partner. Whether
          you're just starting out your fitness journey or looking to take your
          workouts to the next level, we've got you covered. Our app offers
          advanced tracking, personalized reminders, and achievements to help
          you achieve your goals. Lets get started on your path to a healthier,
          stronger you!
        </Text>
      </View>
      {/** Start Button */}
      <Button
        title="Start"
        
        onPress={() => navigation.navigate("Login")}
        accessibilityLabel="Press to Get Started"
        buttonStyle={{
          alignItems: "center",
          backgroundColor: "#5710b7",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
          
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 60,
        }}
        titleStyle={{ fontWeight: "bold", color:"white" }}
      ></Button>
      {/** Illustration Woman */}
      <View
        className="w-full h-full"
        style={{ flex: 1, justifyContent: "flex-end", marginBottom: -15 }}
      >
        <Image
          source={require("../images/Woman2.png")}
          className="h-full w-full"
        />
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;

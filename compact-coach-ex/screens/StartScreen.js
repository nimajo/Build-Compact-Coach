import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "@rneui/themed";

const StartScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Start",
      headerShown: false,
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/** Welcome Text */}
      <SafeAreaView
        style={{
          marginRight: 8,
          marginLeft: 8,
          marginTop: 40,
        }}
      >
        <Text className="flex-row text-center text-lg leading-relaxed font-extralight dark:text-black tracking-tight">
          Welcome to Compact-Coach, your ultimate fitness partner. Whether
          you're just starting out your fitness journey or looking to take your
          workouts to the next level, we've got you covered. Our app offers
          advanced tracking, personalized reminders, and achievements to help
          you achieve your goals. Lets get started on your path to a healthier,
          stronger you!
        </Text>
      </SafeAreaView>

      {/** Start Button */}
      <Button
        title="Start"
        onPress={() => navigation.navigate("Login")}
        buttonStyle={{
          alignItems: "center",
          backgroundColor: "#E9663B",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 60,
        }}
        titleStyle={{ fontWeight: "bold" }}
      ></Button>

      {/** Illustration Woman */}
      <View
        className="w-full h-full"
        style={{ flex: 1, justifyContent: "flex-end", marginBottom: -15 }}
      >
        <Image
          source={require("../images/Woman1.png")}
          className="h-full w-full"
        />
      </View>
    </View>
  );
};

export default StartScreen;

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useNavigation } from "@react-navigation/native";

const RestScreen = () => {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [countdownDuration, setCountdownDuration] = useState(60);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              position: "absolute",
              top: -200,
              textAlign: "center",
              left: 2,
              right: 2,
            }}
            className="text-4xl font-extrabold text-center leading-relaxed"
          >
            Rest Time
          </Text>
          <Text
            style={{
              position: "absolute",
              top: -150,
              textAlign: "center",
              left: 5,
              right: 5,
            }}
            className="text-3xl font-extrabold"
          >
            Take a Break!
          </Text>
        </View>

        {/* Countdown Circle + Pause Button */}
        <View style={{ bottom: -25 }}>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={countdownDuration}
            colors={["#004777", "#3cc8f0", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[13, 10, 6, 3, 0]}
            onComplete={() => navigation.goBack()}
            updateInterval={1}
          >
            {({ remainingTime, color }) => (
              <Text className="font-bold" style={{ fontSize: 40, color }}>
                {remainingTime}
              </Text>
            )}
          </CountdownCircleTimer>

          <TouchableOpacity
            style={styles.pause}
            onPress={() => setIsPlaying((prev) => !prev)}
          >
            <View
              style={{
                flexDirection: "row", //direction of items
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 40,
              }}
            >
              <MaterialCommunityIcons
                style={styles.pauseIcon}
                name="play-pause"
                size={24}
                color="white"
              />
              <Text
                style={styles.pauseText}
                className="text-white font-bold text-center"
              >
                Pause
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pause}
            onPress={() => navigation.goBack()}
          >
            <Text
              className="text-white font-bold text-center"
              style={styles.pauseText}
            >
              Skip Rest
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rest Increaser */}
        <TouchableOpacity
          style={styles.pause}
          onPress={() => {
            setTimeout(() => {
              setCountdownDuration(countdownDuration + 30); //Adds 30 Seconds
            }, 2000);
          }}
        >
          <Text
            className="text-white font-bold text-center"
            style={styles.pauseText}
          >
            Add 30 Seconds
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 8,
  },
  pause: {
    borderRadius: 15,
    padding: 10,
    marginTop: 45,
    backgroundColor: "#2F14B8",
  },
  pauseIcon: {},
  pauseText: {},
});

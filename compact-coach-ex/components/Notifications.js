//
//to use import { createNotificationChannels, sendMotivationalNotification, sendWorkoutSummaryNotification, scheduleNotification } from './components/Notifications.js';
import PushNotification from "react-native-push-notification";
import { useState, useEffect, useContext } from "react";
import { WorkoutComponents } from "../Context";
const { workout, minutes, calories, sessions, setSessions } =
  useContext(WorkoutComponents);
const [totalWeightLoss, setTotalWeightLoss] = useState(0);
const getTotalWeightLoss = async () => {
  //uses the async (local) storage get total weightloss
  try {
    const storedWeightLoss = await AsyncStorage.getItem("totalWeightLoss");
    if (storedWeightLoss !== null) {
      setTotalWeightLoss(JSON.parse(storedWeightLoss));
    }
  } catch (error) {
    // Catch any reading errors
    console.log(error);
  }
};
// Creation of Channels to cateogorize the notifications
PushNotification.createChannel({
  channelId: "motivational-messages-channel",
  channelName: "Motivational Messages for Fitness",
  channelDescription: "Channel for Motivational Fitness Messages",
  playSound: true,
  soundName: "default",
  vibrate: true,
});
PushNotification.createChannel({
  channelId: "workout-stats-channel",
  channelName: "Channel for Workout Statistics",
  channelDescription: "Channel for Weight Loss Updates",
  playSound: true,
  soundName: "default",
  vibrate: true,
});

//so that i can call at different pages
export const sendMotivationalNotification = () => {
  PushNotification.localNotification({
    channelId: "motivational-messages-channel",
    title: "Fitness Motivation",
    message: "Keep pushing your limits! You're doing great.",
  });
};

// TO USE BELOW : sendWorkoutSummaryNotification(calories, totalWeightLoss);
export const sendWorkoutSummaryNotification = (calories, totalWeightLoss) => {
  PushNotification.localNotification({
    channelId: "workout-stats-channel",
    title: "Your Workout Summary",
    message: `You burnt ${calories} calories today! Your total weight loss is ${totalWeightLoss}kg. Keep it up!`,
  });
};

export const scheduleNotification = () => {
  PushNotification.localNotificationSchedule({
    
    date: new Date(Date.now() + 60 * 1000), // This will schedule the notification to appear 1 minute from now
  });
};

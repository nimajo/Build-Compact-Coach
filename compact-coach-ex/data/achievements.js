// achievements.js
//Contains the Achievements
//Set it to workout >= 0 for testing purposes
import { useState, useEffect, useContext } from "react";
import { WorkoutItems } from "../Context";

const useAchievements = () => {
  const { workout, minutes, calories } = useContext(WorkoutItems);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const newAchievements = [];

    if (workout >= 0) {
      newAchievements.push({
        id: 1,
        name: "Workout Beginner",
        description: "You've started your Fitness Journey!",
        image: require("../images/achievement2.png"),
      });
    }

    if (workout > 10) {
      newAchievements.push({
        id: 2,
        name: "Workout Warrior",
        description: "Completed 10+ Workouts!",
        image: require("../images/benchpressman1.png"),
      });
    }

    if (minutes > 10) { 
      newAchievements.push({
        id: 3,
        name: "Time Keeper",
        description: "Workout for more than 10 minutes!",
        image: require("../images/achievement4.png"),
      });
    }

    if (calories > 10) {
      newAchievements.push({
        id: 4,
        name: "Calorie Burner",
        description: "Burn more than 50 calories!",
        image: require("../images/achievement1.png"),
      });
    }

    if (workout > 20) {
      newAchievements.push({
        id: 5,
        name: "Workout Warrior",
        description: "Completed 10+ Workouts!",
        image: require("../images/benchpressman1.png"),
      });
    }

    if (calories > 50) {
      newAchievements.push({
        id: 6,
        name: "Persistence Pioneer",
        description: "You've Burnt over 50 Calories!",
        image: require("../images/dumbbell.png"),
      });
    }

    if (minutes > 15) {
      newAchievements.push({
        id: 7,
        name: "Endurance Enthusiast",
        description: "Workout for more than 15 minutes!",
        image: require("../images/success.png"),
      });
    }
    if (workout >= 20 && minutes >= 15 && calories >= 50) {
      newAchievements.push({
        id: 8,
        name: "Balanced Behemoth",
        description: "You've kept a Balanced Regimen!",
        image: require("../images/dumbbell2.png"),
      });
    }


    if (workout > 50 && minutes > 50 && calories > 50) {
      newAchievements.push({
        id: 9,
        name: "Fitness Conqueror",
        description: "Completed it Mate!",
        image: require("../images/podium.png"),
      });
    }

    setAchievements(newAchievements);
  }, [workout, minutes, calories]);

  return achievements;
};

export default useAchievements;

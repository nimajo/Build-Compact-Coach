// achievements.js
//Contains the Achievements
//Set it to workout == 0 for testing purposes
import { useState, useEffect, useContext } from "react";
import { WorkoutItems } from "../Context";

const useAchievements = () => {
  const { workout, minutes, calories } = useContext(WorkoutItems);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const newAchievements = [];

    if (workout == 0) {
      newAchievements.push({
        id: 1,
        name: "Workout Beginner",
        description: "You've started your Fitness Journey!",
        image: require("../images/achievement2.png"),
      });
    }

    if (minutes == 0) {
      newAchievements.push({
        id: 2,
        name: "Time Keeper",
        description: "Workout for more than 10 minutes",
        image: require("../images/achievement4.png"),
      });
    }

    if (calories == 0) {
      newAchievements.push({
        id: 3,
        name: "Calorie Burner",
        description: "Burn more than 50 calories",
        image: require("../images/achievement1.png"),
      });
    }

    if (workout == 0) {
      newAchievements.push({
        id: 4,
        name: "Calorie Burner",
        description: "Completed 10+ Workouts!",
        image: require("../images/benchpressman1.png"),
      });
    }

    setAchievements(newAchievements);
  }, [workout, minutes, calories]);

  return achievements;
};

export default useAchievements;

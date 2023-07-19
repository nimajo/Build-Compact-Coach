// achievements.js
//Contains the Achievements
//Set it to workout >= 0 for testing purposes
import { useState, useEffect, useContext } from "react";
import { WorkoutComponents } from "../Context";

const useAchievements = () => {
  const { workout, minutes, calories,xp } = useContext(WorkoutComponents);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const newAchievements = [];
    // New Achievement for starting out
    if (workout >= 0) {
      newAchievements.push({
        id: 1,
        name: "Workout Beginner",
        description: "You've started your Fitness Journey!",
        image: require("../images/achievement2.png"),
      });
    }
    // New Achievement for working out 10+ times
    if (workout > 10 ) {
      newAchievements.push({
        id: 2,
        name: "Workout Warrior",
        description: "Completed 10+ Workouts!",
        image: require("../images/benchpressman1.png"),
      });
    }
    // New Achievement for working out for more than 10 minutes
    if (minutes > 10 ) { 
      newAchievements.push({
        id: 3,
        name: "Time Keeper",
        description: "Workout for more than 10 minutes!",
        image: require("../images/achievement4.png"),
      });
    }
    // New Achievement for burning more than 10 kcal
    if (calories > 10 ) {
      newAchievements.push({
        id: 4,
        name: "Calorie Burner",
        description: "Burn more than 50 calories!",
        image: require("../images/achievement1.png"),
      });
    }
// New Achievement for working out for more than 20 times
    if (workout > 20 ) {
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
    //New Achievement for working out for more than 15 minutes
    if (minutes > 15 ) {
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

// New Achievement for working out 50 + times, 50+ minutes and burning more than 100 calories
    if (workout > 50 && minutes > 50 && calories > 50) {
      newAchievements.push({
        id: 9,
        name: "Fitness Conqueror",
        description: "Completed it Mate!",
        image: require("../images/podium.png"),
      });
    }
// New Achievement for working out for more than 30 times
    if (workout > 30) {
      newAchievements.push({
        id: 10,
        name: "Seasoned Sweater",
        description: "Completed 30+ Workouts! You're getting good at this.",
        image: require("../images/achievement5.png"), 
      });
    }

    // New Achievement for burning more than 100 calories
    if (calories > 100) {
      newAchievements.push({
        id: 11,
        name: "Calorie Commander",
        description: "Burn more than 100 calories! Now we're cooking.",
        image: require("../images/achievement6.png"), 
      });
    }

    // New Achievement for working out for more than 30 minutes
    if (minutes > 30) {
      newAchievements.push({
        id: 12,
        name: "Marathon Maven",
        description: "You've worked out for over 30 minutes! What stamina!",
        image: require("../images/excellence.png"), 
      });
    }

    // New Achievement for completing 50 workouts and burning 200 calories
    if (workout > 50 && calories > 200) {
      newAchievements.push({
        id: 13,
        name: "Ultimate Unstoppable",
        description: "50+ Workouts and 200+ calories burnt! You are unstoppable.",
        image: require("../images/workoutbadge1.png"), 
      });
    }
    //New Achievement for gaining over 100 experience
    if (xp > 100) {
      newAchievements.push({
          id: 10,
          name: "XP Collector",
          description: "You've earned over 100 XP! You must've spent alot of time!",
          image: require("../images/calendar.png"),
      });
  }
  
  //New Achievement for gaining over 500 experience
  if (xp > 500) {
      newAchievements.push({
          id: 11,
          name: "XP Master",
          description: "You've earned over 500 XP!",
          image: require("../images/oblique.png"),
      });
  }
  
  //New Achievement for gaining over 1000 experience
  if (xp > 1000) {
      newAchievements.push({
          id: 12,
          name: "XP Legend",
          description: "You've earned over 1000 XP!",
          image: require("../images/competition.png"),
      });
  }

    setAchievements(newAchievements);
  }, [workout, minutes, calories,xp]);

  return achievements;
};

export default useAchievements;

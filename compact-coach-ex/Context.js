import React, { createContext, useState } from "react";

const WorkoutItems = createContext();

const WorkoutContext = ({ children }) => {
  const [completed, setCompleted] = useState([]);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [xp, setXp] = useState(0);
  return (
    <WorkoutItems.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
        sessions,
        setSessions,
        xp,
        setXp,
      }}
    >
      {children}
    </WorkoutItems.Provider>
  );
};

export { WorkoutContext, WorkoutItems };

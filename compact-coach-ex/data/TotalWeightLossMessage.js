// Currently Obselete, Used In Screen Code for Message Due to Import Bugs
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TotalWeightLossMessage = () => {
  const [totalWeightLoss, setTotalWeightLoss] = useState(0);

  useEffect(() => {
    getTotalWeightLoss();
  }, []);

  const getTotalWeightLoss = async () => {
    try {
      const storedWeightLoss = await AsyncStorage.getItem("totalWeightLoss");
      if (storedWeightLoss !== null) {
        setTotalWeightLoss(JSON.parse(storedWeightLoss));
      }
    } catch (e) {
      // Catch any reading errors
      console.log(e);
    }
  };

  if (totalWeightLoss < 0) {
    return <Text> Well Done! You've Lost {-totalWeightLoss} kg!</Text>;
  } else {
    return <Text> You've Gained {+totalWeightLoss} kg!</Text>;
  }
};

export default TotalWeightLossMessage;

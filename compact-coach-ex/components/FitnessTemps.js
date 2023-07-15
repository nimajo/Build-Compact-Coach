import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import fitness from "../data/fitness";
import { useNavigation } from "@react-navigation/native";

const FitnessTemps = () => {
  const FitnessData = fitness;
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.row}>
        {FitnessData.map((item, key) => (
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? 'rgba(0,0,0,0.1)'
                  : 'transparent',
              },
              styles.PressStyle,
            ]}
            key={key}
            onPress={() =>
              navigation.navigate("Workout", {
                image: item.image,
                exercises: item.excersises,
                id: item.id,
              })
            }
          >
            <Image style={styles.PressImage} source={{ uri: item.image }} />
            <Text style={styles.PressText}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};
export default FitnessTemps;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    
  },
  PressStyle: {
    backgroundColor:"white",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingTop: 10,
    paddingBottom:10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 50,
    width: '42.5%',  
  },
  PressImage: {
    width: "100%",
    height: 140,
    borderRadius: 20,
  },
  PressText: {
    position: "absolute",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',  
    top: 20,  
    left: 0, 
    right: 0, 
  },
});

import React, { useState, useEffect } from 'react';
import { ScrollView, Button, TextInput, View, StyleSheet, Dimensions, Keyboard, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { SafeAreaView } from 'react-native';

const GraphScreen = () => {
  const [weight, setWeight] = useState('');
  const [weightEntries, setWeightEntries] = useState([]);

  useEffect(() => {
    getWeights();
  }, []);

  const getWeights = async () => {
    try {
      const storedWeights = await AsyncStorage.getItem('weights');
      if (storedWeights !== null) {
        setWeightEntries(JSON.parse(storedWeights));
      }
    } catch (e) {
      // Catch any reading errors
      console.log(e);
    }
  };
  const storeTotalWeightLoss = async () => {
    try {
      if (weightEntries.length >= 2) {
        let firstWeight = weightEntries[0].weight;
        let lastWeight = weightEntries[weightEntries.length - 1].weight;
        let totalWeightLoss = firstWeight - lastWeight;
  
        await AsyncStorage.setItem('totalWeightLoss', JSON.stringify(totalWeightLoss));
      }
    } catch (e) {
      // Catch any writing errors
      console.log(e);
    }
  };
  
  const storeWeight = async () => {
    try {
      if (weight && !isNaN(weight)) {  // Validation to check if weight is not null and is a number
        let newWeightEntry = { date: moment().format('LL'), weight: parseFloat(weight) };
        let newWeightEntries = [...weightEntries, newWeightEntry];
        await AsyncStorage.setItem('weights', JSON.stringify(newWeightEntries));
        setWeightEntries(newWeightEntries);
        setWeight('');
        Keyboard.dismiss(); // This will dismiss the keyboard

        // Update total weight loss
        if (newWeightEntries.length > 0) {
          let totalWeightLoss = newWeightEntries[newWeightEntries.length - 1].weight - newWeightEntries[0].weight;
          await AsyncStorage.setItem('totalWeightLoss', JSON.stringify(totalWeightLoss));
        } else {
          await AsyncStorage.setItem('totalWeightLoss', JSON.stringify(0));
        }
      } else {
        alert('Please input a valid weight');
      }
    } catch (e) {
      // Catch any writing errors
      console.log(e);
    }
  };

  const removeWeight = async (index) => {
    try {
      let newWeightEntries = [...weightEntries];
      newWeightEntries.splice(index, 1);
      await AsyncStorage.setItem('weights', JSON.stringify(newWeightEntries));
      setWeightEntries(newWeightEntries);
  
      // Update total weight loss
      if (newWeightEntries.length > 0) {
        let totalWeightLoss = newWeightEntries[newWeightEntries.length - 1].weight - newWeightEntries[0].weight;
        await AsyncStorage.setItem('totalWeightLoss', JSON.stringify(totalWeightLoss));
      } else {
        await AsyncStorage.setItem('totalWeightLoss', JSON.stringify(0));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [totalWeightLoss, setTotalWeightLoss] = useState(0);

useEffect(() => {
  getTotalWeightLoss();
}, []);

const getTotalWeightLoss = async () => {
  try {
    const storedWeightLoss = await AsyncStorage.getItem('totalWeightLoss');
    if (storedWeightLoss !== null) {
      setTotalWeightLoss(JSON.parse(storedWeightLoss));
    }
  } catch (e) {
    // Catch any reading errors
    console.log(e);
  }
};

  
  const chartData = {
    labels: weightEntries.map(entry => entry.date),
    datasets: [{
      data: weightEntries.map(entry => entry.weight || 0), // provide a default of 0 for null values
    }]
  };
  const [numEntries, setNumEntries] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      
            {/* Enter Weight Input */}
            <TextInput
              style={styles.input}
              onChangeText={setWeight}
              value={weight}
              keyboardType='numeric'
              placeholder='Enter your weight'
              placeholderTextColor='white'
              accessibilityLabel="Enter Your Weight Here"
            />
            
            {/* Submit Weight Button */}
            <TouchableOpacity style={styles.button} onPress={storeWeight}>
              <Text style={styles.buttonText}
              accessibilityLabel="Type your message and use this button to submit">
                Submit Weight
                </Text>
            </TouchableOpacity>
      
            

{/* buttons with weight, press to remove */}
      <ScrollView>
        {weightEntries.map((entry, index) => (
          <TouchableOpacity key={index} onPress={() => removeWeight(index)} accessibilityLabel="Tap to Remove Entries"> 
            <Text style={styles.entryText}>{`Date: ${entry.date}, Weight: ${entry.weight}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* LineGraph */}
      {weightEntries.length > 0 && (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 16} //Uses device width and height
          height={Dimensions.get('window').height - 300}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            decimalPlaces: 2, 
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, //Uses different shades of green
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      )}

      
    
            
    </SafeAreaView>



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E2923', // This is the background color of the graph
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
     // Meant to be white
    backgroundColor: '#08130D', // Same as the lighter color of the graph
    borderRadius: 8, // rounded button
    paddingHorizontal: 10, // added some padding to the text input
    color:"white"
  },
  button: {
    backgroundColor: '#2F14B8',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#Ffffff',
  },
  entryButton: {
    borderRadius: 8,
    margin: -30,
    padding: 2,
  },
  entryText: {
    color: '#Ffffff',
    backgroundColor: '#2F14B8',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
    textAlign: 'center',
  },
});

export default GraphScreen;
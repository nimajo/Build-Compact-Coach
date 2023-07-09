import React, { useState, useEffect } from 'react';
import { ScrollView, Button, TextInput, View, StyleSheet, Dimensions, Keyboard, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

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

  const storeWeight = async () => {
    try {
      let newWeightEntry = { date: moment().format('LL'), weight: parseFloat(weight) };
      let newWeightEntries = [...weightEntries, newWeightEntry];
      await AsyncStorage.setItem('weights', JSON.stringify(newWeightEntries));
      setWeightEntries(newWeightEntries);
      setWeight('');
      Keyboard.dismiss(); // This will dismiss the keyboard
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
    } catch (e) {
      // Catch any writing errors
      console.log(e);
    }
  };
  
  const chartData = {
    labels: weightEntries.map(entry => entry.date),
    datasets: [{
      data: weightEntries.map(entry => entry.weight),
    }]
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setWeight}
        value={weight}
        keyboardType='numeric'
        placeholder='Enter your weight'
      />
      <TouchableOpacity style={styles.button} onPress={storeWeight}>
        <Text style={styles.buttonText}>Submit Weight</Text>
      </TouchableOpacity>
      <ScrollView>
        {weightEntries.map((entry, index) => (
          <TouchableOpacity key={index} onPress={() => removeWeight(index)}>
            <Text style={styles.entryText}>{`Date: ${entry.date}, Weight: ${entry.weight}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {weightEntries.length > 0 && (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 16}
          height={Dimensions.get('window').height - 300}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E2923', // This is the background color of the graph
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    color: '#Ffffff', // Changed the text color to white for better visibility on the dark background
    backgroundColor: '#08130D', // Same as the lighter color of the graph
    borderRadius: 8, // Optional, added some rounding to the text input
    paddingHorizontal: 10, // Optional, added some padding to the text input
  },
  button: {
    backgroundColor: '#08130D',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#Ffffff',
  },
  entryText: {
    color: '#Ffffff',
    backgroundColor: '#08130D',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
    textAlign: 'center',
  },
});

export default GraphScreen;

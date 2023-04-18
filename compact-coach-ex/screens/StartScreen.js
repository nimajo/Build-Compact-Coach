import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native'

import { Button } from '@rneui/themed';



const StartScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:"Start",
            headerShown:false,
        });
    }, []);
 
    return (
        <SafeAreaView style={{ flex: 1 }}>
        


            

            {/** Header */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Text className="text-base">
                    
                </Text>
            </View>

            {/** Welcome Text */}
            <Text className="flex-row text-center text-lg leading-relaxed font-extralight dark:text-black tracking-tight">
                Welcome to Compact-Coach, your ultimate fitness partner. 
                Whether you're just starting out your fitness journey or looking to take your workouts to the next level,
                we've got you covered. Our app offers advanced tracking, personalized reminders,
                and achievements to help you achieve your goals.
                Lets get started on your path to a healthier,
                stronger you!
            </Text>







            
            <Button
              title="Start"
              onPress={() => navigation.navigate('Login')}
              buttonStyle={{
                backgroundColor: '#E9663B',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 100,
                marginVertical: 60,
              }}
              titleStyle={{ fontWeight: 'bold' }}></Button>
              








            {/** Illustration */}
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Image source={require("../images/Woman1.png")} className="mx-auto flex justify-center " />

            </View>


            
        </SafeAreaView>
    )
}


export default StartScreen

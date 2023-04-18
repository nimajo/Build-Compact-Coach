import { Button, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native'

const LoginScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:"Login",
            headerShown:true,
        });
    }, []);
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  )
}

export default LoginScreen


import { Text, TextInput, View, StyleSheet, Image, KeyboardAvoidingView,} from 'react-native'
import React, {useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Icon } from '@rneui/themed'


const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={{ flex: 1,alignItems:'center',marginTop:300 }} behavior="padding"> 
    <Text className="text-red-500">HOME SCREEN </Text>

    <Text>Test Test</Text>



    </KeyboardAvoidingView>
  )
}

export default HomeScreen
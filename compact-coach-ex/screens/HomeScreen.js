import { Text, TextInput, View, StyleSheet, Image, KeyboardAvoidingView,} from 'react-native'
import React, {useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Icon } from '@rneui/themed'


const HomeScreen = () => {
  const navigation = useNavigation();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 
  return (
    <KeyboardAvoidingView style={{ flex: 1,alignItems:'center',marginTop:300 }} behavior="padding"> 
 
    </KeyboardAvoidingView>
  )
}

export default HomeScreen
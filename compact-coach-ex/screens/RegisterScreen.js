import { Text, TextInput, TouchableOpacity, TouchableHighlight, View, StyleSheet, Image, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Icon } from '@rneui/themed'
import { grey } from '@mui/material/colors';





const RegisterScreen = () => {
  return (
   <KeyboardAvoidingView>














            {/** Illustration Border */}
            <View className="w-full h-full"
            style={{ flex: 1, justifyContent: 'flex-end', position:'absolute', }}>
            <Image style={{ flex: 1, justifyContent: 'flex-end', position:'absolute', }}
            source={require("../images/Path1x.png")} 
            className="object-contain h-48 w-full position absolute"/>
            </View>


   </KeyboardAvoidingView>

  )
}

export default RegisterScreen

const styles = StyleSheet.create({})
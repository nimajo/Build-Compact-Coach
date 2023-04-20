import { Text, TextInput, View, StyleSheet, Image, KeyboardAvoidingView,} from 'react-native'
import React, {useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Icon } from '@rneui/themed'






const LoginScreen = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 
  React.useEffect(() => {console.log('mount'); return () => console.log('unmount')},[]);
    const navigation = useNavigation();

  
    

    const signIn = () => {

    };

    const gotoRegister = () => {
      navigation.push('Register')};
    

  return (

    <KeyboardAvoidingView style={{ flex: 1}}> 
    <View style={{ flex: 1,alignItems:'center' }} behavior="padding">
      
      {/** Sign In Text*/}
    <View style={{justifyContent:'center', alignItems:"center",marginTop:100}}>
      <Text style={{fontSize:30,fontWeight:'bold'}}>Sign In</Text>

      <Text style={{fontSize:18,marginTop:8,fontWeight:'bold'}}>Welcome Back to Compact-coach</Text>

    </View>



      {/** Input Fields */}

      <SafeAreaView style={{marginTop:50}}>

        <View style={{flexDirection:"row",alignItems:"center"}}>


        <Icon type='font-awesome' name= "user-o" size={24}/>
        <TextInput 
        style={{
          borderBottomWidth:1,
          borderBottomColor:"gray",
          width:300,marginVertical:10,
          marginLeft:10,
          fontSize:email ? 18 : 18,
          
        }}
        placeholder='Email' 
        value={email}
        onChangeText={(text) => setEmail(text) }
        placeholderTextColor="black"
        />
        </View>

        <SafeAreaView style={{flexDirection:"row",alignItems:"center"}}>

        <Icon type='font-awesome' name= "unlock" size={24}/>
        <TextInput 
        style={{
          borderBottomWidth:1,
          borderBottomColor:"gray",
          width:300,marginVertical:30,
          marginLeft:10,
          fontSize:password ? 18 : 18,
        }}
        placeholder='Password' 
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        placeholderTextColor="black"
        />  
        </SafeAreaView>    
        



       
        
        <Button 
              onPress={signIn}
              title="Login"
              icon={{
                name: 'arrow-right',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: '#E9663B',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 80,
                marginVertical: 70,
              }}
            />

        <Button
              onPress={() => navigation.navigate('Register')}
              containerStyle={{
                width: 200,
                marginHorizontal:80,
                marginVertical: -50,
              }}
              title="Dont Have an account? Press Here to sign up"
              type="clear"
              titleStyle={{ color: "#2089dc" }}
            />
        
        
        
        
        
        
        
        
        
        </SafeAreaView> 



      






























            {/** Illustration Border */}
            <View className="w-full h-full"
            style={{ flex: 1, justifyContent: 'flex-end', position:'absolute', }}>
            <Image style={{ flex: 1, justifyContent: 'flex-end', position:'absolute', }}
            source={require("../images/Path1x.png")} 
            className="object-contain h-48 w-full position absolute"/>
            </View>





    </View>
    </KeyboardAvoidingView> 
  )
}





export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer:{
    marginTop:250,
    
    },

  titleContainer:{

  },  
});
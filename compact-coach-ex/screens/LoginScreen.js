import {
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Icon } from "@rneui/themed";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, } from "../firebase";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  {
    /** State Observer which logs user in */
  }
  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.push("Home");
      }
    });
    return unsubscribe;
  }, []);

  {
    /** Login Backend*/
  }
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user credential", userCredential);
        const user = userCredential.user;
        console.log("user details", user);
      })
      .catch((error) => {
        setError("Invalid Email or Password");
      });
  };

  const gotoRegister = () => {
    navigation.push("Register");
  };

  return (
    <SafeAreaView>
      {loading ? (
        <View>
          {/* Loading Text */}
          <Text style={{ flex: 1, alignContent: "center" }}>Loading</Text>
          <ActivityIndicator size="large" color={"red"}></ActivityIndicator>
        </View>
      ) : (
        <View></View>
      )}
      <KeyboardAvoidingView style={{ alignItems: "center" }}>
        {/** Error Text*/}
        {error ? (
          <Text style={{ color: "red", position: "absolute", top: 420 }}>
            {error}
          </Text>
        ) : null}

        {/** Sign In Text*/}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Sign In</Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "bold" }}>
            Welcome Back to Compact-Coach
          </Text>
        </View>

        {/** Input Fields */}

        <View style={{ marginTop: 50 }}>
          {/** Email field */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Icon type="font-awesome" name="envelope-o" size={24} />
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 10,
                marginLeft: 10,
                fontSize: email ? 18 : 18,
              }}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="black"
            />
          </View>

          {/** Password field */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon type="font-awesome" name="unlock" size={24} />
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 30,
                marginLeft: 10,
                fontSize: password ? 18 : 18,
              }}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              placeholderTextColor="black"
            />
          </View>

          {/** Login Button */}
          <Button
            onPress={login}
            title="Login"
            accessibilityLabel="Press here to log in"
            icon={{
              name: "arrow-right",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconRight
            iconContainerStyle={{ marginLeft: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "#5710b7",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 80,
              marginVertical: 70,
            }}
          />

          {/** Register Button*/}
          <Button
            onPress={() => navigation.navigate("Register")}
            containerStyle={{
              width: 200,
              marginHorizontal: 80,
              marginVertical: -50,
            }}
            title="Dont Have an account? Press Here to sign up"
            accessibilityLabel="Press here to register for an account"
            type="clear"
            titleStyle={{ color: "#2089dc" }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 250,
  },

  titleContainer: {},
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#E9663B",
  },
});

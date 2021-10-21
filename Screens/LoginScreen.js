import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { app } from "../firebase";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const login = () => {
    setButtonClicked(true);
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        navigation.replace("Home");
      })
      .catch((error) => {
        alert(error.message);
        setButtonClicked(false);
      });
  };
  useEffect(()=>{
    const unsubscribe=app.auth().onAuthStateChanged(authUser=>{
      try{
        if(authUser){
          navigation.replace("Home")
        }
      }
      catch(e){
        console.log(e)
      }
    })
    return unsubscribe;
  },[])
  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        leftIcon={{ type: "font-awesome", name: "envelope-o" }}
        leftIconContainerStyle={{ marginLeft: 0 }}
        inputContainerStyle={{ borderBottomColor: "#5AC8FA" }}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        leftIcon={{ type: "font-awesome", name: "lock" }}
        leftIconContainerStyle={{ marginLeft: 0 }}
        inputContainerStyle={{ borderBottomColor: "#5AC8FA" }}
      />
      <Button
        type="solid"
        containerStyle={styles.button}
        title="Login"
        onPress={login}
        disabled={buttonClicked ? true : false}
      />
      <Button
        type="clear"
        title="Sign Up"
        onPress={() => {
          navigation.replace("SignUp");
        }}
        containerStyle={{ shadowRadius: 0, marginTop: 10 }}
        disabled={buttonClicked ? true : false}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 180,
    marginTop: 10,
  },
});

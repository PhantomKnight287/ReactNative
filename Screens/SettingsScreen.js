import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { app } from "../firebase";

const SettingsScreen = ({ navigation }) => {
  const buttonClickHandler = () => {
    app
      .auth()
      .signOut()
      .then(() => {
        navigation.pop(1);
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const sendUserToUpdateProfile = () => {
    navigation.navigate("Update Profile");
  };
  return (
    <View style={styles.view}>
      <Button
        containerStyle={styles.button}
        onPress={sendUserToUpdateProfile}
        title="Update Profile"
        type="solid"
      />
      <Button
        containerStyle={styles.button}
        title="Logout"
        type="outline"
        onPress={buttonClickHandler}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
  },
  button: {
    flex: 1,
    margin: 10,
  },
});

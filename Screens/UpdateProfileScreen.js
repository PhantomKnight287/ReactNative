import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, KeyboardAvoidingView } from "react-native";
import { Button, Input } from "react-native-elements";
import { app } from "../firebase";
const UpdateProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const updateUserProfile = () => {
    app
      .auth()
      .currentUser.updateProfile({
        displayName: userName,
        photoURL: photoUrl,
      })
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    setUserName(app.auth().currentUser.providerData[0].displayName);
    setPhotoUrl(app.auth().currentUser.providerData[0].photoURL);
  }, []);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Input
        placeholder="Name"
        leftIcon={{ type: "font-awesome", name: "user" }}
        leftIconContainerStyle={{ marginLeft: 0 }}
        inputContainerStyle={{ borderBottomColor: "#5AC8FA" }}
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <Input
        placeholder="Photo Url (Optional)"
        leftIcon={{ type: "font-awesome", name: "user" }}
        leftIconContainerStyle={{ marginLeft: 0 }}
        inputContainerStyle={{ borderBottomColor: "#5AC8FA" }}
        value={photoUrl}
        onChangeText={(text) => setPhotoUrl(text)}
      />
      <Button
        title="Update Profile"
        type="solid"
        containerStyle={{ margin: 20 }}
        onPress={updateUserProfile}
      />
    </KeyboardAvoidingView>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

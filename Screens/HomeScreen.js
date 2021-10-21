import React, { useEffect, useState, useLayoutEffect, createRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { ListItem } from "react-native-elements";
import { app, db } from "../firebase";
import { Avatar, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import firebase from "firebase";
const HomeScreen = ({ navigation }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [messages, setAllMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const scrollRef = createRef();
  const [visible,setVisible]=useState(false);
  const sendMessage = () => {
    if (messageContent.length > 0) {
      db.collection("messages").add({
        user: app.auth().currentUser.uid,
        content: messageContent,
        createdAt: new Date(),
        userName: app.auth().currentUser.providerData[0].displayName,
        photoUrl: app.auth().currentUser.providerData[0].photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setMessageContent("");
    }
  };

  const openUrl = async (uri) => {
    const result = await WebBrowser.openBrowserAsync(uri);
  };

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setAllMessages(snapshot.docs.map((doc) => doc.data()));
      });
    !app.auth().currentUser && navigation.replace("Login");
    if (app.auth().currentUser) {
      setPhotoUrl(app.auth().currentUser.providerData[0].photoURL);
    }
  }, [app.auth().currentUser]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <View>
            <Avatar
              source={{
                uri: photoUrl
                  ? photoUrl
                  : "https://cdn.dribbble.com/users/528264/screenshots/3140440/media/5f34fd1aa2ebfaf2cd548bafeb021c8f.png?compress=1&resize=400x300",
              }}
            />
          </View>
        );
      },
      headerRight: () => {
        return (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => openUrl("https://github.com/PhantomKnight287")}
            >
              <AntDesign name="github" size={24} color="black" />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>{
              navigation.push('New Chat')
            }} >
              <FontAwesome
                style={{ marginLeft: 10 }}
                name="pencil-square-o"
                size={30}
                color="black"
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                navigation.push("Settings");
              }}
            >
              <Ionicons
                name="md-settings-sharp"
                size={25}
                style={{ marginLeft: 10 }}
                color="black"
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerTitleAlign: "center",
      title: "",
    });
  }, [app.auth().currentUser]);
  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView style={styles.container} ref={scrollRef}>
        {messages.length > 0 ? (
          messages.map((message, index) => {
            return (
              <View style={styles.message} key={index}>
                <ListItem key={index} style={{ width: "100%" }}>
                  <Avatar
                    source={{
                      uri: message.photoUrl
                        ? message.photoUrl
                        : "https://cdn.dribbble.com/users/528264/screenshots/3140440/media/5f34fd1aa2ebfaf2cd548bafeb021c8f.png?compress=1&resize=400x300",
                    }}
                    rounded
                  />
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text>{message.userName}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      <Text style={styles.text}>{message.content}</Text>
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </View>
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: "#f1f1f1",
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" hidesWhenStopped={true} />
            {/* <Text>No Messages to Display, Send One First</Text> */}
          </View>
        )}
        <Input
          placeholder="Send Message"
          containerStyle={styles.input}
          onSubmitEditing={sendMessage}
          value={messageContent}
          onChangeText={(text) => setMessageContent(text)}
          leftIcon={{ type: "font-awesome", name: "comment", color: "#000000" }}
          style={{position:"relative"}}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  message: {
    flexDirection: "row",
  },
});

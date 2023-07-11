import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, db } from '../firebase';
import { collection, onSnapshot, addDoc, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Alert } from 'react-native';
const ChatScreen = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      await addDoc(collection(db, "messages"), {
        text: input,
        timestamp: new Date(),
        uid: user.uid,
        displayName: user.displayName,
      });

      setInput("");
    }
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Compact-Coach Chatroom</Text>
        <Text style={styles.subtitle}>Have Fun Chatting !</Text>
      </View>
      <ScrollView style={styles.main}>
        {messages.map(({ id, data }) => (
          <View key={id} style={data.uid === user.uid ? styles.sent : styles.received}>
            <Text style={styles.displayName}>{data.displayName}: </Text>
            <Text style={styles.messageText}>{data.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput 
          style={styles.input} 
          value={input} 
          onChangeText={setInput} 
          placeholder="Type a message" 
        />
        <Button title="Send" 
        onPress={sendMessage} 
       
        color="#2F14B8"
        accessibilityLabel="Type your message and use this button to submit"
        
         />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  main: {
    flex: 1,
    padding: 10
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  displayName: {
    fontWeight: 'bold'
  },
  messageText: {

  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginRight: 10
  }
});

export default ChatScreen;

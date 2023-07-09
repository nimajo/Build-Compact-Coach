import React, { useState, useEffect, SafeAreaView } from 'react';
import { Text, View, FlatList, TextInput, Button } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, collection, addDoc, onSnapshot, orderBy, query } from '@firebase/firestore';


const ChatScreen = () => {
  const user = auth.currentUser;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef); // <-- fetch from server
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting profile data: ", error);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedMessages = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setMessages(fetchedMessages);
    });

    return unsubscribe;
  }, []);

  const handleSendMessage = async () => {
    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        timestamp: Date.now(),
        uid: user.uid,
      });
      setNewMessage('');
    } catch (error) {
      console.log('Failed to send message: ', error);
    }
  };

  return (
    <SafeAreaView style={{ flex:1}}>
      <View>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <Text>{item.text}</Text>
          )}
          keyExtractor={(item) => item.id}
        />
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message"
        />
        <Button
          onPress={handleSendMessage}
          title="Send"
        />

      </View>
    </SafeAreaView>
  );
}

export default ChatScreen;

// Importing necessary libraries and hooks
import { useState, useCallback } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

export default function useProfilePicture(storage, db, auth) {
    // State to hold the URL of the profile picture
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);

    // Function to upload profile picture to firebase storage
    const uploadProfilePicture = async (uri, uid) => {
        
        const response = await fetch(uri); // Fetching the image file from the uri
        
        const blob = await response.blob(); // Converting the image file to blob format for firebase storage

        
        const fileRef = ref(storage, `profile_pictures/${uid}`); // Creating a reference for the image file in firebase storage

        try {
            // Uploading the blob to firebase storage
            await uploadBytes(fileRef, blob);
            // Getting the download URL of the uploaded image
            const url = await getDownloadURL(fileRef);
            return url;
        } catch (e) {
            
            console.error(e);
            return null;
        }
    };

    // Function to update the user document in firebase firestore with the profile picture url
    const updateProfileWithPicture = async (uid, url) => {
        // Creating a reference for the user document in firebase firestore
        const userRef = doc(db, "users", uid);
        try {
            // Updating the user document with the profile picture url
            await updateDoc(userRef, { profilePicture: url });
        } catch (e) {
            
            console.error(e);
            throw e;
        }
    };

    const fetchProfilePicture = useCallback(async () => {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
  
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setProfilePictureUrl(userData.profilePicture);
        }
      }, [db, auth.currentUser.uid]);
  
      useFocusEffect(
        useCallback(() => {
          fetchProfilePicture();
        }, [fetchProfilePicture])
      );
    // Function to handle the change of profile picture by the user
    const onChangeProfilePicture = async () => {
        // Opening the image library for the user to select an image
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        // Checking if the user has not cancelled the image picker
        if (!result.canceled) {
            try {
                // Uploading the selected image to firebase storage and getting its url
                const url = await uploadProfilePicture(result.assets[0].uri, auth.currentUser.uid);
                // Updating the user document with the new profile picture url
                await updateProfileWithPicture(auth.currentUser.uid, url);
                // Setting the profile picture url state with the new url
                setProfilePictureUrl(url);
                Alert.alert("Successfully Changed Profile Picture");
            } catch (e) {
                // Logging any errors that occur during the process and alerting the user
                console.error(e);
                Alert.alert("Error : Failed to Change Profile Picture.");
            }
        }
    };

    
    return { profilePictureUrl, onChangeProfilePicture, fetchProfilePicture };
}

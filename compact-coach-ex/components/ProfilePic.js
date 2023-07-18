// hooks/useProfilePicture.js
import { useState } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';

export default function useProfilePicture(storage, db, auth) {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const uploadProfilePicture = async (uri, uid) => {
    const response = await fetch(uri);
    const blob = await response.blob();
  
    const fileRef = ref(storage, `profile_pictures/${uid}`);
    
    try {
      await uploadBytes(fileRef, blob);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  
  
  const updateProfileWithPicture = async (uid, url) => {
    const userRef = doc(db, "users", uid);
    try {
      await updateDoc(userRef, { profilePicture: url });
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onChangeProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const url = await uploadProfilePicture(result.assets[0].uri, auth.currentUser.uid);
        await updateProfileWithPicture(auth.currentUser.uid, url);
        setProfilePictureUrl(url);
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'Failed to update profile picture.');
      }
    }
  };

  return { profilePictureUrl, onChangeProfilePicture };
}

import { View, Text, Alert } from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";

import { firebase } from "../firebase";
import getDeviceId from "./GetDeviceId";

const GetLocation = () => {
  const [location, setLocation] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    // Get or generate a unique device ID
    getDeviceId().then((id) => setDeviceId(id));
  }, []);

  useEffect(() => {
    const updateLocation = async () => {
      try {
        // Get the user's current location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);

        // Send the location to Firebase, including the device ID
        const { latitude, longitude } = loc.coords;
        const docRef = firebase.firestore().collection("devices").doc(deviceId);
        await docRef.set({
          latitude: latitude,
          longitude: longitude,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } catch (error) {
        console.log("Error getting location:", error);
        Alert.alert("There is problem in getting your device location ");
        // Set an error message or perform some other error handling
      }
    };

    if (deviceId) {
      // Update the location every 3 seconds
      const intervalId = setInterval(() => {
        updateLocation();
      }, 3000);

      // Cleanup function to clear the interval
      return () => clearInterval(intervalId);
    }
  }, [deviceId]);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default GetLocation;

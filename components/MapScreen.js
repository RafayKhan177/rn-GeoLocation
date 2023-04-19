import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { firebase } from "../firebase";

const MapScreen = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Listen for updates to the devices collection in Firebase
    const devicesRef = firebase.firestore().collection("devices");
    const unsubscribe = devicesRef.onSnapshot(
      (snapshot) => {
        const updatedDevices = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDevices(updatedDevices);
      },
      (error) => {
        console.error("Error getting devices:", error);
      }
    );

    // Stop listening for updates when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {devices.map((device) => (
          <Marker
            key={device.id}
            coordinate={{
              latitude: device.latitude,
              longitude: device.longitude,
            }}
            title={device.id}
            description={
              device.timestamp && device.timestamp instanceof Date
                ? `Last updated: ${firebase.firestore.Timestamp.fromDate(
                    device.timestamp
                  )
                    .toDate()
                    .toString()}`
                : ""
            }
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GetLocation from "../components/GetLocation";
import MapScreen from "../components/MapScreen";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <GetLocation />
      <MapScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;

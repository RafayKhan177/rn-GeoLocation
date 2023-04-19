import React from "react";
import { Marker } from "react-native-maps";

const LocationItem = ({ location }) => {
  const { latitude, longitude } = location;
  return (
    <Marker coordinate={{ latitude, longitude }}>
    </Marker>
  );
};

export default LocationItem;

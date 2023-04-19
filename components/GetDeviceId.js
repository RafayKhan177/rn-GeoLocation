import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

// Get or generate a unique device ID and store it in AsyncStorage
const getDeviceId = async () => {
  let deviceId = await AsyncStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = uuidv4();
    await AsyncStorage.setItem("deviceId", deviceId);
  }
  console.log(deviceId);
  return deviceId;
};
export default getDeviceId;

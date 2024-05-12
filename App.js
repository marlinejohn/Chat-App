// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
import { useEffect } from 'react';

import { useNetInfo }from '@react-native-community/netinfo';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

import { Alert, LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDdQ1OvYBre6C8wxbWup8_0yfbL7ZranC8",
    authDomain: "chat-app-a2c8c.firebaseapp.com",
    projectId: "chat-app-a2c8c",
    storageBucket: "chat-app-a2c8c.appspot.com",
    messagingSenderId: "205023329360",
    appId: "1:205023329360:web:807ed5bf9382a74d7c6555"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const connectionStatus = useNetInfo();

useEffect(() => {
  if (connectionStatus.isConnected === false) {
    Alert.alert("Connection lost!");
    disableNetwork(db);
  } else if (connectionStatus.isConnected === true) {
    enableNetwork(db);
  }
}, [connectionStatus.isConnected]);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
           name="Start"
           component={Start}
        />
        <Stack.Screen name="Chat">
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props}  />}
        </Stack.Screen>
      </Stack.Navigator>  
      </NavigationContainer>
  );
}


export default App;

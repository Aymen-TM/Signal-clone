import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import { Avatar, NativeBaseProvider } from 'native-base';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { auth } from './firebase';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import { AuthProvider } from './firebase/AuthProvider';
import Routes from './navigation/Routes';


const stack = createStackNavigator();



const globalScreenOptions = {
  headerStyle: {
    backgroundColor: '#2C6BED',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    color:"white"
  },
  gestureEnabled: true,
}

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}


import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import { NativeBaseProvider } from 'native-base';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';


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
      <NavigationContainer>
        <stack.Navigator screenOptions={globalScreenOptions}>
          <stack.Screen name="LoginScreen" component={LoginScreen} options={{title:'Login'}} />
          <stack.Screen name="RegisterScreen" component={RegisterScreen} options={{title:'Register'}}  />
          <stack.Screen name="HomeScreen" component={HomeScreen} options={{
            title:'Home',
            }} />
        </stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


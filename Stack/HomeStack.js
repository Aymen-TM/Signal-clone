import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddChatScreen from '../screens/AddChatScreen';
import ChatScreen from '../screens/ChatScreen';
const Stack = createStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forFadeFromBottomAndroid}}>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
      />
      <Stack.Screen name='AddChatScreen' component={AddChatScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
    </Stack.Navigator>
  );
}
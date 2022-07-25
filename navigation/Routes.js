import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { auth } from "../firebase";
import { AuthContext } from "../firebase/AuthProvider";
import AuthStack from "../Stack/AuthStack";
import HomeStack from "../Stack/HomeStack";

export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    // Handle user state changes
    function onauthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
      setLoading(false);
    }


    useEffect(() => {
      const subscriber = onAuthStateChanged(auth,onauthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    if (loading) {
      return <Text>loading...</Text>;
    }
    return (
      <NavigationContainer>
        {user ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }
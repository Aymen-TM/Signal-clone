import 'react-native-gesture-handler'
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './firebase/AuthProvider';
import Routes from './navigation/Routes';



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


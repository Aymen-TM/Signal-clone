import {KeyboardAvoidingView, StyleSheet, View} from 'react-native'
import React, { useEffect } from 'react'
import {Button, Image, Input, VStack,} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'





const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const submitHandler = () => {
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
          if(authUser){
            navigation.replace('HomeScreen')
          }else{
            navigation.replace('LoginScreen')
          } 
        });
        return () => unsubscribe()
      }, [navigation])



    const nav_RegisterScreen = () => {
        navigation.navigate('RegisterScreen')
    }
    

  return (
    <KeyboardAvoidingView behavior='padding' flex={1} keyboardVerticalOffset={-200}    >
        <StatusBar style='light' />
        <VStack flex="1" width={"full"} justifyContent={'center'}  alignItems={'center'} >
            <Image source={require('../assets/signal-logo.png')} style={{width: 150, height: 150}} alt="Signal Logo"/>
            <VStack marginTop={5} width={300} space={5}>
                <Input placeholder="Email" textContentType='emailAddress' size={"lg"} value={email} onChangeText={(text)=>setEmail(text)} />
                <Input placeholder="Password" textContentType='password' size={"lg"} value={password} onChangeText={(text)=>setPassword(text)} />
            </VStack>
            <VStack marginTop={5} width={200} space={5}>
                <TouchableOpacity onPress={()=>submitHandler()}>
                    <Button backgroundColor={"#2C6BED"}>Login</Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>nav_RegisterScreen()} activeOpacity={0.9}>
                    <Button variant={"outline"} _text={{color:"#2C6BED"}} >Register</Button>
                </TouchableOpacity>
            </VStack>
        </VStack>
        <View style={{height: 20}} />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})
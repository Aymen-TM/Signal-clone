import { StyleSheet,KeyboardAvoidingView, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Button, Heading, Input,VStack } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'




const RegisterScreen = ({navigation}) => {
    const [fullname, setFullname] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [imgUrl, setimgUrl] = React.useState('')


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

const  Register = async  ()=>{
  if(password !== confirmPassword){
    Alert.alert('Password does not match')
    return
  }else{
    createUserWithEmailAndPassword(auth, email, password).then((userData) => {
      updateProfile(auth,{
          displayName: fullname,
          email: email,
          photoURL: imgUrl || require("../assets/imgPlacehodler.jpg")
      })
     }).catch((error) => {
      Alert.alert(error.message)
     })
  }
 

   
}
    



  return (
    <KeyboardAvoidingView behavior='padding' flex={1} keyboardVerticalOffset={-200} >
        <VStack flex={1} alignItems={'center'} justifyContent={'center'} space={5} >
            <Heading>Create a Signal account</Heading>
            <VStack marginTop={5} width={300} space={5}>
            <Input placeholder="Full Name" textContentType='givenName' size={"lg"} value={fullname} onChangeText={(text)=>setFullname(text)} />
            <Input placeholder="Email" textContentType='emailAddress' size={"lg"} value={email} onChangeText={(text)=>setEmail(text)} />
            <Input placeholder="Password" type='password' textContentType='password' size={"lg"} value={password} onChangeText={(text)=>setPassword(text)} />
            <Input placeholder="Password confirmation" type='password' textContentType='password' size={"lg"} value={confirmPassword} onChangeText={(text)=>setConfirmPassword(text)} />
        </VStack>
        <VStack width={200}>
          <TouchableOpacity onPress={()=>Register()} activeOpacity={0.8}>
            <Button  backgroundColor={"#2C6BED"}>Register</Button>
          </TouchableOpacity>
        </VStack>
        </VStack>
        
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})
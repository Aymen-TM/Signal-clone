import { StyleSheet,KeyboardAvoidingView, Alert } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Button, Heading, Input,VStack } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { AuthContext } from '../firebase/AuthProvider'




const RegisterScreen = ({navigation}) => {
    const [fullname, setFullname] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [imgUrl, setimgUrl] = React.useState('')


    const { register } = useContext(AuthContext);

    
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
          <TouchableOpacity onPress={()=>register(email, password,fullname,null)} activeOpacity={0.8}>
            <Button  backgroundColor={"#2C6BED"}>Register</Button>
          </TouchableOpacity>
        </VStack>
        </VStack>
        
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})
import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Icon, Input, VStack } from 'native-base'
import {AntDesign} from '@expo/vector-icons'
import {onSnapshot, collection, addDoc  } from "firebase/firestore"
import { auth, db } from '../firebase'



const AddChatScreen = ({navigation}) => {

    const [chat,setChat] = useState('')
    const addChat =async ()=>{
          const docRef = await addDoc(collection(db, "chats"), {
            id:auth?.currentUser?.uid,
            ChatName:chat
          }).then(()=>{
            navigation.goBack()
          }).catch((error)=>{
            Alert(error)
          });
    }

  return (
    <VStack flex={1} p={10} space={5}>
        <Input variant={"underlined"} value={chat} onChangeText={(text)=>setChat(text)} InputLeftElement={<Icon as={<AntDesign name='wechat'   />} size={8} color={"#2C6BED"}  />}  placeholder={"Chat name"} pl={5} fontSize={'xl'}  />
        <Button backgroundColor={"#2C6BED"} onPress={()=>addChat()} >Add Chat</Button>
    </VStack>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({})
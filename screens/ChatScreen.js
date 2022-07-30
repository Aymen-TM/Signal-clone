import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Avatar, HStack,Text } from 'native-base'
import { auth, db } from '../firebase'
import {AntDesign,FontAwesome,Ionicons} from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore';
import { doc } from 'firebase/firestore';

const ChatScreen = ({navigation,route}) => {

    const [message,setMessage] = useState(null)

    const sendMessage = async ()=>{
      
      Keyboard.dismiss()
     
      const docRef = doc(db, "chats",route.params.id);
      const messageRef = collection(docRef,"messages");
      await addDoc(messageRef,{
        timestamp:serverTimestamp(),
        message:message,
        email:auth.currentUser.email,
        displayName:auth.currentUser.displayName,
        photoURL:auth.currentUser.photoURL,
      })
      setMessage('')
      }
    
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle:()=>(
            <HStack height={"full"}  justifyContent="center" alignItems={"center"} space={"sm"}>
                <Avatar size="sm"  _text={{fontSize:"lg"}} source={{
                  uri:auth?.currentUser?.photoURL,
                  }}>
                  {auth?.currentUser?.displayName.charAt(0).toUpperCase()}
                </Avatar>
              <Text color={"white"} fontSize="lg" fontWeight="bold">{route.params.ChatName}</Text>
            </HStack>

          ),
          headerStyle:{backgroundColor:"#2C6BED"},
          headerTitleStyle:{color:"white"},
          headerTintColor:"white",
            headerLeft:()=>(
              <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.goBack()} style={{marginLeft:10}}>
                <AntDesign name='arrowleft' color={"white"} size={24}  />
              </TouchableOpacity>
            ),
            headerRight:()=>(
              <HStack space={5} marginRight={5}>
                <TouchableOpacity>
                  <FontAwesome name="video-camera" size={24} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="call" size={24} color="white" />
                </TouchableOpacity>
              </HStack>
            )
          })

    }, [navigation])


    const [messages,setMessages] = useState([])
    const scrollref = useRef();

    useEffect(() => {
      const docRef = doc(db, "chats",route.params.id);
      const messageRef = collection(docRef,"messages");
      const q = query(messageRef, orderBy('timestamp','asc'));
      const unsub = onSnapshot(q,(querySnapshot) => {
        const documents= []
        querySnapshot.docs.map((doc) => {
          documents.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setMessages(documents)
      })
      return unsub
    }, [])
    

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: 'white'}}>
      <KeyboardAvoidingView  style={{flex: 1}}  behavior={Platform.OS === 'ios' ? 'padding':'height'} keyboardVerticalOffset={100}>
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
          <>
          <ScrollView   ref={scrollref} onContentSizeChange={() => scrollref.current.scrollToEnd({animated: true })}>
            {messages.map(({id,data})=>{
               if(data.email === auth.currentUser.email){
                return(
                  <HStack key={id}  position={"relative"} alignSelf={"flex-end"} backgroundColor={"#ECECEC"} borderRadius={"lg"} marginRight={15} marginBottom={10} maxWidth={"80%"} padding={15}>
                    <Avatar position={"absolute"} size={30} rounded="full" bottom={-20} right={-5} >{auth.currentUser.displayName.charAt(0).toUpperCase()}</Avatar>
                    <Text fontWeight={'semibold'} >{data.message}</Text>
                  </HStack>
                )
               }else{
                return(
                <HStack key={id} position={"relative"} alignSelf={"flex-start"} backgroundColor={"#2B68E6"} borderRadius={"lg"} margin={15}  maxWidth={"80%"} padding={15}>
                  <Avatar position={"absolute"} rounded="full" size={30} bottom={-15} left={-5} >{data.displayName.charAt(0).toUpperCase()}</Avatar>
                  <Text fontWeight={'semibold'} >{data.message}</Text>
                </HStack>
                )
               }
            })}
          </ScrollView>
          <HStack padding={15} alignItems={'center'} >
              <TextInput size="sm" placeholder="chat" style={styles.textInput} value={message} onChangeText={(text)=>{setMessage(text)}}  />
              <TouchableOpacity onPress={()=>sendMessage()}>
                <Ionicons name='send' color={"#2C6BED"} size={24}/>
              </TouchableOpacity>
          </HStack>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  textInput:{
    bottom:0,
    height:40,
    flex:1,
    marginRight:15,
    borderColor:"transparent",
    backgroundColor:"#ECECEC",
    padding:10,
    color:"grey",
    borderRadius:30,
  },
})
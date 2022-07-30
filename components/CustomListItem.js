import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Box, HStack, Pressable, Spacer, Text, VStack } from 'native-base'
import { collection, doc, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../firebase/AuthProvider'

const CustomListItem = ({id,ChatName,enterChat}) => {

  const [message,setMessage] = useState([])

  const {user} = useContext(AuthContext)



  useEffect(() => {
    const GetLastMessage = (id)=>{
      const docRef = doc(db, "chats",id);
      const messageRef = collection(docRef,"messages");
      const q = query(messageRef, orderBy('timestamp','desc'),limit(1));
      onSnapshot(q,(querySnapshot) => {
        const documents= []
        querySnapshot.docs.map((doc) => {
          documents.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setMessage(documents)
      })
    }
    GetLastMessage(id)

   
  }, [])
  
  return (
      <Pressable key={id} onPress={() => enterChat(id,ChatName)} >
        <Box pl="4" pr="5" py="2" backgroundColor={"white"}>
          <HStack alignItems="center" space={3}>
            <Avatar size="32px" >
              {message?.[0]?.data?.displayName.charAt(0).toUpperCase() || user?.displayName?.charAt(0).toUpperCase()}
            </Avatar>
            <VStack>
              <Text color="coolGray.800" bold fontSize={'md'}>
                {ChatName}
              </Text>
              <Text color="coolGray.600" fontWeight={'semibold'}  numberOfLines={1} ellipsizeMode={"tail"}>
                {message?.[0]?.data.message}
              </Text>
            </VStack>
            <Spacer />
            <Text fontSize="xs" color="coolGray.800" fontWeight={'bold'} alignSelf="flex-start">
              {message?.[0]?.data?.timestamp?.toDate().toLocaleTimeString('en-US').substring(0, 5)}
            </Text>
          </HStack>
        </Box>
      </Pressable>
  )
}

export default CustomListItem


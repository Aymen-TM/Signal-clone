import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, HStack, ScrollView } from 'native-base'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons';
import { collection, doc, getDocs, onSnapshot, query } from 'firebase/firestore'





const HomeScreen = ({navigation}) => {


  const [chats,setChats] = useState([])

const signOutUser = ()=>{
  signOut(auth).then(()=>{
    navigation.replace("LoginScreen")
  })
}

useLayoutEffect(() => {

  navigation.setOptions({
    title:"Signal",
    headerStyle:{backgroundColor:"#fff"},
    headerTitleStyle:{color:"black"},
    headerTintColor:"black",
    headerLeft:()=>(
      <TouchableOpacity onPress={()=>signOutUser()} activeOpacity={0.8}>
        <Avatar size="sm"  _text={{fontSize:"lg"}} marginLeft={5} source={{
          uri:auth?.currentUser?.photoURL,
        }}>
          {auth?.currentUser?.displayName?.at(0).toLocaleUpperCase()}
        </Avatar>
      </TouchableOpacity>
    ),
    headerRight:()=>(
      <HStack justifyContent={"space-between"} marginRight={5} space={5}>
        <TouchableOpacity activeOpacity={0.8}>
          <AntDesign name='camerao' size={24} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("AddChatScreen")}>
          <SimpleLineIcons name='pencil' size={24} color={"black"} activeOpacity={0.8} />
        </TouchableOpacity>
      </HStack>
    )
  })
}, [navigation])


useEffect(() => {

    onAuthStateChanged(auth, (authUser) => {
      if(!authUser){
        navigation.replace('LoginScreen')
      }
    });

    const unsub = onSnapshot(collection(db, "chats"), (querySnapshot) => {
      const documents= []
      querySnapshot.docs.map((doc) => {
        documents.push({
          id:doc.id,
          data:doc.data()
        })
      });
      setChats(documents)
    });
    return () => unsub();

  

  }, [])



  return (
    <SafeAreaView>
      <ScrollView >
        {
          chats.map(({id,data:{ChatName}})=>(
            <CustomListItem id={id} ChatName={ChatName} />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
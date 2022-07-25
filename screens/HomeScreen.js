import {SafeAreaView, StyleSheet, TouchableOpacity,Text} from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, HStack, ScrollView } from 'native-base'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons';
import { collection,onSnapshot } from 'firebase/firestore'
import { AuthContext } from '../firebase/AuthProvider'





const HomeScreen = ({navigation}) => {


const [chats,setChats] = useState([])

const {logout} = useContext(AuthContext);

const signOutUser = ()=>{
  logout()
}

useLayoutEffect(() => {
  navigation.setOptions({
    title:"Signal",
    headerStyle:{backgroundColor:"#fff"},
    headerTitleStyle:{color:"black"},
    headerTintColor:"black",
    headerLeft:()=>(
      <TouchableOpacity onPress={()=>signOutUser()} activeOpacity={0.8}>
        <Avatar size="sm"  _text={{fontSize:"lg"}} marginLeft={5}>
          {auth?.currentUser?.displayName.charAt(0).toUpperCase()}
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
    ),
    gestureEnabled: false 
  })
}, [navigation])


useEffect(() => {
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


  const enterChat = (id,ChatName)=>{
    navigation.navigate("ChatScreen",{
      id,
      ChatName
    })
  }


    return(
    <SafeAreaView>
      <ScrollView >
        {
          chats.map(({id,data:{ChatName}})=>(
            <CustomListItem key={id} id={id} ChatName={ChatName} enterChat={enterChat} />
          ))
        }
      </ScrollView>
    </SafeAreaView>
    )


}

export default HomeScreen

const styles = StyleSheet.create({})
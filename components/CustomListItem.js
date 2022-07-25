import React, { useEffect } from 'react'
import { Avatar, Box, HStack, Pressable, Spacer, Text, VStack } from 'native-base'

const CustomListItem = ({id,ChatName,enterChat}) => {

  useEffect(() => {
    console.log(ChatName);
  }, [])
  
  return (
      <Pressable key={id} onPress={() => enterChat(id,ChatName)} >
        <Box pl="4" pr="5" py="2" backgroundColor={"white"}>
          <HStack alignItems="center" space={3}>
            <Avatar size="48px" source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
          }} />
            <VStack>
              <Text color="coolGray.800" bold fontSize={'md'}>
                {ChatName}
              </Text>
              <Text color="coolGray.600"  numberOfLines={1} ellipsizeMode={"tail"}>
                hello
              </Text>
            </VStack>
            <Spacer />
            <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
              test
            </Text>
          </HStack>
        </Box>
      </Pressable>
  )
}

export default CustomListItem


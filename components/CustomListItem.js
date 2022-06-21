import React from 'react'
import { Avatar, Box, HStack, Pressable, Spacer, Text, VStack } from 'native-base'

const CustomListItem = () => {
  return (
      <Pressable onPress={() => console.log("You touched me")} _dark={{
      bg: "coolGray.800"
    }} _light={{
      bg: "white"
    }}>
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar size="48px" source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
          }} />
            <VStack>
              <Text color="coolGray.800" _dark={{color: "warmGray.50" }} bold fontSize={'md'}>
                Youtube chat
              </Text>
              <Text color="coolGray.600" _dark={{color: "warmGray.200"}} numberOfLines={1} ellipsizeMode={"tail"}>
                hello
              </Text>
            </VStack>
            <Spacer />
            <Text fontSize="xs" color="coolGray.800" _dark={{ color: "warmGray.50" }} alignSelf="flex-start">
              test
            </Text>
          </HStack>
        </Box>
      </Pressable>
  )
}

export default CustomListItem


// import React, { useEffect, useRef } from 'react'
// import { Animated, Dimensions } from 'react-native'
// import { YStack, Input, Button, Text } from 'tamagui'
// import { TamaguiProvider } from '@tamagui/core';
// import tamaguiConfig from '../../tamagui.config';

// const { height } = Dimensions.get('window')

// export default function AnimatedFormScreen() {
//   // Animation value (start from bottom)
//   const translateY = useRef(new Animated.Value(height)).current
//   const opacity = useRef(new Animated.Value(0)).current

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(translateY, {
//         toValue: 0,
//         duration: 450,
//         useNativeDriver: true,
//       }),
//       Animated.timing(opacity, {
//         toValue: 1,
//         duration: 450,
//         useNativeDriver: true,
//       }),
//     ]).start()
//   }, [])

//   return (
//       <TamaguiProvider config={tamaguiConfig}>
//             <Animated.View
//       style={{
//         flex: 1,
//         transform: [{ translateY }],
//         opacity,
//         backgroundColor:"#000"
//       }}
//     >
//       <YStack
//         flex={1}
//         backgroundColor="$background"
//         padding={4}
//         justifyContent="center"
//         space={3}
//       >
//         <Text fontSize={8} fontWeight="700" textAlign="center">
//           Create Account
//         </Text>

//         <Input placeholder="Name" size={4} />
//         <Input placeholder="Email" size={4} keyboardType="email-address" />
//         <Input placeholder="Password" size={4} secureTextEntry />

//         <Button size={4} marginTop={4}>
//           Submit
//         </Button>
//       </YStack>
//     </Animated.View>
//       </TamaguiProvider>

//   )
// }
import React, { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { YStack, Input, Button, Text } from 'tamagui'
import { TamaguiProvider } from '@tamagui/core';
import tamaguiConfig from '../../tamagui.config';
export default function AnimatedFormScreen() {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <TamaguiProvider config={tamaguiConfig}>
  <Animated.View
      style={{
        flex: 1,
        opacity,
      }}
    >
      <YStack
        flex={1}
        backgroundColor="##fff"
        padding={16}
        justifyContent="center"
        space={12}
      >
        <Text fontSize={28} fontWeight="700" textAlign="center" color="#000">
          Create Account
        </Text>

        <Input placeholder="Name" size={4} />
        <Input placeholder="Email" size={4} keyboardType="email-address" />
        <Input placeholder="Password" size={4} secureTextEntry />

        <Button size={4} marginTop={16}>
          Submit
        </Button>
      </YStack>
    </Animated.View>
    </TamaguiProvider>
  
  )
}

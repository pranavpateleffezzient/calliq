// // import { TamaguiProvider, View, createTamagui  } from '@tamagui/core'
// // import {  XGroup, XStack, YStack } from 'tamagui'

// // import tamaguiConfig from '../../tamagui.config'
// // import { ButtonDemo } from '../com/button';
// // // import { View, Text } from 'react-native';
// // export type RootStackParamList = {
// //   Login: undefined;
// //   Dashboard: undefined;
// // };



// // export default function App() {
// //   // const config = createTamagui({
// // //   tokens: {
// // //     color: { background: '#000' }
// // //   }
// // // })

// //   return (
// //     <TamaguiProvider config={tamaguiConfig}>
// //       <View style={{flex:1}} backgroundColor="#fff" >
// //         <ButtonDemo />
// //         {/* <Button>Lorem ipsum</Button> */}
// //       </View>
// //     </TamaguiProvider>
// //     // <View style={{ flex: 1 }}>
// //     //   <Text>Dashboard</Text>
// //     //  </View>

// //   );
// // }
// // App.tsx
// import { TamaguiProvider, View,  } from '@tamagui/core'
// import { AppButton } from '../com/button/AppButton'
// import tamaguiConfig from '../../tamagui.config'
// import { Activity } from '@tamagui/lucide-icons'
// import { ScrollView } from 'react-native'
// import { Input } from 'tamagui'

// export default function App() {
//   return (
//     // 1. Wrap app with TamaguiProvider (provides theme)
//     <TamaguiProvider config={tamaguiConfig}>

//       <ScrollView>
//    <View 
//         flex={1} 
//         backgroundColor="#000" 
//         padding="$md"
//       >

//         <Input flex={1} size={12} placeholder={`Size ...`} />
        
//         {/* SECTION 1: Basic Buttons */}
//         <View marginBottom="$lg">
//           <AppButton preset="primary" marginBottom="$sm">
//             Primary Button
//           </AppButton>
          
//           <AppButton preset="secondary" marginBottom="$sm">
//             Secondary Button
//           </AppButton>
          
//           <AppButton preset="outline" marginBottom="$sm">
//             Outline Button
//           </AppButton>
          
//           <AppButton preset="danger" marginBottom="$sm">
//             Danger Button
//           </AppButton>
          
//           <AppButton preset="ghost">
//             Ghost Button
//           </AppButton>
//         </View>
        
//         {/* SECTION 2: Button Sizes */}
//         <View marginBottom="$lg">
//           <AppButton 
//             preset={['primary', 'small']} 
//             marginRight="$sm"
//           >
//             Small
//           </AppButton>
          
//           <AppButton 
//             preset={['primary', 'medium']} 
//             marginRight="$sm"
//           >
//             Medium
//           </AppButton>
          
//           <AppButton preset={['primary', 'large']}>
//             Large
//           </AppButton>
//         </View>
        
//         {/* SECTION 3: With Icons */}
//         <View marginBottom="$lg">
//           <AppButton 
//             preset="primary" 
//             icon={<Activity />}
//             marginRight="$sm"
//           >
//             With Icon
//           </AppButton>
          
//           <AppButton 
//             preset="outline" 
//             iconAfter={<Activity />}
//           >
//             Icon After
//           </AppButton>
//         </View>
        
//         {/* SECTION 4: Full Width */}
//         <View marginBottom="$lg">
//           <AppButton preset={['primary', 'fullWidth']}>
//             Full Width Button
//           </AppButton>
//         </View>
        
//         {/* SECTION 5: States */}
//         <View marginBottom="$lg">
//           <AppButton 
//             preset="primary" 
//             disabled
//             marginRight="$sm"
//           >
//             Disabled
//           </AppButton>
          
//           <AppButton preset="primary" loading>
//             Loading
//           </AppButton>
//         </View>
        
//         {/* SECTION 6: Custom Overrides */}
//         <View>
//           <AppButton 
//             preset="primary"
//             // Override preset styles
//             backgroundColor="purple"
//             borderRadius="$full"
//             marginBottom="$sm"
//           >
//             Custom Color
//           </AppButton>
          
//           <AppButton 
//             // No preset, fully custom
//             backgroundColor="#FF9500"
//             color="white"
//             borderRadius="$lg"
//             padding="$lg"
//           >
//             Fully Custom
//           </AppButton>
//         </View>
        
//       </View>
//       </ScrollView>
//       {/* 2. Main container */}
   
//     </TamaguiProvider>
//   )
// }

// App.tsx
import { TamaguiProvider, View, Text } from '@tamagui/core'
import { CustomButton } from '../com/button/CustomBu'
import tamaguiConfig from '../../tamagui.config'
import { Activity, Star, AlertCircle, Check } from '@tamagui/lucide-icons'
import { YStack } from 'tamagui'

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View flex={1} backgroundColor="$background" padding="$4">
        
        {/* SECTION HEADER */}
        <Text fontSize={24} fontWeight="bold" marginBottom="$4">
          Button System Demo
        </Text>
        
        <YStack gap="$3">
          
          {/* ========== BASIC USAGE ========== */}
          <Text fontWeight="600">Basic Buttons:</Text>
          <CustomButton>Default (Primary)</CustomButton>
          <CustomButton preset="secondary">Secondary</CustomButton>
          <CustomButton preset="outline">Outline</CustomButton>
          <CustomButton preset="ghost">Ghost</CustomButton>
          <CustomButton preset="danger">Danger</CustomButton>
          <CustomButton preset="success">Success</CustomButton>
          <CustomButton preset="warning">Warning</CustomButton>
          
          {/* ========== SIZE EXAMPLES ========== */}
          <Text fontWeight="600" marginTop="$2">Sizes:</Text>
          <CustomButton preset="xs">Extra Small</CustomButton>
          <CustomButton preset="sm">Small</CustomButton>
          <CustomButton preset="md">Medium (Default)</CustomButton>
          <CustomButton preset="lg">Large</CustomButton>
          <CustomButton preset="xl">Extra Large</CustomButton>
          
          {/* ========== COMBINE PRESETS ========== */}
          <Text fontWeight="600" marginTop="$2">Combine Presets:</Text>
          
          {/* Primary + Large */}
          <CustomButton preset={['primary', 'lg']}>
            Primary Large
          </CustomButton>
          
          {/* Outline + Small + Rounded */}
          <CustomButton preset={['outline', 'sm', 'rounded']}>
            Small Rounded Outline
          </CustomButton>
          
          {/* Danger + Full Width */}
          <CustomButton preset={['danger', 'fullWidth']}>
            Full Width Danger
          </CustomButton>
          
          {/* Ghost + Elevated */}
          <CustomButton preset={['ghost', 'elevated']}>
            Ghost with Shadow
          </CustomButton>
          
          {/* ========== WITH ICONS ========== */}
          <Text fontWeight="600" marginTop="$2">With Icons:</Text>
          
          <CustomButton preset="primary" icon={<Activity />}>
            Start Activity
          </CustomButton>
          
          <CustomButton 
            preset={['secondary', 'rounded']} 
            icon={<Star />}
          >
            Add Favorite
          </CustomButton>
          
          {/* Icon Only Button */}
          <CustomButton 
            preset={['primary', 'iconOnly', 'rounded']}
            icon={<Check size={24} />}
            width={44}
            height={44}
          />
          
          {/* ========== STATES ========== */}
          <Text fontWeight="600" marginTop="$2">States:</Text>
          
          <CustomButton preset="primary" disabled>
            Disabled Button
          </CustomButton>
          
          <CustomButton preset="primary" loading>
            Loading Button
          </CustomButton>
          
          {/* ========== CUSTOM OVERRIDES ========== */}
          <Text fontWeight="600" marginTop="$2">Custom Overrides:</Text>
          
          {/* Override preset colors */}
          <CustomButton 
            preset="primary"
            backgroundColor="purple"
            hoverStyle={{ backgroundColor: 'darkpurple' }}
            marginBottom="$2"
          >
            Custom Purple
          </CustomButton>
          
          {/* No preset, fully custom */}
          <CustomButton
            backgroundColor="#FF9500"
            color="white"
            borderRadius={20}
            padding="$3"
            icon={<AlertCircle />}
            hoverStyle={{
              backgroundColor: '#E58500',
              transform: [{ scale: 1.05 }]
            }}
            pressStyle={{
              backgroundColor: '#CC7500',
              transform: [{ scale: 0.95 }]
            }}
            animation="quick"
          >
            Fully Custom Button
          </CustomButton>
          
          {/* ========== USING BUILT-IN VARIANTS ========== */}
          <Text fontWeight="600" marginTop="$2">Using Built-in Variants:</Text>
          
          {/* Using variant and size props (from BaseButton) */}
          <CustomButton variant="primary" size="lg">
            Using Variant Prop
          </CustomButton>
          
          <CustomButton variant="outline" size="sm" rounded>
            Rounded Outline
          </CustomButton>
          
          <CustomButton variant="ghost" fullWidth>
            Full Width Ghost
          </CustomButton>
          
        </YStack>
      </View>
    </TamaguiProvider>
  )
}
// import { createTamagui, createTokens } from '@tamagui/core'
// import { createAnimations } from '@tamagui/animations-react-native'
// import colors from './constant/colors'
// import { createMedia } from '@tamagui/react-native-media-driver';
//  const tokens = createTokens({
//   // Color Tokens - Define ALL colors here
//   // colors: {
//   //   // Blue shades for primary buttons
//   //   primary: colors.primary,     // Main primary colors
//   //   primaryDark: colors.primaryDark, // Darker for hover
//   //   primaryLight: colors.primaryLight,// Lighter
    
    
//   //   // Red for danger buttons
//   //   danger: colors.danger,
//   //   dangerDark: colors.dangerDark,
    
//   //   // White and black
//   //   white: colors.white,
//   //   black: colors.black,
    
//   //   // Background colors
//   //   background: colors.background,

//   //   blue1:colors.blue1,
//   //   blue2:colors.blue2,
//   //   blue3:colors.blue3,
//   //   blue4:colors.blue4,
//   //   blue5:colors.blue5,
//   //   blue6:colors.blue6,
//   //   blue7:colors.blue7,
//   //   blue8:colors.blue8,
//   //   blue9:colors.blue9,
//   //   blue10:colors.blue10,
    
    
//   //   // Gray shades
//   //   gray1: colors.gray1,
//   //   gray2: colors.gray2,
//   //   gray3: colors.gray3,
//   //   gray4: colors.gray4,
//   //   gray5: colors.gray5,
//   //   gray6: colors.gray6,
//   //   gray7: colors.gray7,
//   //   gray8: colors.gray8,
//   //   gray9: colors.gray9,
//   //   gray10: colors.gray10,
//   //   gray11: colors.gray11,
//   //   gray12: colors.gray12,
//   //   gray13: colors.gray13,
    
//   //   // Red shades
//   //   red1: colors.red1,
//   //   red2: colors.red2,
//   //   red3: colors.red3,
//   //   red4: colors.red4,
//   //   red5: colors.red5,
//   //   red6: colors.red6,
//   //   red7: colors.red7,
//   //   red8: colors.red8,
//   //   red9: colors.red9,
//   //   red10: colors.red10,

//   //   // Green shades
//   //   green1: colors.green1,
//   //   green2: colors.green2,
//   //   green3: colors.green3,
//   //   green4: colors.green4,
//   //   green5: colors.green5,
//   //   green6: colors.green6,
//   //   green7: colors.green7,
//   //   green8: colors.green8,
//   //   green9: colors.green9,
//   //   green10: colors.green10,

    
//   //   // Orange shades
//   //   orange1: colors.orange1,
//   //   orange2: colors.orange2,
//   //   orange3: colors.orange3,
//   //   orange4: colors.orange4,
//   //   orange5: colors.orange5,
//   //   orange6: colors.orange6,
//   //   orange7: colors.orange7,
//   //   orange8: colors.orange8,
//   //   orange9: colors.orange9,
//   //   orange10: colors.orange10,

//   // },

//   colors :{
//    primary: '#0A4EDC',     
//     primaryDark: '#0056CC', 
//     primaryLight: '#409CFF',
//     danger: '#FF3B30',
//     dangerDark: '#D70015',
//     white: '#FFFFFF',
//     black: '#000000',
    
//     // Background colors
//     background: '#FFFFFF',

//     blue1: '#f0f9ff',
//     blue2: '#e0f2fe',
//     blue3: '#bae6fd',
//     blue4: '#7dd3fc',
//     blue5: '#38bdf8',
//     blue6: '#0ea5e9',
//     blue7: '#0284c7',
//     blue8: '#0369a1',
//     blue9: '#075985',
//     blue10: '#0c4a6e',
    
//     // Gray shades
//     gray1: '#fafafa',
//     gray2: '#f4f4f5',
//     gray3: '#e4e4e7',
//     gray4: '#d4d4d8',
//     gray5: '#a1a1aa',
//     gray6: '#71717a',
//     gray7: '#52525b',
//     gray8: '#3f3f46',
//     gray9: '#27272a',
//     gray10: '#18181b',
//     gray11: '#0f0f11',
//     gray12: '#030303',
//     gray13: '#B0B7C3',
    
//     // Red shades
//     red1: '#fef2f2',
//     red2: '#fee2e2',
//     red3: '#fecaca',
//     red4: '#fca5a5',
//     red5: '#f87171',
//     red6: '#ef4444',
//     red7: '#dc2626',
//     red8: '#b91c1c',
//     red9: '#991b1b',
//     red10: '#7f1d1d',
    
//     // Green shades
//     green1: '#f0fdf4',
//     green2: '#dcfce7',
//     green3: '#bbf7d0',
//     green4: '#86efac',
//     green5: '#4ade80',
//     green6: '#22c55e',
//     green7: '#16a34a',
//     green8: '#15803d',
//     green9: '#166534',
//     green10: '#14532d',
    
//     // Orange shades
//     orange1: '#fff7ed',
//     orange2: '#ffedd5',
//     orange3: '#fed7aa',
//     orange4: '#fdba74',
//     orange5: '#fb923c',
//     orange6: '#f97316',
//     orange7: '#ea580c',
//     orange8: '#c2410c',
//     orange9: '#9a3412',
//     orange10: '#7c2d12',
// },

  
//   size: {
//     0: 0,
//     1: 4,
//     2: 8,
//     3: 12,
//     4: 16,
//     5: 20,
//     6: 24,
//     7: 28,
//     8: 32,
//     9: 36,
//     10: 40,
//   },
    
//   radius: {
//     0: 0,
//     1: 3,
//     2: 6,
//     3: 9,
//     4: 12,
//     5: 15,
//     6: 18,
//     7: 21,
//     8: 24,
//     9: 27,
//     10: 30,
//   },
  
//   space: {
//     0: 0,
//     1: 4,
//     2: 8,
//     3: 12,
//     4: 16,
//     5: 20,
//     6: 24,
//     7: 28,
//     8: 32,
//     9: 36,
//     10: 40,
//   },
// })
// const animations = createAnimations({
//   fast: {
//     type: 'timing',
//     duration: 150,
//   },
//   medium: {
//     type: 'timing',
//     duration: 300,
//   },
//   slow: {
//     type: 'timing',
//     duration: 500,
//   },
// })

// export const tamaguiConfig = createTamagui({
//     tokens,
//     animations,
 
//     themes: {
//     light: {
//       bg: tokens.colors.background,
//       text: tokens.colors.black,
//     },
//     dark: {
//       bg: tokens.colors.black,
//       text: tokens.colors.white,
//     },
//   },
//     defaultProps: {
//     Button: {
//       // borderRadius: tokens.radius.md, // Default radius
//       fontWeight: '600',              // Default font weight
//       pressStyle: { opacity: 0.8 },
//       Text: {
//       fontFamily: '$reg', // ✅ global default
//     },   // When pressed
//     }
//   },
   
  
// })
 
// export type AppTamaguiConfig = typeof tamaguiConfig
 
// declare module 'tamagui' {
//     interface TamaguiCustomConfig extends AppTamaguiConfig { }
// }
 
// export default tamaguiConfig

// // import { createTamagui, createTokens } from '@tamagui/core';
// // import { createAnimations } from '@tamagui/animations-react-native';
// // import { createMedia } from '@tamagui/react-native-media-driver';

// // const tokens = createTokens({
// //   colors: {
// //     primary: '#007AFF',
// //     primaryDark: '#0056CC',
// //     primaryLight: '#409CFF',
// //     danger: '#FF3B30',
// //     dangerDark: '#D70015',
// //     white: '#FFFFFF',
// //     black: '#000000',
// //     background: '#FFFFFF',
// //     gray1: '#F2F2F7',
// //     gray2: '#E5E5EA',
// //     gray3: '#D1D1D6',
// //     gray4: '#C7C7CC',
// //     gray5: '#AEAEB2',
// //     gray6: '#8E8E93',
// //     gray7: '#636366',
// //     gray8: '#48484A',
// //     gray9: '#3A3A3C',
// //     gray10: '#2C2C2E',
// //   },
  
// //   size: {
// //     0: 0,
// //     1: 4,
// //     2: 8,
// //     3: 12,
// //     4: 16,
// //     5: 20,
// //     6: 24,
// //     7: 28,
// //     8: 32,
// //     9: 36,
// //     10: 40,
// //   },
  
// //   radius: {
// //     0: 0,
// //     1: 4,
// //     2: 8,
// //     3: 12,
// //     4: 16,
// //     5: 20,
// //     6: 24,
// //     7: 28,
// //     8: 32,
// //     9: 36,
// //     10: 40,
// //   },
  
// //   space: {
// //     0: 0,
// //     1: 4,
// //     2: 8,
// //     3: 12,
// //     4: 16,
// //     5: 20,
// //     6: 24,
// //     7: 28,
// //     8: 32,
// //     9: 36,
// //     10: 40,
// //   },
// // });

// // const animations = createAnimations({
// //   fast: {
// //     type: 'timing',
// //     duration: 150,
// //   },
// //   medium: {
// //     type: 'timing',
// //     duration: 300,
// //   },
// //   slow: {
// //     type: 'timing',
// //     duration: 500,
// //   },
// // });

// // const media = createMedia({
// //   xs: { maxWidth: 660 },
// //   sm: { maxWidth: 800 },
// //   md: { maxWidth: 1020 },
// //   lg: { maxWidth: 1280 },
// //   xl: { maxWidth: 1420 },
// //   xxl: { maxWidth: 1600 },
// //   gtXs: { minWidth: 660 + 1 },
// //   gtSm: { minWidth: 800 + 1 },
// //   gtMd: { minWidth: 1020 + 1 },
// //   gtLg: { minWidth: 1280 + 1 },
// //   short: { maxHeight: 820 },
// //   tall: { minHeight: 820 },
// //   hoverNone: { hover: 'none' },
// //   pointerCoarse: { pointer: 'coarse' },
// // });

// // export const tamaguiConfig = createTamagui({
// //   tokens,
// //   animations,
// //   media,
  
// //   themes: {
// //     light: {
// //       bg: tokens.colors.background,
// //       text: tokens.colors.black,
// //     },
// //     dark: {
// //       bg: tokens.colors.black,
// //       text: tokens.colors.white,
// //     },
// //   },
  
// //   defaultProps: {
// //     Button: {
// //       borderRadius: tokens.radius[4],
// //       fontWeight: '600',
// //       pressStyle: { opacity: 0.8 },
// //     },
// //     Dialog: {
// //       overlay: {
// //         backgroundColor: 'rgba(0,0,0,0.6)',
// //       },
// //     },
// //   },
// // });

// // export type AppTamaguiConfig = typeof tamaguiConfig;

// // declare module 'tamagui' {
// //   interface TamaguiCustomConfig extends AppTamaguiConfig {}
// // }

// // export default tamaguiConfig;

// import { createTamagui } from 'tamagui'
// import { tokens } from '@tamagui/config/v3'
import { createTamagui, createTokens } from '@tamagui/core'
import { createAnimations } from '@tamagui/animations-react-native'
import color from 'mobile/constant/colors';
 const tokens = createTokens({
  // Color Tokens - Define ALL colors here
  color: {
    // Blue shades for primary buttons
    primary: color.primary,     // Main primary color
    primaryDark: color.primaryDark, // Darker for hover
    primaryLight: color.primaryLight,// Lighter
    
    
    // Red for danger buttons
    danger: color.danger,
    dangerDark: color.dangerDark,
    
    // White and black
    white: color.white,
    black: color.black,
    
    // Background colors
    background: color.background,

    blue1:color.blue1,
    blue2:color.blue2,
    blue3:color.blue3,
    blue4:color.blue4,
    blue5:color.blue5,
    blue6:color.blue6,
    blue7:color.blue7,
    blue8:color.blue8,
    blue9:color.blue9,
    blue10:color.blue10,
    
    
    // Gray shades
    gray1: color.gray1,
    gray2: color.gray2,
    gray3: color.gray3,
    gray4: color.gray4,
    gray5: color.gray5,
    gray6: color.gray6,
    gray7: color.gray7,
    gray8: color.gray8,
    gray9: color.gray9,
    gray10: color.gray10,
    gray11: color.gray11,
    gray12: color.gray12,
    gray13: color.gray13,
    
    // Red shades
    red1: color.red1,
    red2: color.red2,
    red3: color.red3,
    red4: color.red4,
    red5: color.red5,
    red6: color.red6,
    red7: color.red7,
    red8: color.red8,
    red9: color.red9,
    red10: color.red10,

    // Green shades
    green1: color.green1,
    green2: color.green2,
    green3: color.green3,
    green4: color.green4,
    green5: color.green5,
    green6: color.green6,
    green7: color.green7,
    green8: color.green8,
    green9: color.green9,
    green10: color.green10,

    
    // Orange shades
    orange1: color.orange1,
    orange2: color.orange2,
    orange3: color.orange3,
    orange4: color.orange4,
    orange5: color.orange5,
    orange6: color.orange6,
    orange7: color.orange7,
    orange8: color.orange8,
    orange9: color.orange9,
    orange10: color.orange10,

  },


  
  size: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
  },
    
  radius: {
    0: 0,
    1: 3,
    2: 6,
    3: 9,
    4: 12,
    5: 15,
    6: 18,
    7: 21,
    8: 24,
    9: 27,
    10: 30,
  },
  
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
  },
})
const animations = createAnimations({
  fast: {
    type: 'timing',
    duration: 150,
  },
  medium: {
    type: 'timing',
    duration: 300,
  },
  slow: {
    type: 'timing',
    duration: 500,
  },
})

export const tamaguiConfig = createTamagui({
    tokens,
    animations,
 
    themes: {
    light: {
      bg: tokens.color.background,
      text: tokens.color.black,
    },
    dark: {
      bg: tokens.color.black,
      text: tokens.color.white,
    },
  },
    defaultProps: {
    Button: {
      borderRadius: tokens.radius.md, // Default radius
      fontWeight: '600',              // Default font weight
      pressStyle: { opacity: 0.8 },
      Text: {
      fontFamily: '$reg', // ✅ global default
    },   // When pressed
    },
  },
  
  
})
 
export type AppTamaguiConfig = typeof tamaguiConfig
 
declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppTamaguiConfig { }
}
 
export default tamaguiConfig

// import { createTamagui } from 'tamagui'
// import { tokens } from '@tamagui/config/v3'
import { createTamagui, createTokens } from '@tamagui/core'
import { createAnimations } from '@tamagui/animations-react-native'
import colors from './constant/colors'
import { createMedia } from '@tamagui/react-native-media-driver';
 const tokens = createTokens({
  // Color Tokens - Define ALL colors here
  colors: {
    // Blue shades for primary buttons
    primary: colors.primary,     // Main primary colors
    primaryDark: colors.primaryDark, // Darker for hover
    primaryLight: colors.primaryLight,// Lighter
    
    
    // Red for danger buttons
    danger: colors.danger,
    dangerDark: colors.dangerDark,
    
    // White and black
    white: colors.white,
    black: colors.black,
    
    // Background colors
    background: colors.background,

    blue1:colors.blue1,
    blue2:colors.blue2,
    blue3:colors.blue3,
    blue4:colors.blue4,
    blue5:colors.blue5,
    blue6:colors.blue6,
    blue7:colors.blue7,
    blue8:colors.blue8,
    blue9:colors.blue9,
    blue10:colors.blue10,
    
    
    // Gray shades
    gray1: colors.gray1,
    gray2: colors.gray2,
    gray3: colors.gray3,
    gray4: colors.gray4,
    gray5: colors.gray5,
    gray6: colors.gray6,
    gray7: colors.gray7,
    gray8: colors.gray8,
    gray9: colors.gray9,
    gray10: colors.gray10,
    gray11: colors.gray11,
    gray12: colors.gray12,
    gray13: colors.gray13,
    
    // Red shades
    red1: colors.red1,
    red2: colors.red2,
    red3: colors.red3,
    red4: colors.red4,
    red5: colors.red5,
    red6: colors.red6,
    red7: colors.red7,
    red8: colors.red8,
    red9: colors.red9,
    red10: colors.red10,

    // Green shades
    green1: colors.green1,
    green2: colors.green2,
    green3: colors.green3,
    green4: colors.green4,
    green5: colors.green5,
    green6: colors.green6,
    green7: colors.green7,
    green8: colors.green8,
    green9: colors.green9,
    green10: colors.green10,

    
    // Orange shades
    orange1: colors.orange1,
    orange2: colors.orange2,
    orange3: colors.orange3,
    orange4: colors.orange4,
    orange5: colors.orange5,
    orange6: colors.orange6,
    orange7: colors.orange7,
    orange8: colors.orange8,
    orange9: colors.orange9,
    orange10: colors.orange10,

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
      bg: tokens.colors.background,
      text: tokens.colors.black,
    },
    dark: {
      bg: tokens.colors.black,
      text: tokens.colors.white,
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
// tamagui.config.ts
// import { createTamagui, createTokens } from '@tamagui/core'

// // 1. Create tokens (global variables for colors, sizes, etc.)
// const tokens = createTokens({
//   // Color Tokens - Define ALL colors here
//   colors: {
//     // Blue shades for primary buttons
//     primary: '#007AFF',     // Main primary colors
//     primaryDark: '#0056CC', // Darker for hover
//     primaryLight: '#409CFF',// Lighter
    
//     // Gray shades for secondary buttons
//     gray1: '#F2F2F7',
//     gray2: '#E5E5EA',
//     gray3: '#D1D1D6',
//     gray4: '#C7C7CC',
//     gray5: '#AEAEB2',
//     gray6: '#8E8E93',
    
//     // Red for danger buttons
//     danger: '#FF3B30',
//     dangerDark: '#D70015',
    
//     // White and black
//     white: '#FFFFFF',
//     black: '#000000',
    
//     // Background colors
//     background: '#FFFFFF',
//   },
  
//   // Size Tokens - For padding, height, etc.
//   size: {
//     xs: 8,    // Extra small
//     sm: 12,   // Small
//     md: 16,   // Medium (default)
//     lg: 20,   // Large
//     xl: 24,   // Extra large
//   },
  
//   // Radius Tokens - For border-radius
//   radius: {
//     none: 0,
//     sm: 4,    // Small radius
//     md: 8,    // Medium radius (default)
//     lg: 12,   // Large radius
//     full: 9999, // Full circle
//   },
  
//   // Space Tokens - For margins, gaps
//   space: {
//     xs: 4,
//     sm: 8,
//     md: 16,
//     lg: 24,
//     xl: 32,
//   }
// })

// // 2. Create the Tamagui configuration
// const config = createTamagui({
//   tokens,
  
//   // 3. Define themes (light/dark mode)
//   themes: {
//     light: {
//       bg: tokens.colors.background,
//       text: tokens.colors.black,
//     },
//     dark: {
//       bg: tokens.colors.black,
//       text: tokens.colors.white,
//     },
//   },
  
//   // 4. Set default props for ALL buttons in app
//   defaultProps: {
//     Button: {
//       borderRadius: tokens.radius.md, // Default radius
//       fontWeight: '600',              // Default font weight
//       pressStyle: { opacity: 0.8 },   // When pressed
//     },
//   },
// })

// export default config
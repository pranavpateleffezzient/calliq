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
// tamagui.config.ts
// import { createTamagui, createTokens } from '@tamagui/core'

// // 1. Create tokens (global variables for colors, sizes, etc.)
// const tokens = createTokens({
//   // Color Tokens - Define ALL colors here
//   color: {
//     // Blue shades for primary buttons
//     primary: '#007AFF',     // Main primary color
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
//       bg: tokens.color.background,
//       text: tokens.color.black,
//     },
//     dark: {
//       bg: tokens.color.black,
//       text: tokens.color.white,
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
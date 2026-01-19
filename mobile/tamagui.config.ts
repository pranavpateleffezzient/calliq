// import { createTamagui } from 'tamagui'
// import { tokens } from '@tamagui/config/v3'
import { createTamagui, createTokens } from '@tamagui/core'

 const tokens = createTokens({
  // Color Tokens - Define ALL colors here
  color: {
    // Blue shades for primary buttons
    primary: '#007AFF',     // Main primary color
    primaryDark: '#0056CC', // Darker for hover
    primaryLight: '#409CFF',// Lighter
    
    
    // Red for danger buttons
    danger: '#FF3B30',
    dangerDark: '#D70015',
    
    // White and black
    white: '#FFFFFF',
    black: '#000000',
    
    // Background colors
    background: '#FFFFFF',

    blue1: '#f0f9ff',
    blue2: '#e0f2fe',
    blue3: '#bae6fd',
    blue4: '#7dd3fc',
    blue5: '#38bdf8',
    blue6: '#0ea5e9',
    blue7: '#0284c7',
    blue8: '#0369a1',
    blue9: '#075985',
    blue10: '#0c4a6e',
    
    // Gray shades
    gray1: '#fafafa',
    gray2: '#f4f4f5',
    gray3: '#e4e4e7',
    gray4: '#d4d4d8',
    gray5: '#a1a1aa',
    gray6: '#71717a',
    gray7: '#52525b',
    gray8: '#3f3f46',
    gray9: '#27272a',
    gray10: '#18181b',
    gray11: '#0f0f11',
    gray12: '#030303',
    
    // Red shades
    red1: '#fef2f2',
    red2: '#fee2e2',
    red3: '#fecaca',
    red4: '#fca5a5',
    red5: '#f87171',
    red6: '#ef4444',
    red7: '#dc2626',
    red8: '#b91c1c',
    red9: '#991b1b',
    red10: '#7f1d1d',
    
    // Green shades
    green1: '#f0fdf4',
    green2: '#dcfce7',
    green3: '#bbf7d0',
    green4: '#86efac',
    green5: '#4ade80',
    green6: '#22c55e',
    green7: '#16a34a',
    green8: '#15803d',
    green9: '#166534',
    green10: '#14532d',
    
    // Orange shades
    orange1: '#fff7ed',
    orange2: '#ffedd5',
    orange3: '#fed7aa',
    orange4: '#fdba74',
    orange5: '#fb923c',
    orange6: '#f97316',
    orange7: '#ea580c',
    orange8: '#c2410c',
    orange9: '#9a3412',
    orange10: '#7c2d12',
    
    // Background
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
export const tamaguiConfig = createTamagui({
    tokens,
 
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
      pressStyle: { opacity: 0.8 },   // When pressed
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
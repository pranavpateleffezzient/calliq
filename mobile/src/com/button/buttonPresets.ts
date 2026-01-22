// config/buttonPresets.ts
// This file defines ALL button styles as "presets"

export const buttonPresets = {
  // PRESET 1: Primary Button (Main action button)
  primary: {
    backgroundColor: '$primary',      // Uses token from tamagui.config.ts
    color: '$white',
    borderWidth: 0,
    
    // Hover state
    hoverStyle: {
      backgroundColor: '$primaryDark',
    },
    
    // Pressed state
    pressStyle: {
      backgroundColor: '$primaryDark',
      opacity: 0.9,
    },
  },
  
  // PRESET 2: Secondary Button (Less important action)
  secondary: {
    backgroundColor: '$gray2',
    color: '$black',
    borderWidth: 0,
    
    hoverStyle: {
      backgroundColor: '$gray3',
    },
    
    pressStyle: {
      backgroundColor: '$gray4',
    },
  },
  
  // PRESET 3: Outline Button (Bordered button)
  outline: {
    backgroundColor: 'transparent',
    color: '$primary',
    borderWidth: 1,
    borderColor: '$primary',
    
    hoverStyle: {
      backgroundColor: '$gray1',
    },
    
    pressStyle: {
      backgroundColor: '$gray2',
    },
  },
  
  // PRESET 4: Danger Button (Delete, remove actions)
  danger: {
    backgroundColor: '$danger',
    color: '$white',
    borderWidth: 0,
    
    hoverStyle: {
      backgroundColor: '$dangerDark',
    },
    
    pressStyle: {
      opacity: 0.9,
    },
  },
  
  // PRESET 5: Ghost Button (Minimal button)
  ghost: {
    backgroundColor: 'transparent',
    color: '$black',
    borderWidth: 0,
    
    hoverStyle: {
      backgroundColor: '$gray1',
    },
  },
  
  // PRESET 6: Small Size
  small: {
    paddingHorizontal: '$4',
    paddingVertical: '$2',
    fontSize: 12,
  },
  
  // PRESET 7: Medium Size (default)
  medium: {
    paddingHorizontal: '$4',
    paddingVertical: '$4',
    fontSize: 14,
  },
  
  // PRESET 8: Large Size
  large: {
    paddingHorizontal: '$4',
    paddingVertical: '$6',
    fontSize: 16,
  },
  
  // PRESET 9: Full Width Button
  fullWidth: {
    width: '100%',
  },
  
  // PRESET 10: Disabled State
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  
  // PRESET 11: Rounded Button
  rounded: {
    borderRadius: '$5',
  },
  
  // PRESET 12: Square Button
  square: {
    borderRadius: '$5',
  },
}

// Type for TypeScript - tells which presets are available
export type ButtonPreset = keyof typeof buttonPresets
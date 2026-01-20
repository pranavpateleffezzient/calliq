// config/inputPresets.ts
// This file defines ALL input styles as "presets"

export const inputPresets = {
  // PRESET 1: Default Input (Main input style)
  default: {
    // backgroundColor: '$gray13',
    // borderWidth: 1,
    borderColor: '$gray13',
    color: '#000',
    placeholderTextColor: '$gray4',
    // borderRadius: '$radius.2',
    backgroundColor: '#F3F6FB',


    
    // Focus state
    focusStyle: {
      borderColor: '$primary',
      backgroundColor: '$white',
      shadowColor: '$primary',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    
    // Hover state
    hoverStyle: {
      borderColor: '$gray5',
      backgroundColor: '$gray2',
    },
  },
  
  // PRESET 2: Outline Input (Bordered)
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '$gray4',
    color: '$gray12',
    placeholderTextColor: '$gray6',
    borderRadius: '$radius.3',
    
    focusStyle: {
      borderColor: '$primary',
      backgroundColor: '$blue1',
    },
    
    hoverStyle: {
      borderColor: '$gray5',
    },
  },
  
  // PRESET 3: Filled Input (Solid background)
  filled: {
    backgroundColor: '$gray2',
    borderWidth: 0,
    color: '$gray12',
    placeholderTextColor: '$gray6',
    borderRadius: '$radius.2',
    
    focusStyle: {
      backgroundColor: '$gray3',
      shadowColor: '$gray5',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  },
  
  // PRESET 4: Underline Input (Minimal)
  underline: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 12,
    borderColor: '$gray4',
    color: '$gray12',
    placeholderTextColor: '$gray6',
    borderRadius: 0,
    
    focusStyle: {
      borderBottomColor: '$primary',
      backgroundColor: '$blue1',
    },
  },
  
  // PRESET 5: Success Input (Valid state)
  success: {
    backgroundColor: '$green1',
    borderWidth: 1,
    borderColor: '$green5',
    color: '$gray12',
    placeholderTextColor: '$green7',
    borderRadius: '$radius.2',
    
    focusStyle: {
      borderColor: '$green6',
      backgroundColor: '$green2',
    },
  },
  
  // PRESET 6: Error Input (Invalid state)
  error: {
    backgroundColor: '$red1',
    borderWidth: 1,
    borderColor: '$red5',
    color: '$gray12',
    placeholderTextColor: '$red7',
    borderRadius: '$radius.2',
    
    focusStyle: {
      borderColor: '$red6',
      backgroundColor: '$red2',
    },
  },
  
  // PRESET 7: Warning Input (Warning state)
  warning: {
    backgroundColor: '$orange1',
    borderWidth: 1,
    borderColor: '$orange5',
    color: '$gray12',
    placeholderTextColor: '$orange7',
    borderRadius: '$radius.2',
    
    focusStyle: {
      borderColor: '$orange6',
      backgroundColor: '$orange2',
    },
  },
  
  // PRESET 8: Disabled Input
  disabled: {
    backgroundColor: '$gray1',
    borderColor: '$gray2',
    color: '$gray7',
    placeholderTextColor: '$gray5',
    opacity: 0.6,
    pointerEvents: 'none',
  },
  
  // PRESET 9: Large Input
  large: {
    height: 56,
    paddingHorizontal: '$space.4',
    paddingVertical: '$space.3',
    fontSize: 18,
  },
  
  // PRESET 10: Medium Input (default)
  medium: {
    height: 48,
    paddingHorizontal: '$space.3',
    paddingVertical: '$space.2',
    fontSize: 16,
  },
  
  // PRESET 11: Small Input
  small: {
    height: 40,
    paddingHorizontal: '$space.2',
    paddingVertical: '$space.1',
    fontSize: 14,
  },
  
  // PRESET 12: Extra Small Input
  xsmall: {
    height: 32,
    paddingHorizontal: '$space.1',
    paddingVertical: '$space.0',
    fontSize: 12,
  },
  
  // PRESET 13: Rounded Input
  rounded: {
    borderRadius: '$radius.5',
  },
  
  // PRESET 14: Pill Input (fully rounded)
  pill: {
    borderRadius: '$radius.10',
  },
  
  // PRESET 15: With Icon (left padding)
  withIcon: {
    paddingLeft: 48,
  },
  
  // PRESET 16: With Icon Right (right padding)
  withIconRight: {
    paddingRight: 48,
  },
  
  // PRESET 17: Full Width Input
  fullWidth: {
    width: '100%',
  },
}

// Type for TypeScript - tells which presets are available
export type InputPreset = keyof typeof inputPresets

// Validation states
export type ValidationState = 'default' | 'success' | 'error' | 'warning'
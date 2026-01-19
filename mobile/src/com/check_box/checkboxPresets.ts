// config/checkboxPresets.ts
// This file defines ALL checkbox styles as "presets"

export const checkboxPresets = {
  // PRESET 1: Default Checkbox (Primary style)
  default: {
    backgroundColor: '$gray1',
    borderWidth: 2,
    borderColor: '$gray4',
    borderRadius: '$radius.2',
    
    // Checked state
    checkedStyle: {
      backgroundColor: '$primary',
      borderColor: '$primary',
    },
    
    // Focus state
    focusStyle: {
      borderColor: '$primary',
      backgroundColor: '$blue1',
      shadowColor: '$primary',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    
    // Hover state
    hoverStyle: {
      borderColor: '$gray5',
      backgroundColor: '$gray2',
    },
    
    // Pressed state
    pressStyle: {
      transform: [{ scale: 0.95 }],
    },
  },
  
  // PRESET 2: Primary Checkbox
  primary: {
    backgroundColor: '$gray1',
    borderWidth: 2,
    borderColor: '$gray4',
    borderRadius: '$radius.2',
    
    checkedStyle: {
      backgroundColor: '$primary',
      borderColor: '$primary',
    },
    
    focusStyle: {
      borderColor: '$primary',
      backgroundColor: '$blue1',
    },
  },
  
  // PRESET 3: Secondary Checkbox
  secondary: {
    backgroundColor: '$gray1',
    borderWidth: 2,
    borderColor: '$gray4',
    borderRadius: '$radius.2',
    
    checkedStyle: {
      backgroundColor: '$gray8',
      borderColor: '$gray8',
    },
    
    focusStyle: {
      borderColor: '$gray6',
      backgroundColor: '$gray2',
    },
  },
  
  // PRESET 4: Success Checkbox
  success: {
    backgroundColor: '$gray1',
    borderWidth: 2,
    borderColor: '$gray4',
    borderRadius: '$radius.2',
    
    checkedStyle: {
      backgroundColor: '$green6',
      borderColor: '$green6',
    },
    
    focusStyle: {
      borderColor: '$green5',
      backgroundColor: '$green1',
    },
  },
  
  // PRESET 5: Danger Checkbox
  danger: {
    backgroundColor: '$gray1',
    borderWidth: 2,
    borderColor: '$gray4',
    borderRadius: '$radius.2',
    
    checkedStyle: {
      backgroundColor: '$red6',
      borderColor: '$red6',
    },
    
    focusStyle: {
      borderColor: '$red5',
      backgroundColor: '$red1',
    },
  },
  
  // PRESET 6: Warning Checkbox
  warning: {
    backgroundColor: '$gray1',
    borderWidth: 2,
    borderColor: '$gray4',
    borderRadius: '$radius.2',
    
    checkedStyle: {
      backgroundColor: '$orange6',
      borderColor: '$orange6',
    },
    
    focusStyle: {
      borderColor: '$orange5',
      backgroundColor: '$orange1',
    },
  },
  
  // PRESET 7: Outline Checkbox
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '$gray5',
    borderRadius: '$radius.2',
    
    checkedStyle: {
      backgroundColor: 'transparent',
      borderColor: '$primary',
    },
  },
  
  // PRESET 8: Filled Checkbox
  filled: {
    backgroundColor: '$gray2',
    borderWidth: 0,
    borderRadius: '$radius.2',
    
    checkedStyle: {
      backgroundColor: '$primary',
    },
  },
  
  // PRESET 9: Rounded Checkbox
  rounded: {
    borderRadius: '$radius.3',
  },
  
  // PRESET 10: Circle Checkbox (Radio style)
  circle: {
    borderRadius: '$radius.10', // Full circle
  },
  
  // PRESET 11: Small Size
  small: {
    size: 18,
    iconSize: 10,
  },
  
  // PRESET 12: Medium Size (default)
  medium: {
    size: 22,
    iconSize: 12,
  },
  
  // PRESET 13: Large Size
  large: {
    size: 28,
    iconSize: 16,
  },
  
  // PRESET 14: Extra Large Size
  xlarge: {
    size: 36,
    iconSize: 20,
  },
  
  // PRESET 15: Disabled State
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
    
    checkedStyle: {
      opacity: 0.7,
    },
  },
  
  // PRESET 16: With Label (adds margin)
  withLabel: {
    marginRight: '$space.2',
  },
  
  // PRESET 17: Indeterminate State (partially checked)
  indeterminate: {
    checkedStyle: {
      backgroundColor: '$gray6',
      borderColor: '$gray6',
    },
  },
}

// Type for TypeScript
export type CheckboxPreset = keyof typeof checkboxPresets

// Checkbox variants type
export type CheckboxVariant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'filled'
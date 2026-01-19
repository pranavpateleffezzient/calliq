// components/CustomCheckbox.tsx
import { Checkbox as TamaguiCheckbox, styled } from 'tamagui'
import type { CheckboxProps } from 'tamagui'

// Create a styled checkbox with ALL possible variants
export const CustomCheckbox = styled(TamaguiCheckbox, {
  name: 'CustomCheckbox',
  
  // VARIANT 1: Size variants
  variants: {
    size: {
      xsmall: {
        size: 16,
        borderRadius: '$radius.1',
      },
      small: {
        size: 20,
        borderRadius: '$radius.2',
      },
      medium: {
        size: 24,
        borderRadius: '$radius.2',
      },
      large: {
        size: 28,
        borderRadius: '$radius.3',
      },
      xlarge: {
        size: 32,
        borderRadius: '$radius.3',
      },
    },
    
    // VARIANT 2: Type variants
    variant: {
      default: {
        backgroundColor: '$gray1',
        borderWidth: 2,
        borderColor: '$gray4',
        
        checkedStyle: {
          backgroundColor: '$primary',
          borderColor: '$primary',
        },
      },
      primary: {
        backgroundColor: '$gray1',
        borderWidth: 2,
        borderColor: '$gray4',
        
        checkedStyle: {
          backgroundColor: '$primary',
          borderColor: '$primary',
        },
      },
      secondary: {
        backgroundColor: '$gray1',
        borderWidth: 2,
        borderColor: '$gray4',
        
        checkedStyle: {
          backgroundColor: '$gray8',
          borderColor: '$gray8',
        },
      },
      success: {
        backgroundColor: '$gray1',
        borderWidth: 2,
        borderColor: '$gray4',
        
        checkedStyle: {
          backgroundColor: '$green6',
          borderColor: '$green6',
        },
      },
      danger: {
        backgroundColor: '$gray1',
        borderWidth: 2,
        borderColor: '$gray4',
        
        checkedStyle: {
          backgroundColor: '$red6',
          borderColor: '$red6',
        },
      },
      warning: {
        backgroundColor: '$gray1',
        borderWidth: 2,
        borderColor: '$gray4',
        
        checkedStyle: {
          backgroundColor: '$orange6',
          borderColor: '$orange6',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '$gray5',
        
        checkedStyle: {
          backgroundColor: 'transparent',
          borderColor: '$primary',
        },
      },
      filled: {
        backgroundColor: '$gray2',
        borderWidth: 0,
        
        checkedStyle: {
          backgroundColor: '$primary',
        },
      },
    },
    
    // VARIANT 3: Shape variants
    shape: {
      square: {
        borderRadius: '$radius.2',
      },
      rounded: {
        borderRadius: '$radius.3',
      },
      circle: {
        borderRadius: 9999,
      },
    },
    
    // VARIANT 4: Disabled state
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
        
        checkedStyle: {
          opacity: 0.7,
        },
      },
    },
    
    // VARIANT 5: Indeterminate state
    indeterminate: {
      true: {
        checkedStyle: {
          backgroundColor: '$gray6',
          borderColor: '$gray6',
        },
      },
    },
  },
  
  // Default values
  defaultVariants: {
    size: 'medium',
    variant: 'default',
    shape: 'square',
  },
})

// Custom checkbox indicator (check icon)
export const CustomCheckboxIndicator = styled(TamaguiCheckbox.Indicator, {
  name: 'CustomCheckboxIndicator',
  
  variants: {
    size: {
      xsmall: {
        size: '$1',
      },
      small: {
        size: '$1.5',
      },
      medium: {
        size: '$2',
      },
      large: {
        size: '$2.5',
      },
      xlarge: {
        size: '$3',
      },
    },
    
    color: {
      default: {
        color: '$white',
      },
      outline: {
        color: '$primary',
      },
      light: {
        color: '$gray1',
      },
    },
  },
  
  defaultVariants: {
    size: 'medium',
    color: 'default',
  },
})

// Checkbox frame (background)
export const CustomCheckboxFrame = styled(TamaguiCheckbox.Frame, {
  name: 'CustomCheckboxFrame',
  
  variants: {
    size: {
      xsmall: {
        width: 16,
        height: 16,
        borderRadius: '$radius.1',
      },
      small: {
        width: 20,
        height: 20,
        borderRadius: '$radius.2',
      },
      medium: {
        width: 24,
        height: 24,
        borderRadius: '$radius.2',
      },
      large: {
        width: 28,
        height: 28,
        borderRadius: '$radius.3',
      },
      xlarge: {
        width: 32,
        height: 32,
        borderRadius: '$radius.3',
      },
    },
  },
  
  defaultVariants: {
    size: 'medium',
  },
})

// Export types
export type CustomCheckboxProps = CheckboxProps
// components/CustomInput.tsx
import { Input as TamaguiInput, styled, TextArea } from 'tamagui'
import type { InputProps, TextAreaProps } from 'tamagui'

// Create a styled input with ALL possible variants
export const CustomInput = styled(TamaguiInput, {
  name: 'CustomInput',
  
  // VARIANT 1: Size variants
  variants: {
    size: {
      xsmall: {
        height: 32,
        paddingHorizontal: '$space.2',
        fontSize: 12,
        borderRadius: '$radius.1',
      },
      small: {
        height: 40,
        paddingHorizontal: '$space.3',
        fontSize: 14,
        borderRadius: '$radius.2',
      },
      medium: {
        height: 48,
        paddingHorizontal: '$space.4',
        fontSize: 16,
        borderRadius: '$radius.3',
      },
      large: {
        height: 56,
        paddingHorizontal: '$space.5',
        fontSize: 18,
        borderRadius: '$radius.4',
      },
    },
    
    // VARIANT 2: Type variants
    variant: {
      default: {
        backgroundColor: '$gray1',
        borderWidth: 1,
        borderColor: '$gray3',
        color: '$gray12',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '$gray4',
        color: '$gray12',
      },
      filled: {
        backgroundColor: '$gray2',
        borderWidth: 0,
        color: '$gray12',
      },
      underline: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: '$gray4',
        borderRadius: 0,
        color: '$gray12',
      },
    },
    
    // VARIANT 3: Validation states
    validation: {
      default: {},
      success: {
        borderColor: '$green5',
        backgroundColor: '$green1',
        focusStyle: {
          borderColor: '$green6',
          backgroundColor: '$green2',
        },
      },
      error: {
        borderColor: '$red5',
        backgroundColor: '$red1',
        focusStyle: {
          borderColor: '$red6',
          backgroundColor: '$red2',
        },
      },
      warning: {
        borderColor: '$orange5',
        backgroundColor: '$orange1',
        focusStyle: {
          borderColor: '$orange6',
          backgroundColor: '$orange2',
        },
      },
    },
    
    // VARIANT 4: Full width
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    
    // VARIANT 5: Disabled state
    disabled: {
      true: {
        backgroundColor: '$gray1',
        borderColor: '$gray2',
        color: '$gray7',
        opacity: 0.6,
        pointerEvents: 'none',
      },
    },
  },
  
  // Default values if not specified
  defaultVariants: {
    size: 'medium',
    variant: 'default',
    validation: 'default',
  },
})

// Create a styled TextArea with same variants
export const CustomTextArea = styled(TextArea, {
  name: 'CustomTextArea',
  
  variants: {
    size: {
      small: {
        minHeight: 80,
        paddingHorizontal: '$space.3',
        fontSize: 14,
        borderRadius: '$radius.2',
      },
      medium: {
        minHeight: 100,
        paddingHorizontal: '$space.4',
        fontSize: 16,
        borderRadius: '$radius.3',
      },
      large: {
        minHeight: 120,
        paddingHorizontal: '$space.5',
        fontSize: 18,
        borderRadius: '$radius.4',
      },
    },
    
    variant: {
      default: {
        backgroundColor: '$gray1',
        borderWidth: 1,
        borderColor: '$gray3',
        color: '$gray12',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '$gray4',
        color: '$gray12',
      },
    },
    
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  
  defaultVariants: {
    size: 'medium',
    variant: 'default',
  },
})

// Export the types for TypeScript
export type CustomInputProps = InputProps
export type CustomTextAreaProps = TextAreaProps
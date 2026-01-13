// components/CustomButton.tsx
import { Button as TamaguiButton, styled } from 'tamagui'
import type { ButtonProps } from 'tamagui'

// Create a styled button with ALL possible variants
export const CustomButton = styled(TamaguiButton, {
  name: 'CustomButton',
  
  // VARIANT 1: Size variants
  variants: {
    size: {
      xs: {
        height: 28,
        paddingHorizontal: 12,
        borderRadius: 6,
        fontSize: 12,
      },
      sm: {
        height: 36,
        paddingHorizontal: 16,
        borderRadius: 8,
        fontSize: 14,
      },
      md: {
        height: 44,
        paddingHorizontal: 20,
        borderRadius: 10,
        fontSize: 16,
      },
      lg: {
        height: 52,
        paddingHorizontal: 24,
        borderRadius: 12,
        fontSize: 18,
      },
    },
    
    // VARIANT 2: Type variants
    type: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
      },
      secondary: {
        backgroundColor: '$gray2',
        color: '$black',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$primary',
        color: '$primary',
      },
      danger: {
        backgroundColor: '$danger',
        color: 'white',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$black',
      },
    },
    
    // VARIANT 3: Full width
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  
  // Default values if not specified
  defaultVariants: {
    size: 'md',
    type: 'primary',
  },
})

// Export the type for TypeScript
export type CustomButtonProps = ButtonProps
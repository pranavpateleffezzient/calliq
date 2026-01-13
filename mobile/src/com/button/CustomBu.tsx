// components/CustomButton.tsx
import React from 'react'
import { Button as TamaguiButton, styled } from 'tamagui'
import type { ButtonProps } from 'tamagui'

// ============================================
// PART 1: Define ALL Button Presets (Style Dictionary)
// ============================================

const buttonPresets = {
  // ========== COLOR/TYPE PRESETS ==========
  primary: {
    backgroundColor: '$blue10',
    color: 'white',
    borderWidth: 0,
    
    hoverStyle: {
      backgroundColor: '$blue9',
    },
    
    pressStyle: {
      backgroundColor: '$blue8',
      opacity: 0.9,
    },
    
    focusStyle: {
      outlineColor: '$blue8',
      outlineWidth: 2,
    },
  },
  
  secondary: {
    backgroundColor: '$gray5',
    color: '$gray12',
    borderWidth: 0,
    
    hoverStyle: {
      backgroundColor: '$gray6',
    },
    
    pressStyle: {
      backgroundColor: '$gray7',
    },
  },
  
  outline: {
    backgroundColor: 'transparent',
    color: '$blue10',
    borderWidth: 1,
    borderColor: '$blue10',
    
    hoverStyle: {
      backgroundColor: '$gray2',
    },
    
    pressStyle: {
      backgroundColor: '$gray3',
    },
  },
  
  ghost: {
    backgroundColor: 'transparent',
    color: '$gray12',
    borderWidth: 0,
    
    hoverStyle: {
      backgroundColor: '$gray2',
    },
    
    pressStyle: {
      backgroundColor: '$gray3',
    },
  },
  
  danger: {
    backgroundColor: '$red10',
    color: 'white',
    borderWidth: 0,
    
    hoverStyle: {
      backgroundColor: '$red9',
    },
    
    pressStyle: {
      backgroundColor: '$red8',
    },
  },
  
  success: {
    backgroundColor: '$green10',
    color: 'white',
    borderWidth: 0,
    
    hoverStyle: {
      backgroundColor: '$green9',
    },
  },
  
  warning: {
    backgroundColor: '$orange10',
    color: 'white',
    borderWidth: 0,
    
    hoverStyle: {
      backgroundColor: '$orange9',
    },
  },
  
  // ========== SIZE PRESETS ==========
  xs: {
    height: 28,
    paddingHorizontal: 12,
    fontSize: 12,
    borderRadius: 6,
  },
  
  sm: {
    height: 36,
    paddingHorizontal: 16,
    fontSize: 14,
    borderRadius: 8,
  },
  
  md: {
    height: 44,
    paddingHorizontal: 20,
    fontSize: 16,
    borderRadius: 10,
  },
  
  lg: {
    height: 52,
    paddingHorizontal: 24,
    fontSize: 18,
    borderRadius: 12,
  },
  
  xl: {
    height: 60,
    paddingHorizontal: 28,
    fontSize: 20,
    borderRadius: 14,
  },
  
  // ========== SHAPE PRESETS ==========
  rounded: {
    borderRadius: 9999, // Full circle
  },
  
  square: {
    borderRadius: 0,
  },
  
  pill: {
    borderRadius: 50, // Large rounded
  },
  
  // ========== LAYOUT PRESETS ==========
  fullWidth: {
    width: '100%',
  },
  
  block: {
    width: '100%',
    justifyContent: 'center',*
  },
  
  // ========== STATE PRESETS ==========
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  
  loading: {
    opacity: 0.7,
  },
  
  // ========== ICON PRESETS ==========
  iconOnly: {
    paddingHorizontal: 0,
    aspectRatio: 1, // Square for icons
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // ========== ELEVATION PRESETS ==========
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  flat: {
    shadowColor: 'transparent',
    elevation: 0,
  },
}

// Type for TypeScript autocomplete
type ButtonPreset = keyof typeof buttonPresets

// ============================================
// PART 2: Create Base Styled Button Component
// ============================================

const BaseButton = styled(TamaguiButton, {
  name: 'BaseButton',
  
  // Built-in variants for quick styling
  variants: {
    // Quick color variants
    variant: {
      primary: {
        backgroundColor: '$blue10',
        color: 'white',
      },
      secondary: {
        backgroundColor: '$gray5',
        color: '$gray12',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$gray7',
        color: '$gray12',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$gray12',
      },
      danger: {
        backgroundColor: '$red10',
        color: 'white',
      },
    },
    
    // Quick size variants
    size: {
      xs: { height: 28, fontSize: 12, paddingHorizontal: 12 },
      sm: { height: 36, fontSize: 14, paddingHorizontal: 16 },
      md: { height: 44, fontSize: 16, paddingHorizontal: 20 },
      lg: { height: 52, fontSize: 18, paddingHorizontal: 24 },
      xl: { height: 60, fontSize: 20, paddingHorizontal: 28 },
    },
    
    // Shape variant
    rounded: {
      true: {
        borderRadius: 9999,
      },
    },
    
    // Full width
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  
  // Default values
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

// ============================================
// PART 3: Main CustomButton Component
// ============================================

interface CustomButtonProps extends ButtonProps {
  /**
   * Button style preset(s)
   * Can be string: 'primary'
   * Or array: ['primary', 'large', 'fullWidth']
   */
  preset?: ButtonPreset | ButtonPreset[]
  
  /**
   * Loading state
   */
  loading?: boolean
  
  /**
   * Button content
   */
  children?: React.ReactNode
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { 
    preset, 
    loading, 
    children, 
    disabled,
    ...restProps 
  } = props
  
  // ============================================
  // FUNCTION: Combine multiple presets
  // ============================================
  const getCombinedPresetStyles = () => {
    if (!preset) return {}
    
    // If preset is array (multiple presets)
    if (Array.isArray(preset)) {
      let combinedStyles = {}
      
      // Loop through each preset and merge styles
      preset.forEach(presetName => {
        if (buttonPresets[presetName]) {
          combinedStyles = {
            ...combinedStyles,
            ...buttonPresets[presetName],
          }
        }
      })
      
      return combinedStyles
    }
    
    // If single preset
    return buttonPresets[preset] || {}
  }
  
  // Get styles from preset
  const presetStyles = getCombinedPresetStyles()
  
  // ============================================
  // Handle loading and disabled states
  // ============================================
  const buttonStates = {}
  
  if (loading) {
    Object.assign(buttonStates, {
      ...buttonPresets.loading,
      children: 'Loading...',
    })
  }
  
  if (disabled) {
    Object.assign(buttonStates, buttonPresets.disabled)
  }
  
  // ============================================
  // Render the button with all styles
  // ============================================
  return (
    <BaseButton
      // 1. First apply preset styles
      {...presetStyles}
      
      // 2. Apply button state styles (loading/disabled)
      {...buttonStates}
      
      // 3. Apply any custom props (these can override everything)
      {...restProps}
      
      // 4. Disable if loading
      disabled={loading || disabled}
    >
      {loading ? 'Loading...' : children}
    </BaseButton>
  )
}

// ============================================
// PART 4: Export Helper Functions and Types
// ============================================

/**
 * Get a specific preset style object
 * Useful for reusing styles elsewhere
 */
export const getButtonPreset = (presetName: ButtonPreset) => {
  return buttonPresets[presetName] || {}
}

/**
 * Create a new button preset
 * Usage: addButtonPreset('custom', { backgroundColor: 'purple' })
 */
export const addButtonPreset = (
  name: string, 
  styles: Record<string, any>
) => {
  buttonPresets[name as ButtonPreset] = styles
}

/**
 * Available preset names for TypeScript
 */
export type { ButtonPreset }

/**
 * All button presets for reference
 */
export { buttonPresets }
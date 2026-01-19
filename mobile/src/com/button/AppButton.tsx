// components/AppButton.tsx
import React from 'react'
import { CustomButton } from './CustomButton'
import { buttonPresets, ButtonPreset } from '../button/buttonPresets'
import { ButtonProps,  Button as TamaguiButton, } from 'tamagui'

// Define our component's props
interface AppButtonProps extends ButtonProps {
  // Can use single preset or multiple
  preset?: ButtonPreset | ButtonPreset[]
  
  // Loading state
  loading?: boolean
  
  // Custom children
  children: React.ReactNode
}

export const AppButton: React.FC<AppButtonProps> = (props) => {
  const { 
    preset, 
    loading, 
    children, 
    ...restProps 
  } = props
  
  // Function to get styles from preset
  const getPresetStyles = () => {
    // If no preset, return empty object
    if (!preset) return {}
    
    // If preset is array (multiple presets)
    if (Array.isArray(preset)) {
      let styles = {}
      
      // Combine all presets
      preset.forEach(p => {
        styles = { ...styles, ...buttonPresets[p] }
      })
      
      return styles
    }
    
    // If single preset
    return buttonPresets[preset]
  }
  
  // Get styles from preset
  const presetStyles = getPresetStyles()
  
  // If loading, show loading text
  const buttonContent = loading ? 'Loading...' : children
  
  return (
    // <CustomButton
    //   // First apply preset styles
    //   {...presetStyles}
      
    //   // Then apply any custom props (can override preset)
    //   {...restProps}
      
    //   // Disable button if loading
    //   disabled={loading || restProps.disabled}
    // >
    //   {buttonContent}
    // </CustomButton>
      <TamaguiButton
      {...presetStyles}
      {...restProps}
      disabled={loading || restProps.disabled}
    >
      {buttonContent}
    </TamaguiButton>
  )
}
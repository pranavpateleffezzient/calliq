// components/AppInput.tsx
import React, { forwardRef, useState } from 'react'
import { 
  View, 
  Label, 
  XStack, 
  YStack,
  Text,
} from 'tamagui'
import { CustomInput, CustomTextArea } from './CustomInput'
import { inputPresets, InputPreset, ValidationState } from '../input/inputPresets'
import type { InputProps, TextAreaProps } from 'tamagui'
import { AlertCircle, CheckCircle, Eye, EyeOff } from '@tamagui/lucide-icons'

// Define our component's props
interface AppInputProps extends InputProps {
  // Can use single preset or multiple
  preset?: InputPreset | InputPreset[]
  
  // Label for the input
  label?: string
  
  // Helper text
  helperText?: string
  
  // Error message
  error?: string
  
  // Success message
  success?: string
  
  // Warning message
  warning?: string
  
  // Required field
  required?: boolean
  
  // Left icon component
  leftIcon?: React.ReactNode
  
  // Right icon component
  rightIcon?: React.ReactNode
  
  // Password input
  isPassword?: boolean
  
  // Character counter
  maxLength?: number
  
  // Validation state
  validationState?: ValidationState
  
  // TextArea instead of Input
  isTextArea?: boolean
  
  // Rows for TextArea
  rows?: number
}

export const AppInput = forwardRef<any, AppInputProps>((props, ref) => {
  const { 
    preset, 
    label,
    helperText,
    error,
    success,
    warning,
    required,
    leftIcon,
    rightIcon,
    isPassword,
    maxLength,
    validationState,
    isTextArea,
    rows = 4,
    value,
    ...restProps 
  } = props
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false)
  
  // Determine validation state
  const getValidationState = (): ValidationState => {
    if (error) return 'error'
    if (success) return 'success'
    if (warning) return 'warning'
    return validationState || 'default'
  }
  
  // Function to get styles from preset
  const getPresetStyles = () => {
    // If no preset, return empty object
    if (!preset) return {}
    
    // If preset is array (multiple presets)
    if (Array.isArray(preset)) {
      let styles = {}
      
      // Combine all presets
      preset.forEach(p => {
        styles = { ...styles, ...inputPresets[p] }
      })
      
      return styles
    }
    
    // If single preset
    return inputPresets[preset]
  }
  
  // Get styles from preset
  const presetStyles = getPresetStyles()
  
  // Get validation icon based on state
  const getValidationIcon = () => {
    const state = getValidationState()
    
    switch (state) {
      case 'success':
        return <CheckCircle color="$green6" size="$1" />
      case 'error':
        return <AlertCircle color="$red6" size="$1" />
      case 'warning':
        return <AlertCircle color="$orange6" size="$1" />
      default:
        return null
    }
  }
  
  // Get validation message
  const getValidationMessage = () => {
    if (error) return error
    if (success) return success
    if (warning) return warning
    return helperText
  }
  
  // Get validation message color
  const getValidationColor = () => {
    const state = getValidationState()
    
    switch (state) {
      case 'success':
        return '$green7'
      case 'error':
        return '$red7'
      case 'warning':
        return '$orange7'
      default:
        return '$gray6'
    }
  }
  
  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  // Calculate character count
  const characterCount = value ? String(value).length : 0
  
  // Choose between Input and TextArea
  const InputComponent = isTextArea ? CustomTextArea : CustomInput
  
  return (
    <YStack gap="$1.5" width={restProps.width || '100%'}>
      {/* Label */}
      {label && (
        <Label 
          htmlFor={restProps.id || label} 
          fontSize="$3" 
          fontWeight="500"
          color="$gray11"
        >
          {label}
          {required && <Text color="$red6"> *</Text>}
        </Label>
      )}
      
      {/* Input Container with Icons */}
      <XStack position="relative" alignItems="center">
        {/* Left Icon */}
        {leftIcon && (
          <View 
            position="absolute" 
            left="$3" 
            zIndex={1}
            pointerEvents="none"
          >
            {leftIcon}
          </View>
        )}
        
        {/* Main Input */}
        <InputComponent
          ref={ref}
          // Apply preset styles
          {...presetStyles}
          
          // Apply validation state
          validation={getValidationState()}
          
          // Password type
          secureTextEntry={isPassword && !showPassword}
          
          // Icon padding
          paddingLeft={leftIcon ? '$8' : undefined}
          paddingRight={rightIcon || isPassword ? '$8' : undefined}
          
          // TextArea specific
          {...(isTextArea && { numberOfLines: rows })}
          
          // Current value for character count
          value={value}
          
          // Other props
          {...restProps}
          
          // Focus style override
          focusStyle={{
            ...presetStyles.focusStyle,
            ...(restProps.focusStyle || {}),
          }}
        />
        
        {/* Right Icons Container */}
        <XStack 
          position="absolute" 
          right="$3" 
          gap="$2" 
          alignItems="center"
        >
          {/* Character Counter */}
          {maxLength && (
            <Text fontSize="$1" color="$gray6">
              {characterCount}/{maxLength}
            </Text>
          )}
          
          {/* Validation Icon */}
          {getValidationIcon()}
          
          {/* Password Toggle Icon */}
          {isPassword && (
            <View onPress={togglePasswordVisibility} cursor="pointer">
              {showPassword ? (
                <EyeOff color="$gray7" size="$5" />
              ) : (
                <Eye color="$gray7" size="$5" />
              )}
            </View>
          )}
          
          {/* Custom Right Icon */}
          {rightIcon && !isPassword && rightIcon}
        </XStack>
      </XStack>
      
      {/* Helper/Error Text and Character Counter */}
      {(getValidationMessage() || maxLength) && (
        <XStack justifyContent="space-between" alignItems="center">
          {/* Validation Message */}
          {getValidationMessage() && (
            <Text 
              fontSize="$2" 
              color={getValidationColor()}
              flex={1}
            >
              {getValidationMessage()}
            </Text>
          )}
          
          {/* Character Counter for mobile */}
          {maxLength && (
            <Text 
              fontSize="$1" 
              color={characterCount > maxLength ? '$red6' : '$gray6'}
              marginLeft="$2"
            >
              {characterCount}/{maxLength}
            </Text>
          )}
        </XStack>
      )}
    </YStack>
  )
})

AppInput.displayName = 'AppInput'

// Export individual components for specific use cases
export const AppTextArea = forwardRef<any, AppInputProps>((props, ref) => {
  return <AppInput ref={ref} isTextArea {...props} />
})

AppTextArea.displayName = 'AppTextArea'
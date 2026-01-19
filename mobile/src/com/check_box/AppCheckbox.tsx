// components/AppCheckbox.tsx
import React, { forwardRef } from 'react'
import { 
  View, 
  Label, 
  XStack, 
  YStack, 
  Text,
} from 'tamagui'
import { CustomCheckbox, CustomCheckboxIndicator, CustomCheckboxFrame } from '../check_box/CustomCheckbox'
import { checkboxPresets, CheckboxPreset } from '../check_box/checkboxPresets'
import type { CheckboxProps } from 'tamagui'
import { Check, Minus } from '@tamagui/lucide-icons'

// Define our component's props
interface AppCheckboxProps extends Omit<CheckboxProps, 'size' | 'checked'> {
  // Can use single preset or multiple
  preset?: CheckboxPreset | CheckboxPreset[]
  
  // Label for the checkbox
  label?: string | React.ReactNode
  
  // Helper text
  helperText?: string
  
  // Error message
  error?: string
  
  // Success message
  success?: string
  
  // Required field
  required?: boolean
  
  // Disabled state
  disabled?: boolean
  
  // Indeterminate state (partially checked)
  indeterminate?: boolean
  
  // Custom check icon
  customIcon?: React.ReactNode
  
  // Custom unchecked icon
  customUncheckedIcon?: React.ReactNode
  
  // Label position
  labelPosition?: 'left' | 'right'
  
  // Show border
  showBorder?: boolean
  
  // Checked state (controlled)
  checked?: boolean
  
  // Default checked (uncontrolled)
  defaultChecked?: boolean
  
  // On change handler
  onChange?: (checked: boolean) => void
  
  // On press handler
  onPress?: () => void
  
  // Size (can be overridden by preset)
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number
  
  // Custom size
  customSize?: number
}

export const AppCheckbox = forwardRef<any, AppCheckboxProps>((props, ref) => {
  const { 
    preset,
    label,
    helperText,
    error,
    success,
    required,
    disabled,
    indeterminate,
    customIcon,
    customUncheckedIcon,
    labelPosition = 'right',
    showBorder = true,
    checked,
    defaultChecked,
    onChange,
    onPress,
    size,
    customSize,
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
        styles = { ...styles, ...checkboxPresets[p] }
      })
      
      return styles
    }
    
    // If single preset
    return checkboxPresets[preset]
  }
  
  // Get styles from preset
  const presetStyles = getPresetStyles()
  
  // Determine validation state
  const getValidationProps = () => {
    if (error) {
      return {
        variant: 'danger' as const,
        helperColor: '$red7',
        helperText: error,
      }
    }
    
    if (success) {
      return {
        variant: 'success' as const,
        helperColor: '$green7',
        helperText: success,
      }
    }
    
    return {
      variant: presetStyles.variant || 'default',
      helperColor: '$gray6',
      helperText: helperText,
    }
  }
  
  const validationProps = getValidationProps()
  
  // Get checkbox size
  const getCheckboxSize = () => {
    if (customSize) return customSize
    if (size) return size
    if (presetStyles.size) return presetStyles.size
    return undefined // Let default handle it
  }
  
  // Handle press
  const handlePress = () => {
    if (onPress) {
      onPress()
    }
    
    if (onChange && typeof checked === 'boolean') {
      onChange(!checked)
    }
  }
  
  // Render label component
  const renderLabel = () => {
    if (!label) return null
    
    const labelContent = typeof label === 'string' ? (
      <Text 
        fontSize="$3" 
        color={disabled ? '$gray6' : '$gray11'}
        fontWeight="400"
        userSelect="none"
      >
        {label}
        {required && <Text color="$red6"> *</Text>}
      </Text>
    ) : label
    
    return (
      <Label 
        htmlFor={restProps.id || `checkbox-${label}`}
        paddingLeft={labelPosition === 'right' ? '$2' : 0}
        paddingRight={labelPosition === 'left' ? '$2' : 0}
        onPress={handlePress}
        cursor="pointer"
        flex={1}
      >
        {labelContent}
      </Label>
    )
  }
  
  // Render checkbox indicator
  const renderIndicator = () => {
    if (customIcon) {
      return customIcon
    }
    
    if (indeterminate) {
      return (
        <CustomCheckboxIndicator
          size={getCheckboxSize()}
          color={validationProps.variant === 'outline' ? 'outline' : 'default'}
        >
          <Minus color="currentColor" />
        </CustomCheckboxIndicator>
      )
    }
    
    return (
      <CustomCheckboxIndicator
        size={getCheckboxSize()}
        color={validationProps.variant === 'outline' ? 'outline' : 'default'}
      >
        <Check color="currentColor" />
      </CustomCheckboxIndicator>
    )
  }
  
  // Main checkbox component
  const checkboxComponent = (
    <CustomCheckbox
      ref={ref}
      // Apply preset styles
      {...presetStyles}
      
      // Apply validation variant
      variant={validationProps.variant}
      
      // Apply size
      size={getCheckboxSize()}
      
      // Apply shape from preset
      shape={presetStyles.shape || 'square'}
      
      // Apply indeterminate state
      indeterminate={indeterminate}
      
      // Apply disabled state
      disabled={disabled || presetStyles.disabled}
      
      // Controlled/uncontrolled checked state
      {...(checked !== undefined ? { checked } : {})}
      {...(defaultChecked !== undefined ? { defaultChecked } : {})}
      
      // Change handler
      {...(onChange ? { onCheckedChange: onChange } : {})}
      
      // Press handler
      {...(onPress ? { onPress: handlePress } : {})}
      
      // Other props
      {...restProps}
      
      // Border
      borderWidth={showBorder ? (presetStyles.borderWidth || 2) : 0}
    >
      {/* Checkbox frame */}
      <CustomCheckboxFrame
        size={getCheckboxSize()}
        {...(customUncheckedIcon && !checked && { children: customUncheckedIcon })}
      >
        {/* Checkbox indicator (only shows when checked) */}
        {renderIndicator()}
      </CustomCheckboxFrame>
    </CustomCheckbox>
  )
  
  return (
    <YStack gap="$1.5" width={restProps.width || 'auto'}>
      {/* Checkbox with label container */}
      <XStack 
        alignItems="center" 
        {...(restProps.flex && { flex: restProps.flex })}
      >
        {/* Label on left */}
        {label && labelPosition === 'left' && renderLabel()}
        
        {/* Checkbox */}
        {checkboxComponent}
        
        {/* Label on right (default) */}
        {label && labelPosition === 'right' && renderLabel()}
      </XStack>
      
      {/* Helper/Error Text */}
      {validationProps.helperText && (
        <Text 
          fontSize="$2" 
          color={validationProps.helperColor}
          paddingLeft={labelPosition === 'right' ? '$6' : '0'}
        >
          {validationProps.helperText}
        </Text>
      )}
    </YStack>
  )
})

AppCheckbox.displayName = 'AppCheckbox'

// Group component for multiple checkboxes
interface AppCheckboxGroupProps {
  children: React.ReactNode
  label?: string
  direction?: 'horizontal' | 'vertical'
  gap?: number | string
  required?: boolean
  error?: string
}

export const AppCheckboxGroup: React.FC<AppCheckboxGroupProps> = ({
  children,
  label,
  direction = 'vertical',
  gap = '$2',
  required,
  error,
}) => {
  const Container = direction === 'horizontal' ? XStack : YStack
  
  return (
    <YStack gap="$1.5">
      {/* Group Label */}
      {label && (
        <Text 
          fontSize="$3" 
          fontWeight="500"
          color="$gray11"
        >
          {label}
          {required && <Text color="$red6"> *</Text>}
        </Text>
      )}
      
      {/* Checkboxes */}
      <Container gap={gap} flexWrap="wrap">
        {children}
      </Container>
      
      {/* Group Error */}
      {error && (
        <Text fontSize="$2" color="$red7">
          {error}
        </Text>
      )}
    </YStack>
  )
}
// components/CustomDropdown.tsx
import React, { useState, useEffect, forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import fonts from 'mobile/constant/font';

// Define types
type DropdownVariant = 'outlined' | 'filled' | 'underlined' | 'unstyled';
type DropdownSize = 'small' | 'medium' | 'large';

interface DropdownItem {
  key?: string;
  value: string;
  [key: string]: any;
}

interface CustomDropdownProps {
  // Data
  data?: Array<string | DropdownItem>;
  setSelected?: (value: string) => void;
  onSelect?: (value: string) => void;
  defaultOption?: string;
  placeholder?: string;
  
  // Styling
  boxStyles?: ViewStyle;
  inputStyles?: TextStyle;
  dropdownStyles?: ViewStyle;
  dropdownItemStyles?: ViewStyle;
  dropdownTextStyles?: TextStyle;
  disabledItemStyles?: ViewStyle;
  disabledTextStyles?: TextStyle;
  
  // Variants
  variant?: DropdownVariant;
  size?: DropdownSize;
  
  // Features
  search?: boolean;
  searchPlaceholder?: string;
  maxHeight?: number;
  fontFamily?: string;
  
  // Icons
  arrowicon?: React.ReactNode;
  closeicon?: React.ReactNode;
  searchicon?: React.ReactNode;
  
  // State
  loading?: boolean;
  disabled?: boolean;
  
  // Validation
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  
  // Label - FIXED: This was causing the error
  label?: string;
  labelStyle?: TextStyle;
  
  // Helper text
  helperText?: string;
  helperTextStyle?: TextStyle;
  
  // Custom render
  renderItem?: (props: any) => JSX.Element;
  renderButton?: (props: any) => JSX.Element;
  
  // Other props
  default?: string;
  [key: string]: any;
}

const CustomDropdown = forwardRef<any, CustomDropdownProps>(({
  // Data
  data = [],
  setSelected,
  onSelect,
  defaultOption,
  placeholder = 'Select an option',
  
  // Styling
  boxStyles,
  inputStyles,
  dropdownStyles,
  dropdownItemStyles,
  dropdownTextStyles,
  disabledItemStyles,
  disabledTextStyles,
  
  // Variants
  variant = 'outlined',
  size = 'medium',
  
  // Features
  search = false,
  searchPlaceholder = 'Search...',
  maxHeight = 300,
  fontFamily,
  
  // Icons
  arrowicon,
  closeicon,
  searchicon,
  
  // State
  loading = false,
  disabled = false,
  
  // Validation
  error = false,
  errorMessage = '',
  required = false,
  
  // Label - FIXED: Now properly handled
  label,
  labelStyle,
  
  // Helper text
  helperText,
  helperTextStyle,
  
  // Custom render
  renderItem,
  renderButton,
  
  // Other props
  ...restProps
}, ref) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultOption || restProps.default || ''
  );
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (defaultOption) {
      setSelectedValue(defaultOption);
    }
  }, [defaultOption]);

  const handleSelect = (val: string) => {
    setSelectedValue(val);
    if (setSelected) setSelected(val);
    if (onSelect) onSelect(val);
  };

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: colors.gray1,
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: error ? colors.danger : colors.gray3,
        };
      case 'underlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 1.5,
          borderBottomColor: error ? colors.danger : colors.gray4,
          borderRadius: 0,
        };
      case 'unstyled':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          paddingHorizontal: 0,
        };
      case 'outlined':
      default:
        return {
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: error ? colors.danger : colors.gray4,
        };
    }
  };

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          minHeight: 36,
          paddingHorizontal: dimonds.space[3],
          paddingVertical: dimonds.space[2],
        };
      case 'large':
        return {
          minHeight: 56,
          paddingHorizontal: dimonds.space[5],
          paddingVertical: dimonds.space[4],
        };
      case 'medium':
      default:
        return {
          minHeight: 48,
          paddingHorizontal: dimonds.space[4],
          paddingVertical: dimonds.space[3],
        };
    }
  };

  // Get font size
  const getFontSize = () => {
    switch (size) {
      case 'small': return 12;
      case 'large': return 16;
      case 'medium': 
      default: return 14;
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const fontSize = getFontSize();

  // Transform data to required format
  const formattedData = data.map((item, index) => {
    if (typeof item === 'string') {
      return { key: index.toString(), value: item };
    }
    if (item && typeof item === 'object' && 'value' in item) {
      return item;
    }
    return { key: index.toString(), value: String(item) };
  });

  // Focus styles
  const focusStyles = isFocused && !error && !disabled ? {
    borderColor: colors.primary,
    borderBottomColor: variant === 'underlined' ? colors.primary : undefined,
  } : {};

  // Default icons
  const defaultArrowIcon = (
    <View style={styles.arrowIcon}>
      <Text style={[styles.arrowText, disabled && styles.disabledText]}>▼</Text>
    </View>
  );

  const defaultCloseIcon = (
    <View style={styles.closeIcon}>
      <Text style={[styles.closeText, disabled && styles.disabledText]}>✕</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Label - FIXED: Now properly rendered */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      {/* Dropdown */}
      <SelectList
        ref={ref}
        setSelected={handleSelect}
        data={formattedData}
        save="value"
        
        // Placeholder
        placeholder={loading ? 'Loading...' : placeholder}
        
        // Styling
        boxStyles={[
          styles.box,
          variantStyles,
          sizeStyles,
          focusStyles,
          disabled && styles.disabled,
          boxStyles,
        ]}
        inputStyles={[
          styles.input,
          { fontSize },
          disabled && styles.disabledText,
          inputStyles,
        ]}
        dropdownStyles={[
          styles.dropdown,
          dropdownStyles,
        ]}
        dropdownItemStyles={[
          styles.dropdownItem,
          dropdownItemStyles,
        ]}
        dropdownTextStyles={[
          styles.dropdownText,
          { fontSize: fontSize - 1 },
          dropdownTextStyles,
        ]}
        disabledItemStyles={[
          styles.disabledItem,
          disabledItemStyles,
        ]}
        disabledTextStyles={[
          styles.disabledText,
          disabledTextStyles,
        ]}
        
        // Icons
        arrowicon={arrowicon || defaultArrowIcon}
        closeicon={closeicon || defaultCloseIcon}
        searchicon={searchicon}
        
        // Search
        search={search}
        searchPlaceholder={searchPlaceholder}
        maxHeight={maxHeight}
        
        // Font
        fontFamily={fontFamily || fonts.reg}
        
        // State
        disabled={disabled}
        
        // Events
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        
        // Custom render
        renderItem={renderItem}
        renderButton={renderButton}
        
        {...restProps}
      />

      {/* Error Message */}
      {error && errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* Helper Text */}
      {helperText && !error ? (
        <Text style={[styles.helperText, helperTextStyle]}>
          {helperText}
        </Text>
      ) : null}

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: dimonds.space[3],
  },
  labelContainer: {
    marginBottom: dimonds.space[2],
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.med,
    color: colors.gray7,
  },
  required: {
    color: colors.danger,
  },
  box: {
    borderRadius: dimonds.radius[3],
    alignItems: 'center',
    shadowColor: colors.gray3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    fontFamily: fonts.reg,
    color: colors.gray9,
    flex: 1,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.gray3,
    borderRadius: dimonds.radius[3],
    marginTop: dimonds.space[1],
    backgroundColor: colors.white,
    shadowColor: colors.gray5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  dropdownText: {
    fontFamily: fonts.reg,
    color: colors.gray8,
  },
  disabled: {
    backgroundColor: colors.gray1,
    borderColor: colors.gray3,
    opacity: 0.7,
  },
  disabledText: {
    color: colors.gray5,
  },
  disabledItem: {
    backgroundColor: colors.gray1,
  },
  errorText: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.danger,
    marginTop: dimonds.space[1],
  },
  helperText: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.gray5,
    marginTop: dimonds.space[1],
  },
  arrowIcon: {
    padding: dimonds.space[2],
  },
  arrowText: {
    fontSize: 12,
    color: colors.gray6,
  },
  closeIcon: {
    padding: dimonds.space[2],
  },
  closeText: {
    fontSize: 14,
    color: colors.gray6,
  },
  loadingOverlay: {
    position: 'absolute',
    right: dimonds.space[4],
    // top: label ? 40 : 12,
  },
});

export default CustomDropdown;
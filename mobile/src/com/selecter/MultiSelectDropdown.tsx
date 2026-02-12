import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import fonts from 'mobile/constant/font';

const MultiSelectDropdown = ({
  data = [],
  setSelected,
  onSelect,
  placeholder = 'Select options',
  maxSelections,
  boxStyles,
  chipStyles,
  chipTextStyles,
  label,
  labelStyle,
  error = false,
  errorMessage,
  helperText,
  helperTextStyle,
  required = false,
  disabled = false,
  ...restProps
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Format data for display
  const formattedData = data.map((item, index) => {
    if (typeof item === 'string') {
      return { key: index.toString(), label: item, value: item };
    }
    return {
      key: item.key || index.toString(),
      label: item.name || item.label || item.value,
      value: item.value || item.name || item.label,
      ...item,
    };
  });

  const handleSelect = (item) => {
    let newSelected = [...selectedItems];
    const itemValue = item.value || item.label;
    
    if (selectedItems.includes(itemValue)) {
      newSelected = selectedItems.filter(i => i !== itemValue);
    } else {
      if (maxSelections && selectedItems.length >= maxSelections) {
        return;
      }
      newSelected.push(itemValue);
    }
    
    setSelectedItems(newSelected);
    if (setSelected) setSelected(newSelected);
    if (onSelect) onSelect(newSelected);
  };

  const removeItem = (val) => {
    const newSelected = selectedItems.filter(item => item !== val);
    setSelectedItems(newSelected);
    if (setSelected) setSelected(newSelected);
    if (onSelect) onSelect(newSelected);
  };

  const openDropdown = () => {
    if (!disabled) {
      setModalVisible(true);
    }
  };

  const closeDropdown = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      {/* Dropdown Button - This is what shows the chips/placeholder */}
      <TouchableOpacity
        onPress={openDropdown}
        activeOpacity={0.7}
        disabled={disabled}
        style={[
          styles.buttonContainer,
          boxStyles,
          error && styles.errorBorder,
          disabled && styles.disabled,
        ]}
      >
        {selectedItems.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipScrollView}
          >
            {selectedItems.map((item, index) => (
              <View key={index} style={[styles.chip, chipStyles]}>
                <Text style={[styles.chipText, chipTextStyles]}>{item}</Text>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation(); // Prevent opening dropdown
                    removeItem(item);
                  }}
                  style={styles.chipClose}
                  disabled={disabled}
                >
                  <Text style={styles.chipCloseText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={[styles.placeholder, disabled && styles.disabledText]}>
            {placeholder}
          </Text>
        )}
        <Text style={[styles.arrow, disabled && styles.disabledText]}>▼</Text>
      </TouchableOpacity>

      {/* Helper Text */}
      {helperText && !error && (
        <Text style={[styles.helperText, helperTextStyle]}>
          {helperText}
        </Text>
      )}

      {/* Error Message */}
      {error && errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      {/* Dropdown Modal - This shows the list of options */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeDropdown}
        >
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Select {label || 'options'}</Text>
              <TouchableOpacity onPress={closeDropdown} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={formattedData}
              keyExtractor={(item) => item.key}
              style={styles.dropdownList}
              renderItem={({ item }) => {
                const isSelected = selectedItems.includes(item.value);
                return (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      isSelected && styles.selectedItem,
                    ]}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={[
                      styles.dropdownText,
                      isSelected && styles.selectedText,
                    ]}>
                      {item.label}
                    </Text>
                    {isSelected && (
                      <View style={styles.checkbox}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
            
            <View style={styles.dropdownFooter}>
              <TouchableOpacity 
                style={styles.doneButton}
                onPress={closeDropdown}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

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
  // Button Styles
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray4,
    borderRadius: dimonds.radius[3],
    backgroundColor: colors.white,
    paddingHorizontal: dimonds.space[3],
    paddingVertical: dimonds.space[2],
    minHeight: 48,
    width: '100%',
  },
  chipScrollView: {
    flex: 1,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blue1,
    borderRadius: dimonds.radius[2],
    paddingVertical: dimonds.space[1],
    paddingLeft: dimonds.space[2],
    paddingRight: dimonds.space[1],
    marginRight: dimonds.space[2],
    borderWidth: 1,
    borderColor: colors.blue3,
  },
  chipText: {
    fontSize: 12,
    fontFamily: fonts.med,
    color: colors.blue7,
    marginRight: dimonds.space[1],
  },
  chipClose: {
    padding: dimonds.space[1],
  },
  chipCloseText: {
    fontSize: 12,
    color: colors.blue7,
    fontWeight: 'bold',
  },
  placeholder: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.reg,
    color: colors.gray5,
  },
  arrow: {
    fontSize: 12,
    color: colors.gray6,
    paddingLeft: dimonds.space[2],
  },
  // Helper & Error
  helperText: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.gray5,
    marginTop: dimonds.space[1],
  },
  errorText: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.danger,
    marginTop: dimonds.space[1],
  },
  errorBorder: {
    borderColor: colors.danger,
  },
  disabled: {
    backgroundColor: colors.gray1,
    opacity: 0.7,
  },
  disabledText: {
    color: colors.gray5,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: dimonds.space[4],
  },
  dropdownContainer: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    backgroundColor: colors.white,
    borderRadius: dimonds.radius[4],
    overflow: 'hidden',
    shadowColor: colors.gray9,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray3,
    backgroundColor: colors.gray1,
  },
  dropdownTitle: {
    fontSize: 16,
    fontFamily: fonts.bol,
    color: colors.gray8,
  },
  closeButton: {
    padding: dimonds.space[2],
  },
  closeButtonText: {
    fontSize: 16,
    color: colors.gray6,
    fontWeight: 'bold',
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  selectedItem: {
    backgroundColor: colors.blue1,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: fonts.reg,
    color: colors.gray8,
  },
  selectedText: {
    color: colors.primary,
    fontFamily: fonts.med,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dropdownFooter: {
    padding: dimonds.space[4],
    borderTopWidth: 1,
    borderTopColor: colors.gray3,
    backgroundColor: colors.gray1,
  },
  doneButton: {
    backgroundColor: colors.primary,
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderRadius: dimonds.radius[3],
    alignItems: 'center',
  },
  doneButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.med,
  },
});

export default MultiSelectDropdown;
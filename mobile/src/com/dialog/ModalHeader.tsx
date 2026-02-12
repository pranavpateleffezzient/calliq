// components/ModalHeader.jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import fonts from 'mobile/constant/font';

const ModalHeader = ({
  title,
  onClose,
  showCloseButton = true,
  closeButtonText = 'Close',
  closeButtonStyle,
  closeButtonTextStyle,
  titleStyle,
  containerStyle,
  showBorderBottom = true,
}) => {
  return (
    <View style={[
      styles.headerContainer,
      showBorderBottom && styles.headerBorder,
      containerStyle,
    ]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      
      {showCloseButton && onClose && (
        <TouchableOpacity
          onPress={onClose}
          style={[styles.closeButton, closeButtonStyle]}
        >
          <Text style={[styles.closeButtonText, closeButtonTextStyle]}>
            {closeButtonText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: dimonds.space[3],
    marginBottom: dimonds.space[3],
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray3,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bol,
    color: colors.gray9,
    flex: 1,
  },
  closeButton: {
    padding: dimonds.space[2],
    paddingHorizontal: dimonds.space[3],
  },
  closeButtonText: {
    color: colors.primary,
    fontFamily: fonts.med,
    fontSize: 14,
  },
});

export default ModalHeader;
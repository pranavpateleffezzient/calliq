// components/Header.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface HeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  onLeftPress?: () => void;
  rightComponent?: React.ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  backgroundColor?: string;
  titleColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  onLeftPress,
  rightComponent,
  containerStyle,
  titleStyle,
  backgroundColor = '#fff',
  titleColor = '#000',
}) => {
  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={backgroundColor === '#fff' ? 'dark-content' : 'light-content'}
      />
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        <View style={[styles.container, containerStyle]}>
          {/* Left Section */}
          <View style={styles.leftSection}>
            {leftIcon && (
              <TouchableOpacity
                onPress={onLeftPress}
                style={styles.iconButton}
                activeOpacity={0.7}>
                {leftIcon}
              </TouchableOpacity>
            )}
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={[styles.title, { color: titleColor }, titleStyle]}>
              {title}
            </Text>
          </View>

          {/* Right Section - Custom Component */}
          <View style={styles.rightSection}>
            {rightComponent && rightComponent}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: 'transparent',
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 3,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  iconButton: {
    padding: 8,
    marginLeft: -8,
  },
});

export default Header;
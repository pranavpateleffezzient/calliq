import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import tamaguiConfig from '../../tamagui.config';
import { TamaguiProvider } from '@tamagui/core';
import { AppButton } from '../com/button/AppButton';
import fonts from 'mobile/constant/font';
import { Image } from 'react-native-svg';

export default function ui_fix() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topCircle} />
      <View style={styles.bottomLeftCircle} />
      <View style={styles.bottomRightCircle} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0
        }
        style={{ flex: 1 }}
      >
        <StatusBar barStyle="dark-content" />

        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.appName}>Log in</Text>

            <TextInput style={styles.input} />
            <TextInput style={styles.input} secureTextEntry />

            <Button title="Login" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  appName: {
    textAlign: 'center',
    fontSize: 28,
    color: '#0000',
    zIndex: 1,
    marginBottom: 40,
    // fontFamily: Font_Bold,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#7C8DB5',
    // fontFamily: Font_Medium,
  },
  loginBtn: {
    backgroundColor: '#000',
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 0.5,
    marginHorizontal: 5,
    marginTop: 2,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialText: {
    // fontFamily: Font_SemiBold,
  },
  topCircle: {
    position: 'absolute',
    top: -height * 0.18,
    right: -width * 0.3,
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#FEDED4',
    borderRadius: width,
  },
  bottomLeftCircle: {
    position: 'absolute',
    bottom: -height * 0.25,
    left: -width * 0.4,
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#FEDED4',
    borderRadius: width,
  },
  bottomRightCircle: {
    position: 'absolute',
    bottom: -height * 0.15,
    right: -width * 0.5,
    width: width * 0.9,
    height: width * 0.9,
    backgroundColor: '#FEDED4',
    borderRadius: width,
  },
});

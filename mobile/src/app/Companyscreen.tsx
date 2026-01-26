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
} from 'react-native';
// import { AppInput } from '../com/input/AppInput';
const { width, height } = Dimensions.get('window');
import tamaguiConfig from '../../tamagui.config';
import { TamaguiProvider } from '@tamagui/core';
import { AppButton } from '../com/button/AppButton';
// import { Image } from 'tamagui';
import fonts from 'mobile/constant/font';
import { Image } from 'react-native-svg';
import { AppInput } from '../com/input/AppInput';

export default function Companyscreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <TamaguiProvider config={tamaguiConfig}>
    <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        {/* Blue Header */}
        <View style={styles.header}>
          {/* <Text style={styles.backArrow}>←</Text>
             <Text style={styles.headerTitle}>Sign in</Text> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Image
              source={require('../assets/only_logo_1024.png')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 25,
              }}
            />
          </View>

          {/* Decorative circles */}
          <View style={styles.circleLarge} />
          <View style={styles.circleSmall} />
        </View>

        {/* White Card */}
        <View style={styles.card}>
          <Animated.View
            style={{
              flex: 1,
              opacity,
            }}
          >
            <Text style={styles.welcome}>Sign up</Text>
            <Text style={styles.subText}>
              Hello there, sign up for create new account!
            </Text>
            <AppInput
              preset={['default', 'fullWidth']}
              placeholder="Enter your Name"
              marginTop={'$2'}
              paddingHorizontal={'$4'}
              fontSize={15}
              label="Name"
              required
              fontFamily={fonts.reg}
            />
            <AppInput
              preset={['default', 'fullWidth']}
              placeholder="Enter your username or email"
              marginTop={'$2'}
              paddingHorizontal={'$4'}
              fontSize={15}
              label="Username or email"
              required
              fontFamily={fonts.reg}
            />

            <AppInput
              preset={['default', 'fullWidth']}
              placeholder="Enter your password"
              marginTop={'$2'}
              paddingHorizontal={'$4'}
              fontSize={15}
              label="Password"
              required
            />

            <AppButton
              preset={['primary', 'medium', 'rounded']}
              style={{ marginTop: 40 }}
              fontFamily={fonts.bol}
            >
              Sign up
            </AppButton>
            {/* <AppButton
              preset={['outline', 'medium', 'rounded']}
              style={{ marginTop: 10 }}
              fontFamily={fonts.bol}
              icon={
                <Image
                  source={require('../assets/google.png')}
                  style={{ width: 18, height: 18 }}
                  resizeMode="contain"
                />
              }
            >
              Google Sign in
            </AppButton> */}

            {/* Footer */}
            <Text style={styles.footerText} fontFamily={fonts.reg}>
              If you have an account? <Text style={styles.signup}>Sign in</Text>
            </Text>
          </Animated.View>
        </View>
      </View> 
    </TamaguiProvider>


  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A4EDC',
  },

  /* Header */
  header: {
    height: 200,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    paddingHorizontal: 20,
    backgroundColor: '#0A4EDC',
    overflow: 'hidden',
  },
  backArrow: {
    color: '#fff',
    fontSize: 22,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    marginTop: 20,
  },

  circleLarge: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -60,
    right: -80,
  },
  circleSmall: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: 40,
    right: -40,
  },

  /* Card */
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },

  welcome: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0A1F44',
  },
  subText: {
    fontSize: 14,
    color: '#7C8DB5',
    marginTop: 6,
    marginBottom: 24,
  },

  label: {
    fontSize: 13,
    color: '#7C8DB5',
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F6FB',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#0A1F44',
  },

  forgot: {
    fontSize: 13,
    color: '#0A4EDC',
    marginTop: 12,
    alignSelf: 'flex-start',
  },

  button: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#D9E3F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: {
    color: '#8FA8D8',
    fontSize: 16,
    fontWeight: '600',
  },

  footerText: {
    marginTop: 24,
    fontSize: 13,
    color: '#7C8DB5',
    textAlign: 'center',
  },
  signup: {
    color: '#0A4EDC',
    fontWeight: '600',
  },
});


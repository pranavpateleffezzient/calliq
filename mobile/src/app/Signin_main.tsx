import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { AppInput } from '../com/input/AppInput';
const { width, height } = Dimensions.get('window');
import tamaguiConfig from '../../tamagui.config';
import { TamaguiProvider } from '@tamagui/core';
import { AppButton } from '../com/button/AppButton';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { Image, Text } from 'tamagui';
import fonts from '../../constant/font';
import { Animated, Easing } from 'react-native';
import { loginApi } from '@core/api';
import { mobileTokenStorage } from '../storage/token.storage';
export default function Signin_main() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const opacity = useRef(new Animated.Value(0)).current;
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [success, setSuccess] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors: any = {};
    let newSuccess: any = {};

    // Username / Email
    if (!username.trim()) {
      newErrors.username = 'Username or email is required';
    } else if (!username.includes('@') && username.length < 3) {
      newErrors.username = 'Enter a valid username or email';
    } else {
      newSuccess.username = 'Looks good';
    }

    // Password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 5) {
      newErrors.password = 'Password must be at least 6 characters';
    } else {
      newSuccess.password = 'Strong enough';
    }

    setErrors(newErrors);
    setSuccess(newSuccess);

    // If no errors → valid
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    console.log('Logging in with:', { username, password });
    const islogin = await login({ username, password });
    if (islogin) {
      setLoading(false);
      Alert.alert('Sig in Done');
    } else {
      Alert.alert('Sig in Fail');
    }
    // 🔐 API call here
  };
  // 'ashish22@test.com' 98765
  const login = async (data: any) => {
    const payload = {
      email: data.username,
      password: data.password,
    };

    const response = await loginApi(payload);
    console.log(
      'response.token--------------',
      JSON.stringify(response.data.token),
    );
    if (response.data.token) {
      mobileTokenStorage.setToken(response.data.token);
      return true;
    }
    return false;
  };

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
            <Text style={styles.welcome}>Welcome Back</Text>
            <Text style={styles.subText}>
              Hello there, sign in to continue!
            </Text>

            <AppInput
              preset={['default', 'fullWidth']}
              placeholder="Enter your username or email"
              marginTop={'$2'}
              paddingHorizontal={'$4'}
              fontSize={15}
              label="Username or email"
              required
              fontFamily={fonts.reg}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setErrors((prev) => ({ ...prev, username: undefined }));
              }}
              error={errors.username}
              success={success.username}
            />

            <AppInput
              preset={['default', 'fullWidth']}
              placeholder="Enter your password"
              marginTop={'$2'}
              paddingHorizontal={'$4'}
              fontSize={15}
              label="Password"
              required
              isPassword
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              error={errors.password}
              success={success.password}
            />

            <AppButton
              preset={['primary', 'medium', 'rounded']}
              style={{ marginTop: 40 }}
              fontFamily={fonts.bol}
              disabled={loading}
              onPress={handleLogin}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </AppButton>
            <AppButton
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
            </AppButton>

            {/* Footer */}
            <Text style={styles.footerText} fontFamily={fonts.reg}>
              Don’t have an account? <Text style={styles.signup}>Sign up</Text>
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
    fontWeight: '600',
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
    color: '#0A1F44',
    fontFamily: fonts.bol,
  },
  subText: {
    fontSize: 14,
    color: '#7C8DB5',
    marginTop: 6,
    marginBottom: 24,
    fontFamily: fonts.reg,
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

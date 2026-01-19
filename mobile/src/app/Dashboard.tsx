import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { AppInput } from '../com/input/AppInput';
const { width, height } = Dimensions.get('window');
import tamaguiConfig from '../../tamagui.config'
import { TamaguiProvider } from '@tamagui/core'
export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with:', { username, password });
  };
  return (
    <TamaguiProvider config={tamaguiConfig}>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="$primary" />

      {/* Blue Header */}
      <View style={styles.header}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.headerTitle}>Sign in</Text>

        {/* Decorative circles */}
        <View style={styles.circleLarge} />
        <View style={styles.circleSmall} />
      </View>

      {/* White Card */}
      <View style={styles.card}>
        <Text style={styles.welcome}>Welcome Back</Text>
        <Text style={styles.subText}>Hello there, sign in to continue!</Text>

        {/* Username */}
        <Text style={styles.label}>Username or email</Text>
        <TextInput
          placeholder="Enter your username or email"
          placeholderTextColor="#B0B7C3"
          style={styles.input}
        />

        <AppInput
            preset="default"
            placeholder="Filled input"
          />

        {/* Password */}
        <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#B0B7C3"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Don’t have an account? <Text style={styles.signup}>Sign up</Text>
        </Text>
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
    height: 230,
    paddingTop: 50,
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

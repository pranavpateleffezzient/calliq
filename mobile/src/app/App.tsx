import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';

import SigninIcon from '../../src/assets/login-svgrepo-com.svg';
import phone_call from '../../src/assets/phone-call.svg';
import Setting from '../../src/assets/settings.svg';
import User from '../../src/assets/user.svg';

import Signin_main from './Signin_main';
import Signup from './signup';
import call_dialer from './call_dialer';
import Companyscreen from './Companyscreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');
const TAB_COUNT = 4;
const TAB_WIDTH = (width - 32) / TAB_COUNT;

export const TAB_CONFIG = {
  Signin: {
    icon: SigninIcon,
    label: 'Sign In',
  },
  Signup: {
    icon: phone_call,
    label: 'Sign Up',
  },
  call_dialer: {
    icon: Setting,
    label: 'Calls',
  },
  Companyscreen: {
    icon: User,
    label: 'Company',
  },
};

function MyTabBar({ state, navigation }) {
  const { colors } = useTheme();
  const activeColor = '#007AFF';
  const inactiveColor = '#8E8E93';
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  }, [state.index]);

  const handlePress = (routeName, index) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.tabContainer}>
      {/* Animated Slider */}
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{ translateX: slideAnim }],
            width: TAB_WIDTH - 24,
          },
        ]}
      />

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tab = TAB_CONFIG[route.name];
        if (!tab) return null;

        const Icon = tab.icon;

        return (
          <View
            key={route.key}
            style={styles.tabWrapper}
          >
            <PlatformPressable
              onPress={() => handlePress(route.name, index)}
              style={styles.tabPressable}
              android_ripple={{ color: 'transparent' }}
              pressOpacity={1}
            >
              <View style={styles.tabItem}>
                <View
                  style={[
                    styles.iconContainer,
                    isFocused && styles.activeIconContainer,
                  ]}
                >
                  <Icon
                    width={24}
                    height={24}
                    fill={isFocused ? '#007AFF' : inactiveColor}
                  />
                </View>
                <Text
                  style={[
                    styles.label,
                    { color: isFocused ? '#007AFF' : inactiveColor },
                    isFocused && styles.activeLabel,
                  ]}
                  numberOfLines={1}
                >
                  {tab.label}
                </Text>
              </View>
            </PlatformPressable>
          </View>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tab.Screen name="Signin" component={Signin_main} />
        <Tab.Screen name="Signup" component={Signup} />
        <Tab.Screen name="call_dialer" component={call_dialer} />
        <Tab.Screen name="Companyscreen" component={Companyscreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  tabWrapper: {
    flex: 1,
    position: 'relative',
  },
  tabPressable: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  slider: {
    position: 'absolute',
    height: 56,
    backgroundColor: '#F2F8FF',
    borderRadius: 20,
    top: 7,
    left: 12,
    zIndex: 0,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    backgroundColor: '#F2F8FF',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: '#8E8E93',
    letterSpacing: 0.2,
    marginTop: 2,
  },
  activeLabel: {
    fontWeight: '600',
    color: '#007AFF',
  },
});
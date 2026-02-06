import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';

import SigninIcon from '../../assets/login-svgrepo-com.svg';
import phone_call from '../../assets/phone-call.svg';
import Setting from '../../assets/settings.svg';
import User from '../../assets/user.svg';
import Homescreen from '../bottom_navigation/Homescreen';
import Profilescreen from '../bottom_navigation/Profilescreen';
import call_dialer from '../bottom_navigation/Taskscreen';
import Settingscrren from './Settingscrren';
import Taskscreen from '../bottom_navigation/Taskscreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin_main from '../Signin_main';
import From_demo from '../From_demo';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');
const TAB_COUNT = 4;
const TAB_WIDTH = (width - 32) / TAB_COUNT;
const Stack = createNativeStackNavigator();

export const TAB_CONFIG = {
  Homescreen: {
    icon: SigninIcon,
  },
  Taskscreen: {
    icon: phone_call,
  },
  Settingscrren: {
    icon: Setting,
  },
  Profilescreen: {
    icon: User,
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
          <View key={route.key} style={styles.tabWrapper}>
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
              </View>
            </PlatformPressable>
          </View>
        );
      })}
    </View>
  );
}
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomescreenMain" component={Homescreen} />
      <Stack.Screen
        name="Signin_main"
        component={From_demo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profilescreen" component={Profilescreen} />
      <Stack.Screen
        name="Signin_main"
        component={From_demo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SettingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settingscrren" component={Settingscrren} />
      <Stack.Screen
        name="Signin_main"
        component={From_demo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TaskStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Taskscreen" component={Taskscreen} />
      <Stack.Screen
        name="Signin_main"
        component={From_demo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function Dashboard() {
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tab.Screen name="Homescreen" component={HomeStack} />
        <Tab.Screen name="Profilescreen" component={ProfileStack} />
        <Tab.Screen name="Settingscrren" component={SettingStack} />
        <Tab.Screen name="Taskscreen" component={TaskStack} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 50,
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
    borderRadius: 50,
    top: 7,
    left: 12,
    zIndex: 0,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 50,
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

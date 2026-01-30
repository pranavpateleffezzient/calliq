import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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
const {width} = Dimensions.get('window');

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
  const activeColor = '#007AFF'; // Blue color for active state
  const inactiveColor = '#666'; // Gray color for inactive state

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const tab = TAB_CONFIG[route.name];
        if (!tab) return null;

        const Icon = tab.icon;

        return (
          <PlatformPressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[
              styles.tabItem,
              isFocused && styles.activeTabItem,
            ]}
          >
            <View style={[
              styles.iconContainer,
              isFocused && styles.activeIconContainer
            ]}>
              <Icon
                width={22}
                height={22}
                fill={isFocused ? '#fff' : inactiveColor}
              />
            </View>
            <Text
              style={[
                styles.label,
                { color: isFocused ? activeColor : inactiveColor },
                isFocused && styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </PlatformPressable>
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
    height: 75,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  activeTabItem: {
    backgroundColor: '#007AFF',
    borderRadius: 30,
    margin: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666',
  },
  activeLabel: {
    color: '#fff',
    fontWeight: '600',
  },
  // Update the icon fill in the component
  // fill={isFocused ? '#fff' : inactiveColor}
});
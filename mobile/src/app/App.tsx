import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';

import SigninIcon from '../../src/assets/login-svgrepo-com.svg';
import phone_call from '../../src/assets/phone-call.svg';
import Setting from '../../src/assets/settings.svg';
import User from '../../src/assets/user.svg';

import Signin_main from './Signin_main';
import Signup from './signup';

const Tab = createBottomTabNavigator();
const {height,width} = Dimensions.get('window');

export const TAB_CONFIG = {
  Signin: {
    icon: SigninIcon,
    label: 'Sign In',
  },
  Signup: {
    icon: phone_call,
    label: 'Sign Up',
  },
  Home: {
    icon: Setting,
    label: 'Sign In',
  },
  Profile: {
    icon: User,
    label: 'Sign Up',
  },
};

function MyTabBar({ state, navigation }) {
  const { colors } = useTheme();

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
            onPress={() => !isFocused && navigation.navigate(route.name)}
            style={styles.tabItem}
          >
            <Icon
              width={24}
              height={24}
              fill={isFocused ? colors.primary : '#999'}
            />
            <Text
              style={[
                styles.label,
                { color: isFocused ? colors.primary : '#999' },
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
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tab.Screen name="Signin" component={Signin_main} />
        <Tab.Screen name="Signup" component={Signup} />
        <Tab.Screen name="Signin" component={Signin_main} />
        <Tab.Screen name="Signup" component={Signup} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    elevation: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import Signin_main from 'mobile/src/app/Signin_main';
import signup from 'mobile/src/app/signup';
import AnimatedFormScreen from 'mobile/src/app/AnimatedFormScreen';
import Companyscreen from 'mobile/src/app/Companyscreen';

// Import your screens
// import Signin_main from './';
// import SearchScreen from './screens/signup';
// import FavoritesScreen from './screens/Sign';
// import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={Signin_main}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen 
          name="signup" 
          component={signup}
          options={{
            tabBarLabel: 'signup',
          }}
        />
        <Tab.Screen 
          name="AnimatedFormScreen" 
          component={AnimatedFormScreen}
          options={{
            tabBarLabel: 'AnimatedFormScreen',
          }}
        />
        <Tab.Screen 
          name="Companyscreen" 
          component={Companyscreen}
          options={{
            tabBarLabel: 'Companyscreen',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
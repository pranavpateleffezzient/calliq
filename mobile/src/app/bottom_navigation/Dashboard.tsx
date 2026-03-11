// import React, { useRef, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   Keyboard,
//   Platform,
// } from 'react-native';
// import { NavigationContainer, useTheme } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { PlatformPressable } from '@react-navigation/elements';

// import SigninIcon from '../../assets/login-svgrepo-com.svg';
// import phone_call from '../../assets/phone-call.svg';
// import Setting from '../../assets/settings.svg';
// import User from '../../assets/user.svg';
// import Homescreen from '../bottom_navigation/Homescreen';
// import Profilescreen from '../bottom_navigation/Profilescreen';
// import call_dialer from '../bottom_navigation/Taskscreen';
// import Settingscrren from './Settingscrren';
// import Taskscreen from '../bottom_navigation/Taskscreen';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Signin_main from '../Signin_main';
// import From_demo from '../From_demo';
// import { KeyboardAvoidingView } from 'react-native';

// const Tab = createBottomTabNavigator();
// const { width } = Dimensions.get('window');
// const TAB_COUNT = 4;
// const TAB_WIDTH = (width - 32) / TAB_COUNT;
// const Stack = createNativeStackNavigator();

// export const TAB_CONFIG = {
//   Homescreen: {
//     icon: SigninIcon,
//   },
//   Taskscreen: {
//     icon: phone_call,
//   },
//   Settingscrren: {
//     icon: Setting,
//   },
//   Profilescreen: {
//     icon: User,
//   },
// };

// function MyTabBar({ state, navigation, keyboardVisible }) {
//   const { colors } = useTheme();
//   const activeColor = '#007AFF';
//   const inactiveColor = '#8E8E93';
//   const slideAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.spring(slideAnim, {
//       toValue: state.index * TAB_WIDTH,
//       useNativeDriver: true,
//       tension: 100,
//       friction: 10,
//     }).start();
//   }, [state.index]);

//   const handlePress = (routeName, index) => {
//     navigation.navigate(routeName);
//   };

//   return (
//     <View style={styles.tabContainer}>
//       {/* Animated Slider */}
//       <Animated.View
//         style={[
//           styles.slider,
//           {
//             transform: [{ translateX: slideAnim }],
//             width: TAB_WIDTH - 24,
//           },
//         ]}
//       />

//       {state.routes.map((route, index) => {
//         const isFocused = state.index === index;
//         const tab = TAB_CONFIG[route.name];
//         if (!tab) return null;

//         const Icon = tab.icon;

//         return (
//           <View key={route.key} style={styles.tabWrapper}>
//             <PlatformPressable
//               onPress={() => handlePress(route.name, index)}
//               style={styles.tabPressable}
//               android_ripple={{ color: 'transparent' }}
//               pressOpacity={1}
//             >
//               <View style={styles.tabItem}>
//                 <View
//                   style={[
//                     styles.iconContainer,
//                     isFocused && styles.activeIconContainer,
//                   ]}
//                 >
//                   <Icon
//                     width={24}
//                     height={24}
//                     fill={isFocused ? '#007AFF' : inactiveColor}
//                   />
//                 </View>
//               </View>
//             </PlatformPressable>
//           </View>
//         );
//       })}
//     </View>
//   );
// }
// function HomeStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Taskscreen" component={Taskscreen} />

//       <Stack.Screen
//         name="Signin_main"
//         component={From_demo}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

// function ProfileStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Profilescreen" component={Profilescreen} />
//       <Stack.Screen
//         name="Signin_main"
//         component={From_demo}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

// function SettingStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Settingscrren" component={Settingscrren} />
//       <Stack.Screen
//         name="Signin_main"
//         component={From_demo}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

// function TaskStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="HomescreenMain" component={Homescreen} />

//       <Stack.Screen
//         name="Signin_main"
//         component={From_demo}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

// export default function Dashboard() {
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const translateY = useRef(new Animated.Value(0)).current;
//   useEffect(() => {
//     Animated.timing(translateY, {
//       toValue: keyboardVisible ? 120 : 0, 
//       duration: 350,
//       useNativeDriver: true,
//     }).start();
//   }, [keyboardVisible]);
//   useEffect(() => {
//     const show = Keyboard.addListener(
//       Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
//       () => {
//         setKeyboardVisible(true);
//       },
//     );

//     const hide = Keyboard.addListener(
//       Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
//       () => {
//         setKeyboardVisible(false);
//       },
//     );

//     return () => {
//       show.remove();
//       hide.remove();
//     };
//   }, []);
//   return (

//     <View style={{ flex: 1,backgroundColor:'#000' }}>
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//         tabBar={(props) => (
//           <Animated.View style={{  transform: [{ translateY }],
//           // position: 'absolute',
//           bottom: 0,
//           left: 0,
//           right: 0, 
//           }}>
//             <MyTabBar {...props} keyboardVisible={keyboardVisible} />
//           </Animated.View>
//         )}
//       >
//         <Tab.Screen name="Homescreen" component={HomeStack} />
//         <Tab.Screen name="Profilescreen" component={ProfileStack} />
//         <Tab.Screen name="Settingscrren" component={SettingStack} />
//         <Tab.Screen name="Taskscreen" component={TaskStack} />
//       </Tab.Navigator>
//   </View>

  
//   );
// }

// const styles = StyleSheet.create({
//   tabContainer: {
//     flexDirection: 'row',
//     height: 70,
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginBottom: 10,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: '#F0F0F0',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 6,
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   tabWrapper: {
//     flex: 1,
//     position: 'relative',
//   },
//   tabPressable: {
//     flex: 1,
//   },
//   tabItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//   },
//   slider: {
//     position: 'absolute',
//     height: 56,
//     backgroundColor: '#F2F8FF',
//     borderRadius: 50,
//     top: 7,
//     left: 12,
//     zIndex: 0,
//   },
//   iconContainer: {
//     width: 44,
//     height: 44,
//     borderRadius: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 4,
//     backgroundColor: 'transparent',
//   },
//   activeIconContainer: {
//     backgroundColor: '#F2F8FF',
//   },
//   label: {
//     fontSize: 10,
//     fontWeight: '500',
//     color: '#8E8E93',
//     letterSpacing: 0.2,
//     marginTop: 2,
//   },
//   activeLabel: {
//     fontWeight: '600',
//     color: '#007AFF',
//   },
// });
import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import {
  View, StyleSheet, Dimensions, Animated,
  Keyboard, Platform, StatusBar
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';  // ← MUST HAVE

import SigninIcon from '../../assets/login-svgrepo-com.svg';
import phone_call from '../../assets/phone-call.svg';
import Setting from '../../assets/settings.svg';
import User from '../../assets/user.svg';
import Homescreen from '../bottom_navigation/Homescreen';
import Profilescreen from '../bottom_navigation/Profilescreen';
import Settingscrren from './Settingscrren';
import Taskscreen from '../bottom_navigation/Taskscreen';
import From_demo from '../From_demo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const { width } = Dimensions.get('window');
const TAB_COUNT = 4;
const TAB_WIDTH = (width - 32) / TAB_COUNT;

// ─── Context ─────────────────────────────────────────────────────────────────
export const TabBarHeightContext = createContext(0);
export const useTabBarHeight = () => useContext(TabBarHeightContext);

export const TAB_CONFIG = {
  Homescreen:    { icon: SigninIcon },
  Taskscreen:    { icon: phone_call },
  Settingscrren: { icon: Setting },
  Profilescreen: { icon: User },
};

// ─── Tab Bar ──────────────────────────────────────────────────────────────────
function MyTabBar({ state, navigation, onHeightChange }) {
  const insets = useSafeAreaInsets();   // iPhone notch / Android gesture bar
  const slideAnim = useRef(new Animated.Value(0)).current;

  const activeColor   = '#007AFF';
  const inactiveColor = '#8E8E93';

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  }, [state.index]);

  return (
    <View
      // ✅ paddingBottom handles iPhone home indicator & Android gesture bar
      style={{ paddingBottom: insets.bottom }}
      onLayout={(e) => onHeightChange(e.nativeEvent.layout.height)}
    >
      <View style={styles.tabContainer}>
        {/* Slider */}
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
                onPress={() => navigation.navigate(route.name)}
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
                      fill={isFocused ? activeColor : inactiveColor}
                    />
                  </View>
                </View>
              </PlatformPressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

// ─── Stacks ───────────────────────────────────────────────────────────────────
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Taskscreen"  component={Taskscreen} />
      <Stack.Screen name="Signin_main" component={From_demo}  />
    </Stack.Navigator>
  );
}
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profilescreen" component={Profilescreen} />
      <Stack.Screen name="Signin_main"   component={From_demo}     />
    </Stack.Navigator>
  );
}
function SettingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settingscrren" component={Settingscrren} />
      <Stack.Screen name="Signin_main"   component={From_demo}     />
    </Stack.Navigator>
  );
}
function TaskStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomescreenMain" component={Homescreen} />
      <Stack.Screen name="Signin_main"    component={From_demo}  />
    </Stack.Navigator>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [tabBarHeight, setTabBarHeight]       = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  // ✅ Keyboard listeners — iOS uses Will, Android uses Did
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const show = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
    const hide = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));

    return () => { show.remove(); hide.remove(); };
  }, []);

  // ✅ Animate tab bar off-screen by exact measured height
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: keyboardVisible ? tabBarHeight : 0,
      duration: Platform.OS === 'ios' ? 250 : 200,  // iOS is slightly slower
      useNativeDriver: true,
    }).start();
  }, [keyboardVisible, tabBarHeight]);

  return (
    // ✅ Context sends 0 when keyboard is open so screens remove their padding
    <TabBarHeightContext.Provider value={keyboardVisible ? 0 : tabBarHeight}>
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          tabBar={(props) => (
            <Animated.View
              style={{
                transform: [{ translateY }],
                // ✅ Collapses the layout space so NO black gap remains
                marginTop: -tabBarHeight,
                zIndex: 99,
              }}
            >
              <MyTabBar
                {...props}
                onHeightChange={setTabBarHeight}
              />
            </Animated.View>
          )}
        >
          <Tab.Screen name="Homescreen"    component={HomeStack}    />
          <Tab.Screen name="Profilescreen" component={ProfileStack} />
          <Tab.Screen name="Settingscrren" component={SettingStack} />
          <Tab.Screen name="Taskscreen"    component={TaskStack}    />
        </Tab.Navigator>
      </View>
    </TabBarHeightContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',   // ✅ White instead of black — no gap flash
  },
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  tabWrapper:   { flex: 1 },
  tabPressable: { flex: 1 },
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
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    backgroundColor: '#F2F8FF',
  },
});
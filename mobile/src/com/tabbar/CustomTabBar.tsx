import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

const { width } = Dimensions.get('window');

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const animationValues = useRef(
    state.routes.map(() => new Animated.Value(1))
  ).current;

  const handlePress = (route, index, isFocused) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }

    // Animation on press
    Animated.sequence([
      Animated.timing(animationValues[index], {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(animationValues[index], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
      }),
    ]).start();
  };

  const getIconName = (routeName, isFocused) => {
    switch (routeName) {
      case 'Home':
        return isFocused ? 'home' : 'home-outline';
      case 'signup':
        return isFocused ? 'search' : 'search-outline';
      case 'AnimatedFormScreen':
        return isFocused ? 'heart' : 'heart-outline';
      case 'Companyscreen':
        return isFocused ? 'person' : 'person-outline';
      default:
        return 'square-outline';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const label = options.tabBarLabel || route.name;

          return (
            <TouchableWithoutFeedback
              key={route.key}
              onPress={() => handlePress(route, index, isFocused)}
              style={styles.tabButton}
            >
              <Animated.View
                style={[
                  styles.tabItem,
                  {
                    transform: [{ scale: animationValues[index] }],
                  },
                ]}
              >
                <View style={[
                  styles.iconContainer,
                  isFocused && styles.activeIconContainer
                ]}>
                  <Icon
                    name={getIconName(route.name, isFocused)}
                    size={24}
                    color={isFocused ? '#007AFF' : '#8E8E93'}
                    style={styles.icon}
                  />
                </View>
                <Animated.Text
                  style={[
                    styles.label,
                    {
                      color: isFocused ? '#007AFF' : '#8E8E93',
                      opacity: animationValues[index],
                    },
                  ]}
                >
                  {label}
                </Animated.Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 10,
  },
  tabButton: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  icon: {
    // Fixed size, no change on press
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default CustomTabBar;
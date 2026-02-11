// components/CustomModal.jsx
import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CustomModal = ({
  visible = false,
  onClose,
  children,
  animationType = 'slide', // 'slide', 'fade', 'zoom', 'none'
  position = 'center', // 'center', 'bottom', 'top'
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  backdropOpacity = 0.5,
  backgroundColor = colors.white,
  borderRadius = dimonds.radius[4],
  width = '90%',
  height = 'auto',
  maxHeight = '80%',
  padding = dimonds.space[4],
  showBackdrop = true,
  closeOnBackdropPress = true,
  closeOnBackPress = true,
  animationDuration = 300,
  style = {},
  containerStyle = {},
  avoidKeyboard = true,
  keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0,
  statusBarTranslucent = true,
  hardwareAccelerated = true,
  testID,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      startAnimation();
    } else {
      endAnimation();
    }
  }, [visible]);

  const startAnimation = () => {
    switch (animationType) {
      case 'slide':
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }).start();
        break;
      case 'fade':
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }).start();
        break;
      case 'zoom':
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }).start();
        break;
      default:
        break;
    }
  };

  const endAnimation = () => {
    switch (animationType) {
      case 'slide':
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: animationDuration,
          useNativeDriver: true,
        }).start();
        break;
      case 'fade':
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }).start();
        break;
      case 'zoom':
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: animationDuration,
          useNativeDriver: true,
        }).start();
        break;
      default:
        break;
    }
  };

  const getModalPosition = () => {
    const modalStyle = {
      backgroundColor,
      borderRadius,
      width: typeof width === 'string' ? width : width,
      height: height === 'auto' ? undefined : height,
      maxHeight,
      padding,
      ...containerStyle,
    };

    switch (position) {
      case 'center':
        return {
          ...styles.modalCenter,
          ...modalStyle,
        };
      case 'bottom':
        return {
          ...styles.modalBottom,
          ...modalStyle,
        };
      case 'top':
        return {
          ...styles.modalTop,
          ...modalStyle,
        };
      default:
        return {
          ...styles.modalCenter,
          ...modalStyle,
        };
    }
  };

  const getAnimatedStyle = () => {
    switch (animationType) {
      case 'slide':
        return {
          transform: [{ translateY: slideAnim }],
        };
      case 'fade':
        return {
          opacity: fadeAnim,
        };
      case 'zoom':
        return {
          transform: [{ scale: scaleAnim }],
        };
      default:
        return {};
    }
  };

  const handleBackdropPress = () => {
    if (closeOnBackdropPress && onClose) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={() => {
        if (closeOnBackPress && onClose) {
          onClose();
        }
      }}
      statusBarTranslucent={statusBarTranslucent}
      hardwareAccelerated={hardwareAccelerated}
      testID={testID}
    >
      <View style={styles.modalContainer}>
        {showBackdrop && (
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <View
              style={[
                styles.backdrop,
                {
                  backgroundColor: backdropColor,
                  opacity: backdropOpacity,
                },
              ]}
            />
          </TouchableWithoutFeedback>
        )}

        <Animated.View
          style={[
            getModalPosition(),
            getAnimatedStyle(),
            style,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: dimonds.radius[4],
    elevation: 5,
  },
  modalBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: dimonds.radius[6],
    borderTopRightRadius: dimonds.radius[6],
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: dimonds.radius[4],
    elevation: 5,
  },
  modalTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: dimonds.radius[6],
    borderBottomRightRadius: dimonds.radius[6],
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: dimonds.radius[4],
    elevation: 5,
  },
});

export default CustomModal;
// // import React from 'react';
// // import {
// //   Modal,
// //   View,
// //   TouchableOpacity,
// //   Text,
// //   StyleSheet,
// //   useWindowDimensions,
// // } from 'react-native';
// // import CalendarInline from './CalendarInline';
// // import colors from 'mobile/constant/colors';
// // import dimonds from 'mobile/constant/dimonds';
// // import { AppButton } from '../button/AppButton';
// // import fonts from 'mobile/constant/font';

// // export default function CalendarModal({
// //   visible,
// //   onClose,
// //   onChange,
// //   mode,
// //   themeVariant,
// //   closeButtonVisble = true,
// //   applyButtonVisible = true,
// //   ...props
// // }) {
// //   const { width } = useWindowDimensions();
// //   const modalHeight = width * 1.18;
// //   const calendarHeight = width * 0.6;
// //   return (
// //     <Modal visible={visible} transparent animationType="slide">
// //       <View style={styles.overlay}>
// //         <View style={[styles.container, { height: modalHeight }]}>
// //           <View style={{ height: calendarHeight }}>
// //             <CalendarInline
// //               mode={mode}
// //               themeVariant={themeVariant}
// //               onChange={onChange}
// //               {...props}
// //             />
// //           </View>

// //           <View
// //             style={{
// //               flexDirection: 'row',
// //               justifyContent: 'space-between',
// //               gap: 20,
// //               marginTop: 20,
// //               paddingHorizontal: 10,
// //             }}
// //           >
// //             {closeButtonVisble && (
// //               <AppButton
// //                 preset={['outline', 'medium', 'rounded']}
// //                 fontFamily={fonts.bol}
// //                 onPress={onClose}
// //                 style={{ flex: 1 }}
// //               >
// //                 Close
// //               </AppButton>
// //             )}

// //             {applyButtonVisible && (
// //               <AppButton
// //                 preset={['primary', 'medium', 'rounded']}
// //                 fontFamily={fonts.bol}
// //                 style={{ flex: 1 }}
// //               >
// //                 Apply
// //               </AppButton>
// //             )}
// //           </View>
// //         </View>
// //       </View>
// //     </Modal>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   overlay: {
// //     flex: 1,
// //     backgroundColor: '#00000066',
// //     justifyContent: 'center',
// //   },
// //   container: {
// //     backgroundColor: colors.white,
// //     margin: 20,
// //     borderRadius: dimonds.radius[4],
// //     padding: dimonds.space[4],
// //     height: 460,
// //     // height: width * 10,
// //     justifyContent: 'space-between',
// //   },
// //   btn: {
// //     backgroundColor: colors.primary,
// //     padding: 14,
// //     borderRadius: dimonds.radius[3],
// //     marginTop: 10,
// //   },
// //   txt: {
// //     color: colors.white,
// //     textAlign: 'center',
// //   },
// // });

// // import React from 'react';
// // import {
// //   Modal,
// //   View,
// //   TouchableOpacity,
// //   Text,
// //   StyleSheet,
// //   useWindowDimensions,
// // } from 'react-native';
// // import CalendarInline from './CalendarInline';
// // import colors from 'mobile/constant/colors';
// // import dimonds from 'mobile/constant/dimonds';
// // import { AppButton } from '../button/AppButton';
// // import fonts from 'mobile/constant/font';

// // export default function CalendarModal({
// //   visible,
// //   onClose,
// //   onChange,
// //   onApply, // New prop for apply button
// //   mode = 'single',
// //   themeVariant,
// //   closeButtonVisble = true,
// //   applyButtonVisible = true,
// //   selectedDates, // Prop to receive selected dates
// //   ...props
// // }) {
// //   const { width } = useWindowDimensions();
// //   const modalHeight = width * 1.18;
// //   const calendarHeight = width * 0.6;

// //   return (
// //     <Modal visible={visible} transparent animationType="slide">
// //       <View style={styles.overlay}>
// //         <View style={[styles.container, { height: modalHeight }]}>
// //           <View style={{ height: calendarHeight }}>
// //             <CalendarInline
// //               mode={mode}
// //               themeVariant={themeVariant}
// //               onChange={onChange}
// //               selectedDates={selectedDates} // Pass selected dates to calendar
// //               {...props}
// //             />
// //           </View>

// //           <View
// //             style={{
// //               flexDirection: 'row',
// //               justifyContent: 'space-between',
// //               gap: 20,
// //               marginTop: 20,
// //               paddingHorizontal: 10,
// //             }}
// //           >
// //             {closeButtonVisble && (
// //               <AppButton
// //                 preset={['outline', 'medium', 'rounded']}
// //                 fontFamily={fonts.bol}
// //                 onPress={onClose}
// //                 style={{ flex: 1 }}
// //               >
// //                 Close
// //               </AppButton>
// //             )}

// //             {applyButtonVisible && (
// //               <AppButton
// //                 preset={['primary', 'medium', 'rounded']}
// //                 fontFamily={fonts.bol}
// //                 onPress={onApply} // Add onPress handler
// //                 style={{ flex: 1 }}
// //               >
// //                 Apply
// //               </AppButton>
// //             )}
// //           </View>
// //         </View>
// //       </View>
// //     </Modal>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   overlay: {
// //     flex: 1,
// //     backgroundColor: '#00000066',
// //     justifyContent: 'center',
// //   },
// //   container: {
// //     backgroundColor: colors.white,
// //     margin: 20,
// //     borderRadius: dimonds.radius[4],
// //     padding: dimonds.space[4],
// //     height: 460,
// //     justifyContent: 'space-between',
// //   },
// //   btn: {
// //     backgroundColor: colors.primary,
// //     padding: 14,
// //     borderRadius: dimonds.radius[3],
// //     marginTop: 10,
// //   },
// //   txt: {
// //     color: colors.white,
// //     textAlign: 'center',
// //   },
// // });

// // CalendarModal.js
// // import React, { useEffect } from 'react';
// // import {
// //   Modal,
// //   View,
// //   StyleSheet,
// //   useWindowDimensions,
// // } from 'react-native';
// // import CalendarInline from './CalendarInline';
// // import colors from 'mobile/constant/colors';
// // import dimonds from 'mobile/constant/dimonds';
// // import { AppButton } from '../button/AppButton';
// // import fonts from 'mobile/constant/font';

// // export default function CalendarModal({
// //   visible,
// //   onClose,
// //   onChange,
// //   onApply,
// //   mode = 'single',
// //   themeVariant,
// //   closeButtonVisble = true,
// //   applyButtonVisible = true,
// //   selectedDates = {},
// //   ...props
// // }) {
// //   const { width } = useWindowDimensions();
// //   const modalHeight = width * 1.18;
// //   const calendarHeight = width * 0.6;

// //   // Reset key when modal opens to force re-render
// //   const [modalKey, setModalKey] = React.useState(0);

// //   useEffect(() => {
// //     if (visible) {
// //       // Increment key to force re-render with fresh data
// //       setModalKey(prev => prev + 1);
// //     }
// //   }, [visible]);

// //   return (
// //     <Modal
// //       visible={visible}
// //       transparent
// //       animationType="slide"
// //       onRequestClose={onClose}
// //     >
// //       <View style={styles.overlay}>
// //         <View style={[styles.container, { height: modalHeight }]}>
// //           <View style={{ height: calendarHeight }}>
// //             <CalendarInline
// //               key={modalKey} // Force re-render with new key
// //               mode={mode}
// //               themeVariant={themeVariant}
// //               onChange={onChange}
// //               selectedDates={selectedDates}
// //               {...props}
// //             />
// //           </View>

// //           <View style={styles.buttonContainer}>
// //             {closeButtonVisble && (
// //               <AppButton
// //                 preset={['outline', 'medium', 'rounded']}
// //                 fontFamily={fonts.bol}
// //                 onPress={onClose}
// //                 style={styles.button}
// //               >
// //                 Close
// //               </AppButton>
// //             )}

// //             {applyButtonVisible && (
// //               <AppButton
// //                 preset={['primary', 'medium', 'rounded']}
// //                 fontFamily={fonts.bol}
// //                 onPress={onApply}
// //                 style={styles.button}
// //               >
// //                 Apply
// //               </AppButton>
// //             )}
// //           </View>
// //         </View>
// //       </View>
// //     </Modal>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   overlay: {
// //     flex: 1,
// //     backgroundColor: '#00000066',
// //     justifyContent: 'center',
// //   },
// //   container: {
// //     backgroundColor: colors.white,
// //     margin: 20,
// //     borderRadius: dimonds.radius[4],
// //     padding: dimonds.space[4],
// //     justifyContent: 'space-between',
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     gap: 20,
// //     marginTop: 20,
// //     paddingHorizontal: 10,
// //   },
// //   button: {
// //     flex: 1,
// //   },
// // });

// ////////////

// // CalendarModal.js
// import React, { useEffect, useState } from 'react';
// import {
//   Modal,
//   View,
//   StyleSheet,
//   useWindowDimensions,
// } from 'react-native';
// import CalendarInline from './CalendarInline';
// import colors from 'mobile/constant/colors';
// import dimonds from 'mobile/constant/dimonds';
// import { AppButton } from '../button/AppButton';
// import fonts from 'mobile/constant/font';

// export default function CalendarModal({
//   visible,
//   onClose,
//   onChange,
//   onApply,
//   mode = 'single',
//   themeVariant,
//   closeButtonVisble = true,
//   applyButtonVisible = true,
//   selectedDates = {},
//   ...props
// }) {
//   const { width } = useWindowDimensions();
//   const modalHeight = width * 1.18;
//   const calendarHeight = width * 0.6;
//   const [localSelectedDates, setLocalSelectedDates] = useState(selectedDates);

//   // Update local state when selectedDates prop changes
//   useEffect(() => {
//     if (visible) {
//       setLocalSelectedDates(selectedDates);
//     }
//   }, [visible, selectedDates]);

//   const handleDateChange = (newSelected) => {
//     setLocalSelectedDates(newSelected);
//     if (onChange) {
//       onChange(newSelected);
//     }
//   };

//   const handleApplyPress = () => {
//     if (onApply) {
//       onApply(localSelectedDates);
//     }
//   };

//   const handleClosePress = () => {
//     setLocalSelectedDates(selectedDates); // Reset to original
//     onClose();
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="slide"
//       onRequestClose={handleClosePress}
//     >
//       <View style={styles.overlay}>
//         <View style={[styles.container, { height: modalHeight }]}>
//           <View style={{ height: calendarHeight }}>
//             <CalendarInline
//               mode={mode}
//               themeVariant={themeVariant}
//               onChange={handleDateChange}
//               selectedDates={localSelectedDates}
//               {...props}
//             />
//           </View>

//           <View style={styles.buttonContainer}>
//             {closeButtonVisble && (
//               <AppButton
//                 preset={['outline', 'medium', 'rounded']}
//                 fontFamily={fonts.bol}
//                 onPress={handleClosePress}
//                 style={styles.button}
//               >
//                 Close
//               </AppButton>
//             )}

//             {applyButtonVisible && (
//               <AppButton
//                 preset={['primary', 'medium', 'rounded']}
//                 fontFamily={fonts.bol}
//                 onPress={handleApplyPress}
//                 style={styles.button}
//               >
//                 Apply
//               </AppButton>
//             )}
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: '#00000066',
//     justifyContent: 'center',
//   },
//   container: {
//     backgroundColor: colors.white,
//     margin: 20,
//     borderRadius: dimonds.radius[4],
//     padding: dimonds.space[4],
//     justifyContent: 'space-between',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 20,
//     marginTop: 20,
//     paddingHorizontal: 10,
//   },
//   button: {
//     flex: 1,
//   },
// });
// CalendarModal.js
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  useWindowDimensions,
  Animated,
  Easing,
} from 'react-native';
import CalendarInline from './CalendarInline';
import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import { AppButton } from '../button/AppButton';
import fonts from 'mobile/constant/font';

export default function CalendarModal({
  visible,
  onClose,
  onChange,
  onApply,
  mode = 'single',
  themeVariant,
  closeButtonVisble = true,
  applyButtonVisible = true,
  selectedDates = {},
  ...props
}) {
  const { width, height } = useWindowDimensions();
  const modalHeight = height * 0.66; // 70% of screen height
  const calendarHeight = height * 0.47; // 70% of modal height for calendar
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [localSelectedDates, setLocalSelectedDates] = useState(selectedDates);
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);

      // Reset animation values
      fadeAnim.setValue(0);
      slideAnim.setValue(height);

      // Run animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible, height]);
  // Update local state when selectedDates prop changes
  useEffect(() => {
    if (visible) {
      setLocalSelectedDates(selectedDates);
    }
  }, [visible, selectedDates]);

  const handleDateChange = (newSelected) => {
    setLocalSelectedDates(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  const handleApplyPress = () => {
    if (onApply) {
      onApply(localSelectedDates);
    }
  };

  const handleClosePress = () => {
    setLocalSelectedDates(selectedDates); // Reset to original
    onClose();
  };
  if (!modalVisible && !visible) {
    return null;
  }
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClosePress}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.container,
            {
              height: modalHeight,
              transform: [
                {
                  translateY: slideAnim,
                },
              ],
            },
          ]}
        >
          <View style={[styles.calendarSection, { height: calendarHeight }]}>
            <CalendarInline
              mode={mode}
              themeVariant={themeVariant}
              onChange={handleDateChange}
              selectedDates={localSelectedDates}
              {...props}
            />
          </View>

          <View style={styles.buttonSection}>
            <View style={styles.buttonContainer}>
              {closeButtonVisble && (
                <AppButton
                  preset={['outline', 'medium', 'rounded']}
                  fontFamily={fonts.bol}
                  onPress={handleClosePress}
                  style={styles.button}
                  textStyle={styles.buttonText}
                >
                  Close
                </AppButton>
              )}

              {applyButtonVisible && (
                <AppButton
                  preset={['primary', 'medium', 'rounded']}
                  fontFamily={fonts.bol}
                  onPress={handleApplyPress}
                  style={styles.button}
                  textStyle={styles.buttonText}
                >
                  Apply
                </AppButton>
              )}
            </View>
          </View>
          {/* <View style={styles.overlay}>
        <View style={[styles.container, { height: modalHeight }]}>
      
          <View style={[styles.calendarSection, { height: calendarHeight }]}>
            <CalendarInline
              mode={mode}
              themeVariant={themeVariant}
              onChange={handleDateChange}
              selectedDates={localSelectedDates}
              {...props}
            />
          </View>

       
          <View style={styles.buttonSection}>
            <View style={styles.buttonContainer}>
              {closeButtonVisble && (
                <AppButton
                  preset={['outline', 'medium', 'rounded']}
                  fontFamily={fonts.bol}
                  onPress={handleClosePress}
                  style={styles.button}
                  textStyle={styles.buttonText}
                >
                  Close
                </AppButton>
              )}

              {applyButtonVisible && (
                <AppButton
                  preset={['primary', 'medium', 'rounded']}
                  fontFamily={fonts.bol}
                  onPress={handleApplyPress}
                  style={styles.button}
                  textStyle={styles.buttonText}
                >
                  Apply
                </AppButton>
              )}
            </View>
          </View>
        </View>
      </View> */}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: dimonds.radius[4],
    padding: dimonds.space[4],
    // Remove justifyContent: 'space-between' and use flex column
    flexDirection: 'column',
    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  calendarSection: {
    width: '100%',
    marginBottom: 20, // Space between calendar and buttons
  },
  buttonSection: {
    width: '100%',
    // borderTopWidth: 1,
    // borderTopColor: colors.gray2,
    paddingTop: 20,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    minHeight: 48, // Ensure minimum touch area
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

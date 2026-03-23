// import { View, Text } from 'react-native'
// import React from 'react'

// export default function Settingscreen() {
//   return (
//     <View>
//       <Text>Setting</Text>
//     </View>
//   )
// }

// screens/Settingscreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import fonts from 'mobile/constant/font';
import CustomModal from 'mobile/src/com/dialog/CustomModal';
import ModalFooter from 'mobile/src/com/dialog/ModalFooter';
import ModalHeader from 'mobile/src/com/dialog/ModalHeader';
import { TamaguiProvider } from '@tamagui/core';
import tamaguiConfig from 'mobile/tamagui.config';
import { AppButton } from 'mobile/src/com/button/AppButton';
import { BlurView } from '@react-native-community/blur';

const Settingscreen = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => setShowAlert(true)}
        >
          <Text style={styles.buttonText}>Show Alert Modal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => setShowBottomSheet(true)}
        >
          <Text style={styles.buttonText}>Show Bottom Sheet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.dangerButton]}
          onPress={() => setShowFullScreen(true)}
        >
          <Text style={styles.buttonText}>Show Full Screen Modal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.outlineButton]}
          onPress={() => setShowCustom(true)}
        >
          <Text style={styles.outlineButtonText}>Show Custom Modal</Text>
        </TouchableOpacity>

        {showAlert && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType='light'
            blurAmount={10}
          />
        )}

        {/* Alert Modal */}
        <CustomModal
          visible={showAlert}
          onClose={() => setShowAlert(false)}
          animationType="zoom"
          position="center"
          width="85%"
          height="auto"
          backdropOpacity={15}
          showBackdrop={true}
        >
          <ModalHeader title="Alert" onClose={() => setShowAlert(false)} />

          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              This is an alert message. Please confirm your action.
            </Text>
          </View>

          {/* <ModalFooter
          buttons={[
            {
              title: 'Cancel',
              type: 'secondary',
              onPress: () => setShowAlert(false),
            },
            {
              title: 'Confirm',
              type: 'primary',
              onPress: () => {
                console.log('Confirmed!');
                setShowAlert(false);
              },
            },
            
          ]}
        /> */}

          <ModalFooter
            buttons={[
              {
                title: 'Cancel',
                type: 'secondary',
                onPress: () => setShowAlert(false),
                size: 'medium',
                rounded: true,
              },
              {
                title: 'Confirm',
                type: 'primary',
                onPress: () => {
                  console.log('Confirmed!');
                  setShowAlert(false);
                },
                // loading: isLoading,
                size: 'medium',
                fullWidth: false,
                appButtonProps: {
                  icon: 'check',
                  iconPosition: 'right',
                },
                rounded: true,
              },
            ]}
          />
        </CustomModal>

        {/* Bottom Sheet */}
        <CustomModal
          visible={showBottomSheet}
          onClose={() => setShowBottomSheet(false)}
          animationType="slide"
          position="bottom"
          backgroundColor={colors.gray1}
          borderRadius={dimonds.radius[6]}
          showBackdrop={true}
          closeOnBackdropPress={true}
        >
          <View style={styles.bottomSheetHeader}>
            <View style={styles.bottomSheetHandle} />
          </View>

          <ScrollView style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>Options</Text>

            {[1, 2, 3, 4, 5].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.bottomSheetItem}
                onPress={() => {
                  console.log(`Option ${item} selected`);
                  setShowBottomSheet(false);
                }}
              >
                <Text style={styles.bottomSheetItemText}>Option {item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </CustomModal>

        {/* Full Screen Modal */}
        <CustomModal
          visible={showFullScreen}
          onClose={() => setShowFullScreen(false)}
          animationType="fade"
          position="center"
          width="100%"
          height="100%"
          backgroundColor={colors.white}
          showBackdrop={false}
        >
          <ModalHeader
            title="Full Screen Modal"
            onClose={() => setShowFullScreen(false)}
            showBorderBottom={true}
          />

          <ScrollView style={styles.fullScreenContent}>
            <Text style={styles.fullScreenText}>
              This is a full screen modal with scrollable content.
              {'\n\n'}
              You can put any content here.
            </Text>

            {/* Add more content as needed */}
          </ScrollView>
        </CustomModal>

        {/* Custom Modal with Different Animation */}
        <CustomModal
          visible={showCustom}
          onClose={() => setShowCustom(false)}
          animationType="slide"
          position="center"
          width="90%"
          height="auto"
          maxHeight="70%"
          backgroundColor={colors.blue1}
          borderRadius={dimonds.radius[8]}
          animationDuration={400}
          containerStyle={styles.customModalContainer}
        >
          <ModalHeader
            title="Custom Styled Modal"
            onClose={() => setShowCustom(false)}
            titleStyle={styles.customTitle}
            closeButtonTextStyle={styles.customCloseText}
          />

          <View style={styles.customContent}>
            <Text style={styles.customText}>
              This modal has custom styling with different colors and
              animations.
            </Text>

            <View style={styles.customFeatureList}>
              <Text style={styles.customFeature}>• Custom Colors</Text>
              <Text style={styles.customFeature}>• Smooth Animations</Text>
              <Text style={styles.customFeature}>• Reusable Components</Text>
              <Text style={styles.customFeature}>• Multiple Positions</Text>
            </View>
          </View>

          <ModalFooter
            buttons={[
              {
                title: 'Got it!',
                type: 'primary',
                onPress: () => setShowCustom(false),
                style: styles.customButton,
              },
            ]}
            buttonDirection="vertical"
          />
        </CustomModal>
      </View>
    </TamaguiProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: dimonds.space[4],
    justifyContent: 'center',
    gap: dimonds.space[4],
  },
  button: {
    padding: dimonds.space[4],
    borderRadius: dimonds.radius[3],
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.gray3,
  },
  dangerButton: {
    backgroundColor: colors.danger,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.med,
    fontSize: 16,
  },
  outlineButtonText: {
    color: colors.primary,
    fontFamily: fonts.med,
    fontSize: 16,
  },
  modalContent: {
    paddingVertical: dimonds.space[3],
  },
  modalText: {
    fontSize: 14,
    fontFamily: fonts.reg,
    color: colors.gray7,
    lineHeight: 20,
  },
  bottomSheetHeader: {
    alignItems: 'center',
    paddingTop: dimonds.space[2],
    paddingBottom: dimonds.space[3],
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray4,
    borderRadius: dimonds.radius[2],
  },
  bottomSheetContent: {
    maxHeight: 400,
    paddingHorizontal: dimonds.space[4],
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontFamily: fonts.bol,
    color: colors.gray9,
    marginBottom: dimonds.space[4],
  },
  bottomSheetItem: {
    paddingVertical: dimonds.space[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray3,
  },
  bottomSheetItemText: {
    fontSize: 16,
    fontFamily: fonts.reg,
    color: colors.gray8,
  },
  fullScreenContent: {
    flex: 1,
    padding: dimonds.space[4],
  },
  fullScreenText: {
    fontSize: 16,
    fontFamily: fonts.reg,
    color: colors.gray8,
    lineHeight: 24,
  },
  customModalContainer: {
    borderWidth: 1,
    borderColor: colors.blue4,
  },
  customTitle: {
    color: colors.blue9,
  },
  customCloseText: {
    color: colors.blue6,
  },
  customContent: {
    paddingVertical: dimonds.space[3],
  },
  customText: {
    fontSize: 14,
    fontFamily: fonts.reg,
    color: colors.blue9,
    lineHeight: 20,
    marginBottom: dimonds.space[4],
  },
  customFeatureList: {
    gap: dimonds.space[2],
  },
  customFeature: {
    fontSize: 13,
    fontFamily: fonts.reg,
    color: colors.blue7,
  },
  customButton: {
    backgroundColor: colors.blue6,
  },
});

export default Settingscreen;

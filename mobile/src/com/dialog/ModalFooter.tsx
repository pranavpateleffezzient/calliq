// // components/ModalFooter.jsx
// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import colors from 'mobile/constant/colors';
// import dimonds from 'mobile/constant/dimonds';
// import fonts from 'mobile/constant/font';
// import { AppButton } from '../button/AppButton';

// const ModalFooter = ({
//   buttons = [],
//   buttonDirection = 'horizontal', // 'horizontal' or 'vertical'
//   containerStyle,
// }) => {
//   if (buttons.length === 0) return null;

//   return (
//     <View
//       style={[
//         styles.footerContainer,
//         buttonDirection === 'vertical' && styles.verticalContainer,
//         containerStyle,
//       ]}
//     >
//       {buttons.map((button, index) => (
//         <TouchableOpacity
//           key={index}
//           onPress={button.onPress}
//           style={[
//             styles.button,
//             button.type === 'primary' && styles.primaryButton,
//             button.type === 'secondary' && styles.secondaryButton,
//             button.type === 'danger' && styles.dangerButton,
//             button.type === 'outline' && styles.outlineButton,
//             button.fullWidth && styles.fullWidthButton,
//             button.style,
//           ]}
//           disabled={button.disabled}
//         >
//           <Text style={[
//             styles.buttonText,
//             button.type === 'primary' && styles.primaryButtonText,
//             button.type === 'secondary' && styles.secondaryButtonText,
//             button.type === 'danger' && styles.dangerButtonText,
//             button.type === 'outline' && styles.outlineButtonText,
//             button.textStyle,
//           ]}>
//             {button.title}
//           </Text>
//         </TouchableOpacity>


//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   footerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: dimonds.space[4],
//     gap: dimonds.space[3],
//   },
//   verticalContainer: {
//     flexDirection: 'column',
//   },
//   button: {
//     flex: 1,
//     paddingVertical: dimonds.space[3],
//     paddingHorizontal: dimonds.space[4],
//     borderRadius: dimonds.radius[3],
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   primaryButton: {
//     backgroundColor: colors.primary,
//   },
//   secondaryButton: {
//     backgroundColor: colors.gray3,
//   },
//   dangerButton: {
//     backgroundColor: colors.danger,
//   },
//   outlineButton: {
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: colors.primary,
//   },
//   fullWidthButton: {
//     flex: 1,
//   },
//   buttonText: {
//     fontFamily: fonts.med,
//     fontSize: 14,
//   },
//   primaryButtonText: {
//     color: colors.white,
//   },
//   secondaryButtonText: {
//     color: colors.gray9,
//   },
//   dangerButtonText: {
//     color: colors.white,
//   },
//   outlineButtonText: {
//     color: colors.primary,
//   },
// });

// export default ModalFooter;

// components/ModalFooter.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import fonts from 'mobile/constant/font';
import { AppButton } from '../button/AppButton';

const ModalFooter = ({
  buttons = [],
  buttonDirection = 'horizontal', // 'horizontal' or 'vertical'
  containerStyle,
}) => {
  if (buttons.length === 0) return null;

  // Map our button types to AppButton presets
  const getButtonPreset = (buttonType, buttonProps) => {
    const presets = [];
    
    // Add type preset
    switch (buttonType) {
      case 'primary':
        presets.push('primary');
        break;
      case 'secondary':
        presets.push('secondary');
        break;
      case 'danger':
        presets.push('danger');
        break;
      case 'outline':
        presets.push('outline');
        break;
      default:
        presets.push('primary');
    }
    
    // Add size preset
    if (buttonProps.size) {
      presets.push(buttonProps.size);
    } else {
      presets.push('medium'); // default size
    }
    
    // Add fullWidth if needed
    if (buttonProps.fullWidth) {
      presets.push('fullWidth');
    }
    
    // Add rounded if needed
    if (buttonProps.rounded) {
      presets.push('rounded');
    }
    
    // Add disabled preset if button is disabled
    if (buttonProps.disabled) {
      presets.push('disabled');
    }
    
    return presets;
  };

  return (
    <View
      style={[
        styles.footerContainer,
        buttonDirection === 'vertical' && styles.verticalContainer,
        containerStyle,
      ]}
    >
      {buttons.map((button, index) => {
        const buttonPresets = getButtonPreset(button.type, button);
        
        return (
          <AppButton
            key={index}
            onPress={button.onPress}
            preset={buttonPresets}
            loading={button.loading}
            disabled={button.disabled}
            style={[
              styles.button,
              button.type === 'outline' && styles.outlineButton,
              button.fullWidth && styles.fullWidthButton,
              button.style,
            ]}
            // Additional props for AppButton
            {...(button.icon && { icon: button.icon })}
            {...(button.iconPosition && { iconPosition: button.iconPosition })}
          >
            {button.title}
          </AppButton>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: dimonds.space[4],
    gap: dimonds.space[3],
  },
  verticalContainer: {
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    // Note: Padding is now handled by AppButton presets
  },
  outlineButton: {
    // Additional outline styles if needed
  },
  fullWidthButton: {
    flex: 1,
  },
});

export default ModalFooter;
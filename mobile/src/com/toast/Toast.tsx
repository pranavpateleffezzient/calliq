import React from 'react';
import { Toast, useToastState } from '@tamagui/toast';
import { YStack } from 'tamagui';
import { CheckCircle, XCircle, Info, AlertTriangle } from '@tamagui/lucide-icons';

export const CustomToast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) {
    return null;
  }

  const getToastConfig = (title: string) => {
    const configs: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
      success: {
        icon: <CheckCircle size={20} color="$green10" />,
        bg: '$green2',
        color: '$green11',
      },
      error: {
        icon: <XCircle size={20} color="$red10" />,
        bg: '$red2',
        color: '$red11',
      },
      warning: {
        icon: <AlertTriangle size={20} color="$orange10" />,
        bg: '$orange2',
        color: '$orange11',
      },
      info: {
        icon: <Info size={20} color="$blue10" />,
        bg: '$blue2',
        color: '$blue11',
      },
    };

    return configs[title.toLowerCase()] || configs.info;
  };

  const { icon, bg, color } = getToastConfig(currentToast.title || 'info');

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="medium"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$gray5"
      shadowColor="$black"
      shadowOpacity={0.1}
      shadowRadius={10}
      elevation={5}
    >
      <YStack
        backgroundColor={bg}
        paddingHorizontal="$4"
        paddingVertical="$3"
        borderRadius="$3"
        flexDirection="row"
        alignItems="center"
        gap="$3"
        width="100%"
      >
        {icon}
        <Toast.Title
          color={color}
          fontSize="$4"
          fontWeight="600"
          flex={1}
          numberOfLines={2}
        >
          {currentToast.title}
        </Toast.Title>
        {currentToast.message && (
          <Toast.Description
            color="$gray11"
            fontSize="$3"
            numberOfLines={2}
          >
            {currentToast.message}
          </Toast.Description>
        )}
        <Toast.Close />
      </YStack>
    </Toast>
  );
};
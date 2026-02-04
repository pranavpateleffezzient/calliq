import React from 'react';
import { ToastProvider as TamaguiToastProvider, ToastViewport } from '@tamagui/toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <TamaguiToastProvider>
      {children}
      <ToastViewport
        top={insets.top + 10}
        left={20}
        right={20}
      />
    </TamaguiToastProvider>
  );
};
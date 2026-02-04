import { useToastController } from '@tamagui/toast';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  type?: ToastType;
  duration?: number;
  message?: string;
  customIcon?: React.ReactNode;
  customBackground?: string;
  customColor?: string;
  position?: 'top' | 'bottom';
}

export const useCustomToast = () => {
  const toast = useToastController();

  const showToast = (
    title: string,
    options: ToastOptions = {}
  ) => {
    const {
      type = 'info',
      duration = 4000,
      message,
      customIcon,
      customBackground,
      customColor,
      position = 'top',
    } = options;

    toast.show(title, {
      duration,
      message,
      native: false,
      burntOptions: {
        preset: 'none',
        haptic: type === 'error' ? 'error' : 'success',
      },
      customData: {
        type,
        customIcon,
        customBackground,
        customColor,
      },
    });
  };

  const success = (title: string, message?: string, options?: Omit<ToastOptions, 'type'>) => {
    showToast(title, { ...options, type: 'success', message });
  };

  const error = (title: string, message?: string, options?: Omit<ToastOptions, 'type'>) => {
    showToast(title, { ...options, type: 'error', message });
  };

  const warning = (title: string, message?: string, options?: Omit<ToastOptions, 'type'>) => {
    showToast(title, { ...options, type: 'warning', message });
  };

  const info = (title: string, message?: string, options?: Omit<ToastOptions, 'type'>) => {
    showToast(title, { ...options, type: 'info', message });
  };

  const dismiss = () => {
    toast.hide();
  };

  const dismissAll = () => {
    toast.hideAll();
  };

  return {
    show: showToast,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
  };
};
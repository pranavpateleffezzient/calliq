import { useRef, useCallback } from 'react';
import { useCustomToast, ToastOptions } from '../toast';

export const useToastNotification = () => {
  const toast = useCustomToast();
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);

  const show = useCallback((
    title: string,
    options: ToastOptions & { id?: string; onPress?: () => void } = {}
  ) => {
    // Clear any existing timeout
    if (toastTimeout.current) {
      clearTimeout(toastTimeout.current);
    }

    // Show the toast
    toast.show(title, options);

    // Auto dismiss after duration
    if (options.duration !== 0) {
      toastTimeout.current = setTimeout(() => {
        toast.dismiss();
      }, options.duration || 4000);
    }

    return () => {
      if (toastTimeout.current) {
        clearTimeout(toastTimeout.current);
      }
    };
  }, [toast]);

  const showWithAction = useCallback((
    title: string,
    actionText: string,
    onAction: () => void,
    options: ToastOptions = {}
  ) => {
    show(title, {
      ...options,
      customData: {
        ...options.customData,
        actionText,
        onAction,
      },
    });
  }, [show]);

  const showLoading = useCallback((
    title: string,
    options: Omit<ToastOptions, 'duration'> = {}
  ) => {
    show(title, {
      ...options,
      duration: 0, // Infinite duration
      type: 'info',
    });
  }, [show]);

  const hideLoading = useCallback(() => {
    toast.dismiss();
  }, [toast]);

  const showSuccess = useCallback((
    title: string,
    message?: string,
    options?: Omit<ToastOptions, 'type'>
  ) => {
    toast.success(title, message, options);
  }, [toast]);

  const showError = useCallback((
    title: string,
    message?: string,
    options?: Omit<ToastOptions, 'type'>
  ) => {
    toast.error(title, message, options);
  }, [toast]);

  return {
    show,
    showWithAction,
    showLoading,
    hideLoading,
    showSuccess,
    showError,
    showWarning: toast.warning,
    showInfo: toast.info,
    dismiss: toast.dismiss,
    dismissAll: toast.dismissAll,
  };
};
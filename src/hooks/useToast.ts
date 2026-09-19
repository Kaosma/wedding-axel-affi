import { useState, useCallback } from 'react';

interface ToastState {
  isVisible: boolean;
  isExiting: boolean;
  message: string;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    isExiting: false,
    message: '',
  });

  const showToast = useCallback((message: string, duration: number = 3000) => {
    setToast({
      isVisible: true,
      isExiting: false,
      message,
    });

    setTimeout(() => {
      hideToast();
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      isExiting: true,
    }));

    setTimeout(() => {
      setToast({
        isVisible: false,
        isExiting: false,
        message: '',
      });
    }, 300);
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}

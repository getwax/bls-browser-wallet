import React, {
  createContext, useMemo, useState,
} from 'react';
import 'react-toastify/dist/ReactToastify.css';

type ToastContextType = ReturnType<typeof getContextValue>;

function getContextValue() {
  const [message, setMessage] = useState('');
  return {
    message,
    setMessage,
  };
}

export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType,
);

type Props = {
  children: React.ReactNode;
};

export function ToastProvider({ children } : Props) {
  const {
    message,
    setMessage,
  } = getContextValue();

  const value = useMemo(
    () => ({
      message,
      setMessage,
    }),
    [message, setMessage],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

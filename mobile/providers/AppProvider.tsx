import { ToastProvider } from 'react-native-toast-notifications';
import { StatusBar } from 'expo-status-bar';

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ToastProvider>
      <StatusBar style="dark" />
      {children}
    </ToastProvider>
  );
}
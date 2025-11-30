import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { registerForPushNotificationsAsync } from './src/utils/notifications';
import * as Notifications from 'expo-notifications';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

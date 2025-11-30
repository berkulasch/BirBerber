import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    });
  } else {
    // alert('Must use physical device for Push Notifications');
  }

  return token?.data;
}

export async function scheduleBookingNotification(barberName: string, date: string, time: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Appointment Confirmed! ✂️",
      body: `Your appointment with ${barberName} is set for ${date} at ${time}.`,
      data: { date, time },
    },
    trigger: null, // Send immediately
  });

  // Schedule a reminder 1 hour before (Mock logic: simplified for demo)
  // In a real app, you'd parse the date string into a Date object and subtract 1 hour.
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Upcoming Appointment Reminder",
      body: `You have an appointment with ${barberName} in 1 hour.`,
    },
    trigger: { 
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
      repeats: false,
    }, // Demo: trigger reminder 5 seconds later
  });
}



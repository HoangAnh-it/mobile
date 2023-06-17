import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/AuthProvider';
import Routes from './src/routes/index';
import { LogBox } from 'react-native';
import { ConfirmModalProvider } from './src/context/ConfirmModalProvider';
LogBox.ignoreLogs(['Sending']);
import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
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
    token = (await Notifications.getExpoPushTokenAsync()).data;
    //console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return ""//token;
}


export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    async function pushNotifi() {
      await Notifications.scheduleNotificationAsync({
        content: {
            title: "Đi Ngủ",
            body: "Bạn nên đi ngủ sớm để tốt cho sức khỏe",
            data: { data: 'goes here' },
        },
        trigger: { seconds: 120 },
      });

      await Notifications.scheduleNotificationAsync({
        content: {
            title: "Hello",
            body: "Chào mừng bạn đến với chúng tôi",
            data: { data: 'goes here' },
        },
        trigger: { seconds: 60 },
      });
    }
    pushNotifi();
  }, []);

  return (
    <AuthProvider>
      <ConfirmModalProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ConfirmModalProvider>
    </AuthProvider>
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/AuthProvider';
import Routes from './src/routes/index';
import { LogBox } from 'react-native';
import { ConfirmModalProvider } from './src/context/ConfirmModalProvider';
import { NotificationProvider } from './src/context/NotificaitonProvider';
LogBox.ignoreLogs(['Sending']);

export default function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ConfirmModalProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </ConfirmModalProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
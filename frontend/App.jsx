import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/AuthProvider';
import Routes from './src/routes/index';
import { LogBox } from 'react-native';
import { ConfirmModalProvider } from './src/context/ConfirmModalProvider';
LogBox.ignoreLogs(['Sending']);

export default function App() {
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
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/AuthProvider';
import Routes from './src/routes/index';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Sending']);

export default function App() {

  // if (loginState.isLoading) {
  //   return (
  //     <View className="flex-1 items-center justify-center" >
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </AuthProvider>
  );
}
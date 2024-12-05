import 'react-native-gesture-handler';
import 'react-native-reanimated';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import StackNavigator from '@navigators/StackNavigator';
import {StatusBar} from 'react-native';
import React from 'react';

export default function App() {
  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#000',
      buttonText: '#fff',
      activeColor: '#f95d03',
      background: '#fff',
      otherBackground: '#2f5acf',
      linkText: '#f95d03',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            backgroundColor={theme.colors.primary}
            barStyle={'light-content'}
          />
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

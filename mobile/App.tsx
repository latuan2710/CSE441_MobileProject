import StackNavigator from '@navigators/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';
import 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import WishlistStore from '@redux/WishlistStore';
import WishlistContextProvider from '@context/WishlistContext';

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
          <Provider store={WishlistStore}>
            <WishlistContextProvider>
              <NavigationContainer>
                <StackNavigator />
              </NavigationContainer>
            </WishlistContextProvider>
          </Provider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

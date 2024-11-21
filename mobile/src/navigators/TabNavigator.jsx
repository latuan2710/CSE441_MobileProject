/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Cart from '@screens/tabs/Cart';
import Home from '@screens/tabs/Home';
import Profile from '@screens/tabs/Profile';
import Shop from '@screens/tabs/Shop';
import Wishlist from '@screens/tabs/Wishlist';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useTheme();

  const headerOptions = title => ({
    headerShown: true,
    title,
    headerTitleStyle: {textAlign: 'center'},
    headerTitleContainerStyle: {width: '100%'},
    headerStyle: {
      shadowColor: '#000',
      elevation: 4,
    },
  });

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          const icons = {
            Home: {focused: 'home', default: 'home-outline'},
            Shop: {focused: 'apps', default: 'apps-outline'},
            Cart: {focused: 'cart', default: 'cart-outline'},
            Wishlist: {focused: 'heart', default: 'heart-outline'},
            Profile: {focused: 'person', default: 'person-outline'},
          };

          const iconName = focused
            ? icons[route.name]?.focused
            : icons[route.name]?.default;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={headerOptions('My Cart')}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={headerOptions('My Wishlist')}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={headerOptions('Profile')}
      />
    </Tab.Navigator>
  );
}

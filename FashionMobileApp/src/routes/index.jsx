import TabNavigator from '@navigators/TabNavigator';
import Help from '@screens/Help';
import Privacy from '@screens/Privacy';
import ForgotPassword from '@screens/auth/ForgotPassword';
import Login from '@screens/auth/Login';
import Register from '@screens/auth/Register';
import ResetPassword from '@screens/auth/ResetPassword';
import Verify from '@screens/auth/Verify';
import Cart from '@screens/tabs/Cart';
import Home from '@screens/tabs/Home';
import Profile from '@screens/tabs/Profile';
import Shop from '@screens/tabs/Shop';
import Wishlist from '@screens/tabs/Wishlist';

export const screens = [
  {
    name: 'Login',
    component: Login,
    options: {headerShown: false},
  },
  {
    name: 'Register',
    component: Register,
    options: {headerShown: false},
  },
  {
    name: 'ForgotPassword',
    component: ForgotPassword,
    options: {headerShown: false},
  },
  {
    name: 'Verify',
    component: Verify,
    options: {headerShown: false},
  },
  {
    name: 'ResetPassword',
    component: ResetPassword,
    options: {headerShown: false},
  },
  {
    name: 'Tab',
    component: TabNavigator,
    options: {headerShown: false},
  },
  {
    name: 'Privacy',
    component: Privacy,
    options: {headerShown: false},
  },
  {
    name: 'Help',
    component: Help,
    options: {headerShown: false},
  },
];

export const tabs = [
  {
    name: 'Home',
    component: Home,
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
  },
  {
    name: 'Shop',
    component: Shop,
    activeIcon: 'cart',
    inActiveIcon: 'cart-outline',
  },
  {
    name: 'Cart',
    component: Cart,
    activeIcon: 'bag',
    inActiveIcon: 'bag-outline',
  },
  {
    name: 'Wishlist',
    component: Wishlist,
    activeIcon: 'heart',
    inActiveIcon: 'heart-outline',
  },
  {
    name: 'Profile',
    component: Profile,
    activeIcon: 'person-sharp',
    inActiveIcon: 'person-outline',
  },
];
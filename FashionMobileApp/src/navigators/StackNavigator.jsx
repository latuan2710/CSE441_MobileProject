import {createStackNavigator} from '@react-navigation/stack';
import ForgotPassword from '@screens/auth/ForgotPassword';
import Login from '@screens/auth/Login';
import Register from '@screens/auth/Register';
import ResetPassword from '@screens/auth/ResetPassword';
import Verify from '@screens/auth/Verify';

const Stack = createStackNavigator();

const screens = [
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
];

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='ResetPassword'>
      {screens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
}

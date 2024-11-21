import {createStackNavigator} from '@react-navigation/stack';
import ForgotPasswordScreen from '@screens/ForgotPassword';
import LoginScreen from '@screens/Login';
import RegisterScreen from '@screens/Register';
import TabNavigator from './TabNavigator';
import ProfileEditScreen from '@screens/ProfileEdit';
import VerifyAccount from '@screens/VerifyAccount';

const Stack = createStackNavigator();
export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="Profile_Edit"
        component={ProfileEditScreen}
        options={{headerShown: true, title: 'Edit Profile'}}
      />
      <Stack.Screen
        name="VerifyAccount"
        component={VerifyAccount}
        options={{headerShown: true, title: ''}}
      />
    </Stack.Navigator>
  );
}

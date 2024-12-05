import {
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import { Link } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Divider,
  Text,
  TextInput,
  useTheme
} from 'react-native-paper';

export default function Login() {
  const theme = useTheme();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>
          Hi! Welcome back, you’ve been missed
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Enter your email or username"
          value={account}
          onChangeText={setAccount}
          style={styles.input}
          mode="outlined"
          placeholder="example@gmail.com"
        />
        <TextInput
          label="Enter your password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>
      <Link screen={"ForgotPassword"} style={[styles.forgotPassword, {color: theme.colors.linkText}]}>
        Forgot Password?
      </Link>
      <Button
        mode="contained"
        style={[styles.signInButton, {backgroundColor: theme.colors.primary}]}>
        <Text variant="titleMedium" style={{color: '#fff'}}>
          Sign In
        </Text>
      </Button>
      <View style={styles.dividerContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.orText}>Or sign in with</Text>
        <Divider style={styles.divider} />
      </View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        style={{width: '100%', height: 50, marginBottom: 20}}
      />
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Link screen={"Register"} style={[styles.signUpLink, {color: theme.colors.linkText}]}>
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent:'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  signInButton: {
    paddingVertical: 8,
    borderRadius: 5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  orText: {
    marginHorizontal: 8,
    color: 'gray',
  },
  signUpContainer: {
    alignItems: 'center',
  },
  signUpLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

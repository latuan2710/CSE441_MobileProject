import { Link } from '@react-navigation/native';
import { login } from '@services/authService';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function Login({navigation}) {
  const theme = useTheme();
  const [account, setAccount] = useState('latuan2710');
  const [password, setPassword] = useState('tuan1234');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    login(account, password)
      .then(() => navigation.navigate('Tab'))
      .catch(err => Alert.alert('Error', err.response.data.message));
  };

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
      <Button
        mode="contained"
        onPress={handleLogin}
        style={[styles.signInButton, {backgroundColor: theme.colors.primary}]}>
        <Text variant="titleMedium" style={{color: '#fff'}}>
          Sign In
        </Text>
      </Button>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Link
            screen={'Register'}
            style={[styles.signUpLink, {color: theme.colors.linkText}]}>
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
    justifyContent: 'center',
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
  signInButton: {
    paddingVertical: 8,
    borderRadius: 5,
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  signUpLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

import { Link } from '@react-navigation/native';
import { register } from '@services/authService';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper';

export default function Register({navigation}) {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    register(username, email, password)
      .then(() => navigation.navigate('Login'))
      .catch(err => Alert.alert('Error', err.response.data.message));
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subTitle}>
          Fill your information below or register with your social account.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Enter your username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          mode="outlined"
          placeholder="Hehe"
        />

        <TextInput
          label="Enter your email"
          value={email}
          onChangeText={setEmail}
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
        onPress={handleRegister}
        style={[styles.signUpButton, {backgroundColor: theme.colors.primary}]}>
        <Text variant="titleMedium" style={{color: '#fff'}}>
          Sign Up
        </Text>
      </Button>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>
          Already have an account?{' '}
          <Link
            screen={'Login'}
            style={[styles.signInLink, {color: theme.colors.linkText}]}>
            Sign In
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
  subTitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  signUpButton: {
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 20,
  },
  signInContainer: {
    alignItems: 'center',
  },
  signInLink: {
    fontWeight: 'bold',
  },
});

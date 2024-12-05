import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
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

export default function Register() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
          value={name}
          onChangeText={setName}
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
        style={[styles.signUpButton, {backgroundColor: theme.colors.primary}]}>
        <Text variant="titleMedium" style={{color: '#fff'}}>
          Sign Up
        </Text>
      </Button>

      <View style={styles.dividerContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.orText}>Or sign up with</Text>
        <Divider style={styles.divider} />
      </View>

      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        style={{width: '100%', height: 50, marginBottom: 20}}
      />

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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  signInContainer: {
    alignItems: 'center',
  },
  signInLink: {
    fontWeight: 'bold',
  },
});

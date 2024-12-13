import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

export default function EmailSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Send Email Verification
  const sendVerificationEmail = async user => {
    try {
      await user.sendEmailVerification();
      Alert.alert(
        'Verification Email Sent',
        'Please check your inbox and verify your email before logging in.',
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not send verification email.');
    }
  };

  // Sign-Up with Email and Password
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }
    try {
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await sendVerificationEmail(user);
      Alert.alert('Success', 'Account created. Please verify your email.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  // Login with Email and Password
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      await user.reload();
      if (user.emailVerified) {
        Alert.alert('Success', 'Logged in successfully!');
      } else {
        await sendVerificationEmail(user);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSignUp ? 'Sign Up' : 'Login'} with Email
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {isSignUp ? (
        <Button mode="contained" onPress={handleSignUp}>
          Sign Up
        </Button>
      ) : (
        <Button mode="contained" onPress={handleLogin}>
          Login
        </Button>
      )}
      <Button
        mode="text"
        onPress={() => setIsSignUp(!isSignUp)}
        style={styles.toggleButton}>
        {isSignUp
          ? 'Already have an account? Login'
          : "Don't have an account? Sign Up"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  toggleButton: {
    marginTop: 10,
  },
});

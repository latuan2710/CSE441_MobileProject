import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function ForgotPassword({navigation}) {
  const theme = useTheme();
  const [email, setEmail] = useState('');

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Forgot Your Password</Text>
          <Text style={styles.subtitle}>
            Please enter your email address you'd like your password reset
            information sent to
          </Text>
        </View>

        <TextInput
          style={styles.input}
          textContentType="emailAddress"
          keyboardType="email-address"
          mode="outlined"
          label={'Enter email address'}
          value={email}
          onChangeText={setEmail}
        />
        <Button
          mode="contained"
          style={[styles.button, {backgroundColor: theme.colors.primary}]}>
          <Text variant="titleMedium" style={{color: '#fff'}}>
            Send Request
          </Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  button: {
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 8,
  },
});

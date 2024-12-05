import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {Link} from '@react-navigation/native';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Appbar,
  Button,
  Divider,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

export default function ResetPassword({navigation}) {
  const theme = useTheme();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password2, setPassword2] = useState('');
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>New Password</Text>
          <Text style={styles.subtitle}>
            Your new password must be different from previously used passwords.
          </Text>
        </View>
        <View style={styles.inputContainer}>
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
          <TextInput
            label="Enter your password again"
            value={password2}
            onChangeText={setPassword2}
            style={styles.input}
            mode="outlined"
            secureTextEntry={!showPassword2}
            right={
              <TextInput.Icon
                icon={showPassword2 ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword2(!showPassword2)}
              />
            }
          />
        </View>

        <Button
          mode="contained"
          style={[
            styles.signInButton,
            {backgroundColor: theme.colors.primary},
          ]}>
          <Text variant="titleMedium" style={{color: '#fff'}}>
            Create New Password
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
  input: {
    marginBottom: 16,
  },
  signInButton: {
    paddingVertical: 8,
    borderRadius: 5,
  },
});

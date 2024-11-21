import AuthTitle from '@components/AuthTitle';
import GGSignInButton from '@components/GGSignInButton';
import MyButton from '@components/MyButton';
import MyView from '@components/MyView';
import {Link} from '@react-navigation/native';
import {login} from '@services/authService';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text, TextInput, useTheme} from 'react-native-paper';

export default function LoginScreen({navigation}) {
  const theme = useTheme();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <MyView scrollable={false} style={styles.container}>
      <AuthTitle
        title={'Sign In'}
        subTitle={"Hi! Welcome back, you've been missed."}
      />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={'Enter your email or username'}
            value={account}
            onChangeText={setAccount}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            secureTextEntry={!passwordVisible}
            label={'Enter your password'}
            value={password}
            onChangeText={setPassword}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye-off' : 'eye'}
                onPress={() => setPasswordVisible(pre => !pre)}
              />
            }
          />
        </View>
        <Link style={styles.forgotPassword} to={{screen: 'ForgotPassword'}}>
          <Text style={{color: theme.colors.linkText}}>Forgot Password?</Text>
        </Link>
      </View>
      <View style={styles.buttonContainer}>
        <MyButton
          text={'Sign In'}
          textStyle={styles.buttonText}
          buttonStyle={styles.button}
          onPress={async () => {
            await login(account, password), navigation.navigate('TabNavigator');
          }}
        />
        <GGSignInButton />
      </View>
      <Text style={{textAlign: 'center', marginTop: 10}}>
        Don't have an account?{' '}
        <Link to={{screen: 'Register'}} style={styles.signUpLink}>
          <Text style={{color: theme.colors.linkText}}>Sign Up</Text>
        </Link>
      </Text>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  formContainer: {
    marginTop: 30,
  },
  inputContainer: {
    gap: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signUpLink: {
    textDecorationLine: 'underline',
  },
});

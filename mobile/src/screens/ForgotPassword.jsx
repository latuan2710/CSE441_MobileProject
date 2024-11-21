import AuthTitle from '@components/AuthTitle';
import MyButton from '@components/MyButton';
import MyView from '@components/MyView';
import {Link} from '@react-navigation/native';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');

  return (
    <MyView style={styles.container}>
      <AuthTitle
        title={'Forgot Your Password'}
        subTitle={
          "Please enter your email address you'd like your password reset information sent to"
        }
      />
      <TextInput
        style={styles.input}
        textContentType="emailAddress"
        keyboardType="email-address"
        mode="outlined"
        label={'Enter email address'}
        value={email}
        onChangeText={setEmail}
      />
      <MyButton
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        text={'Request Reset Link'}
        onPress={() => console.log('ok')}
      />
      <Link to={{screen: 'Login'}} style={styles.backLogin}>
        <Text>Back To Login</Text>
      </Link>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  input: {
    marginTop: 30,
  },
  button: {
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 0,
  },
  backLogin: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

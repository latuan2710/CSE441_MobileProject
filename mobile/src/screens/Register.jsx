import AuthTitle from '@components/AuthTitle';
import GGSignInButton from '@components/GGSignInButton';
import MyButton from '@components/MyButton';
import MyView from '@components/MyView';
import {Link} from '@react-navigation/native';
import {register} from '@services/authService';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';

export default function RegisterScreen({navigation}) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <MyView scrollable={false} style={styles.container}>
      <AuthTitle
        title={'Create Account'}
        subTitle={
          'Fill your information below or register with your social account.'
        }
      />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={'Enter your email'}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={'Enter your username'}
            value={username}
            onChangeText={setUsername}
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
          <TextInput
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            label={'Enter your phone number'}
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <MyButton
          text={'Sign Up'}
          textStyle={styles.buttonText}
          buttonStyle={styles.button}
          onPress={async () => {
            await register(username, email, password, phone);
            navigation.navigate('VerifyAccount');
          }}
        />
        <GGSignInButton />
      </View>
      <Text style={{textAlign: 'center', marginTop: 10}}>
        Already have an account?{' '}
        <Link
          to={{screen: 'Login'}}
          style={[styles.signInLink, {color: theme.colors.linkText}]}>
          Sign In
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
  signInLink: {
    textDecorationLine: 'underline',
  },
});

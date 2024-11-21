import AuthTitle from '@components/AuthTitle';
import MyButton from '@components/MyButton';
import MyView from '@components/MyView';
import {verifyAccount} from '@services/authService';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

export default function VerifyAccount({navigation}) {
  const theme = useTheme();
  const [code, setCode] = useState('');

  return (
    <MyView scrollable={false} style={styles.container}>
      <AuthTitle
        title={'Verify Account'}
        subTitle={'Please enter the code we just sent your email.'}
      />

      <View style={styles.codeContainer}>
        <TextInput
          mode="outlined"
          style={styles.codeInput}
          value={code}
          onChangeText={setCode}
        />
      </View>

      <Text
        style={styles.resendText}
        onPress={() => console.log('Resend code')}>
        Didn't receive OTP?{' '}
        <Text style={([styles.resendLink], {color: theme.colors.linkText})}>
          Resend code
        </Text>
      </Text>

      <MyButton
        text={'Verify'}
        buttonStyle={styles.verifyButton}
        onPress={async () => {
          let status = await verifyAccount(code);
          if (status === 200) {
            navigation.navigate('Login');
          } else {
            Alert.alert('Error', 'Enter code again!');
          }
        }}
      />
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 24,
  },
  codeInput: {
    width: "100%",
    height: 50,
    textAlign: 'center',
    fontSize: 18,
  },
  resendText: {
    color: '#6b6b6b',
    marginBottom: 16,
  },
  resendLink: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  verifyButton: {
    width: '80%',
  },
});

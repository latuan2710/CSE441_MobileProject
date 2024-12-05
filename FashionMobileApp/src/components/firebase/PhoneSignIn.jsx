import {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function PhoneSignIn() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  // Send OTP
  const sendOtp = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation.verificationId);
      Alert.alert('OTP Sent', 'Please check your messages.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!verificationCode) {
      Alert.alert('Error', 'Please enter the OTP sent to your phone.');
      return;
    }

    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode,
      );
      await auth().signInWithCredential(credential);
      Alert.alert('Success', 'You are now logged in!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phone Authentication</Text>
      {!verificationId ? (
        <>
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <Button mode="outlined" onPress={sendOtp}>
            Send OTP
          </Button>
        </>
      ) : (
        <>
          <TextInput
            label="Enter OTP"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            style={styles.input}
          />
          <Button mode="contained" onPress={verifyOtp}>
            Verify OTP
          </Button>
        </>
      )}
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
});

import MyButton from '@components/MyButton';
import MyView from '@components/MyView';
import {getProfile, updateProfile} from '@services/userService';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text, TextInput, useTheme} from 'react-native-paper';

export default function ProfileEditScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      setAddress(profile.address);
      setEmail(profile.email);
      setUsername(profile.username);
      setPhone(profile.phone);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    <MyView scrollable={false} style={styles.container}>
      <ActivityIndicator color={theme.colors.primary} />
    </MyView>;
  }

  return (
    <MyView scrollable={false} style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text variant="titleMedium">
            Email: <Text>{email}</Text>
          </Text>
          <Text variant="titleMedium">
            Username: <Text>{username}</Text>
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text variant="titleMedium">Phone: </Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text variant="titleMedium">Address: </Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <MyButton
          text={'Update'}
          textStyle={styles.buttonText}
          buttonStyle={styles.button}
          onPress={async () =>
            await updateProfile(username, email, address, phone)
          }
        />
      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },
  formContainer: {
    marginTop: 30,
  },
  inputContainer: {
    gap: 10,
  },
  input: {
    flex: 1,
    height: 25,
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

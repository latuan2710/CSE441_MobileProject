import MyView from '@components/MyView';
import Waiting from '@components/Waiting';
import { getProfile, updateProfile } from '@services/userService';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text, TextInput } from 'react-native-paper';

export default function ProfileEdit({navigation}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(profile => {
        setAddress(profile.address);
        setEmail(profile.email);
        setUsername(profile.username);
        setPhone(profile.phone);
        setLoading(false);
      })
      .catch(err => Alert.alert('Error', err.response.data.message));
  }, []);

  if (loading) {
    return <Waiting />;
  }

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Profile" titleStyle={styles.title} />
      </Appbar.Header>
      <MyView style={styles.container}>
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
          <Button
            mode="contained"
            onPress={async () => {
              try {
                await updateProfile(username, email, address, phone);
                Alert.alert('Success', 'Update profile successfully!');
              } catch (error) {
                Alert.alert('Error', error.response.data.message);
              }
            }}>
            Update
          </Button>
        </View>
      </MyView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 10,
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
  },
});

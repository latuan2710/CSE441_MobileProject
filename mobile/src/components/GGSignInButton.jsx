import {StyleSheet, View} from 'react-native';
import MyButton from './MyButton';
import {Icon, Text} from 'react-native-paper';

export default function GGSignInButton() {
  return (
    <MyButton
      buttonStyle={styles.button}
      onPress={() => console.log('ok')}>
      <View style={styles.iconContainer}>
        <Icon size={30} source={require('@assets/images/google-logo.webp')} />
      </View>
      <Text style={styles.buttonText}>Sign In With Google</Text>
    </MyButton>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  iconContainer: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

import {ActivityIndicator, Text} from 'react-native-paper';
import MyView from './MyView';

export default function Waiting() {
  return (
    <MyView style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          textAlign:'center'
        }}>
        Loading...
      </Text>
    </MyView>
  );
}

import {ActivityIndicator} from 'react-native-paper';
import MyView from './MyView';

export default function Waiting() {
  return (
    <MyView style={{justifyContent: 'center'}}>
      <ActivityIndicator />
    </MyView>
  );
}

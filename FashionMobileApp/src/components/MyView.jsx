import {View} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function MyView({children, style}) {
  const theme = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background, ...style}}>
      {children}
    </View>
  );
}

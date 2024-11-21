import {ScrollView, View} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function MyView({children, style = {}, scrollable}) {
  const theme = useTheme();

  const MyViewType = scrollable === false ? View : ScrollView;
  
  return (
    <MyViewType
      style={[
        {
          backgroundColor: theme.colors.background,
          flex: 1,
        },
        style,
      ]}>
      {children}
    </MyViewType>
  );
}

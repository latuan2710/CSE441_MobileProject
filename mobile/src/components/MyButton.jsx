import {Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function MyButton({
  children,
  text,
  buttonStyle = {},
  textStyle = {},
  onPress,
}) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {backgroundColor: theme.colors.primary, paddingVertical: 5},
        buttonStyle,
        children && {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      {text && (
        <Text
          style={[
            {textAlign: 'center', color: theme.colors.buttonText},
            textStyle,
          ]}>
          {text}
        </Text>
      )}
      {children}
    </TouchableOpacity>
  );
}

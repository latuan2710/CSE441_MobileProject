import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export default function AuthTitle({title, subTitle}) {
  return (
    <View style={styles.titleContainer}>
      <Text variant="headlineMedium" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    gap: 10,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'grey',
    textAlign: 'center',
    width: '80%',
  },
});

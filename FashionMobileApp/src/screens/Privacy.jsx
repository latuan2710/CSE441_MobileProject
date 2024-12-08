import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Text, useTheme} from 'react-native-paper';

export default function Privacy({navigation}) {
  const theme = useTheme();

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Privacy Policy" titleStyle={styles.title} />
      </Appbar.Header>
      <ScrollView
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={{marginTop: 20}}>
          <Text variant="titleMedium">Cancelation Policy</Text>
          <Text>
            Lorem ipsum da'or sit omet consectetur odipiscing elit. sed co
            eiusm.od tempor incididunt ut labore et dolore clique Lit enirn ad
            m.nim veniam, quis nostrud exercitation ullarnco laboris nisi ut
            aliquip ea commodo consequat Lorem ipsum dolor sit amet consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text variant="titleMedium">Cancelation Policy</Text>
          <Text>
            Lorem ipsum da'or sit omet consectetur odipiscing elit. sed co
            eiusm.od tempor incididunt ut labore et dolore clique Lit enirn ad
            m.nim veniam, quis nostrud exercitation ullarnco laboris nisi ut
            aliquip ea commodo consequat Lorem ipsum dolor sit amet consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text variant="titleMedium">Cancelation Policy</Text>
          <Text>
            Lorem ipsum da'or sit omet consectetur odipiscing elit. sed co
            eiusm.od tempor incididunt ut labore et dolore clique Lit enirn ad
            m.nim veniam, quis nostrud exercitation ullarnco laboris nisi ut
            aliquip ea commodo consequat Lorem ipsum dolor sit amet consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text variant="titleMedium">Cancelation Policy</Text>
          <Text>
            Lorem ipsum da'or sit omet consectetur odipiscing elit. sed co
            eiusm.od tempor incididunt ut labore et dolore clique Lit enirn ad
            m.nim veniam, quis nostrud exercitation ullarnco laboris nisi ut
            aliquip ea commodo consequat Lorem ipsum dolor sit amet consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text variant="titleMedium">Cancelation Policy</Text>
          <Text>
            Lorem ipsum da'or sit omet consectetur odipiscing elit. sed co
            eiusm.od tempor incididunt ut labore et dolore clique Lit enirn ad
            m.nim veniam, quis nostrud exercitation ullarnco laboris nisi ut
            aliquip ea commodo consequat Lorem ipsum dolor sit amet consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text variant="titleMedium">Cancelation Policy</Text>
          <Text>
            Lorem ipsum da'or sit omet consectetur odipiscing elit. sed co
            eiusm.od tempor incididunt ut labore et dolore clique Lit enirn ad
            m.nim veniam, quis nostrud exercitation ullarnco laboris nisi ut
            aliquip ea commodo consequat Lorem ipsum dolor sit amet consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    paddingVertical: 8,
  },
});

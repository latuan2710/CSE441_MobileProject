import MyScrollView from '@components/MyScrollView';
import OrderList from '@components/OrderList';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Text, useTheme} from 'react-native-paper';

const tabs = ['PENDING', 'SHIPPING', 'COMPLETED', 'CANCELLED'];

export default function Order({navigation}) {
  const theme = useTheme();
  const [tab, setTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="My Orders" titleStyle={styles.title} />
      </Appbar.Header>
      <View
        style={[
          styles.tabContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setTab(item)}
            style={[styles.tabButton, tab === item && styles.activeTab]}>
            <Text
              variant="titleMedium"
              style={[styles.tabText, tab !== item && styles.inactiveTabText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <MyScrollView refreshing={refreshing} setRefreshing={setRefreshing}>
        <OrderList status={tab} />
      </MyScrollView>
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
  tabContainer: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    padding: 5,
  },
  activeTab: {
    borderBottomWidth: 3,
  },
  tabText: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  inactiveTabText: {
    color: 'gray',
  },
});

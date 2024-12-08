import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Avatar, List, IconButton, Appbar, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const options = [
  {title: 'Your profile', icon: 'account', link: ''},
  {title: 'My Orders', icon: 'shopping-outline', link: ''},
  {title: 'Settings', icon: 'cog-outline', link: ''},
  {title: 'Help Center', icon: 'help-circle-outline', link: 'Help'},
  {title: 'Privacy Policy', icon: 'lock-outline', link: 'Privacy'},
  {title: 'Log out', icon: 'logout', link: ''},
];
export default function Profile({navigation}) {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="My Profile" titleStyle={styles.title} />
      </Appbar.Header>
      <View style={styles.avatarContainer}>
        <View>
          <Avatar.Image
            size={100}
            source={{
              uri: 'https://randomuser.me/api/portraits/women/44.jpg',
            }}
          />
          <IconButton
            icon="pencil-outline"
            iconColor='#fff'
            size={15}
            style={styles.editIcon}
            onPress={() => console.log('Edit Profile')}
          />
        </View>
        <Text style={styles.name}>Esther Howard</Text>
      </View>

      <FlatList
        data={options}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <List.Item
            title={item.title}
            left={props => (
              <Icon
                {...props}
                name={item.icon}
                size={24}
                color={theme.colors.primary}
              />
            )}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate(item.link)}
            style={styles.listItem}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor:'#000'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  listItem: {
    paddingVertical: 8,
  },
});

import MyScrollView from '@components/MyScrollView';
import MyView from '@components/MyView';
import {logout} from '@services/authService';
import {getProfile} from '@services/userService';
import {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {Appbar, Avatar, IconButton, List, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const options = [
  {title: 'Your profile', icon: 'account', link: 'ProfileEdit'},
  {title: 'My Orders', icon: 'shopping-outline', link: 'Order'},
  {title: 'Help Center', icon: 'help-circle-outline', link: 'Help'},
  {title: 'Privacy Policy', icon: 'lock-outline', link: 'Privacy'},
];

const needLogin = ['Your profile', 'My Orders'];

export default function Profile({navigation}) {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile().then(d => {
      setUser(d);
    });
  }, [refreshing]);

  const handleLogout = async () => {
    const status = await logout();
    if (status === 200) {
      setUser(null);
    }
  };

  return (
    <MyScrollView refreshing={refreshing} setRefreshing={setRefreshing}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="My Profile" titleStyle={styles.title} />
      </Appbar.Header>
      {user ? (
        <View style={styles.avatarContainer}>
          <View>
            <Avatar.Image
              size={100}
              source={{
                uri: user.avatar,
              }}
            />
            <IconButton
              icon="pencil-outline"
              iconColor="#fff"
              size={15}
              style={styles.editIcon}
              onPress={() => console.log('Edit Profile')}
            />
          </View>
          <Text style={styles.name}>Esther Howard</Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View style={[styles.avatarContainer, {flex: 1}]}>
            <Avatar.Image
              size={100}
              source={require('@assets/images/default_avatar.png')}
              style={{backgroundColor: '#fff', borderWidth: 0.5}}
            />
            <Text style={styles.name}>Guest</Text>
          </View>
          <View style={{flex: 1, gap: 10}}>
            <Button
              title="Sign In"
              onPress={() => navigation.navigate('Login')}
            />
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate('Register')}
            />
          </View>
        </View>
      )}
      <MyView>
        <FlatList
          scrollEnabled={false}
          data={options}
          keyExtractor={item => item.title}
          renderItem={({item}) => {
            if (!user && needLogin.includes(item.title)) return null;
            return (
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
            );
          }}
        />
      </MyView>
      {user && (
        <List.Item
          title={'Logout'}
          left={props => (
            <Icon
              {...props}
              name={'logout'}
              size={24}
              color={theme.colors.primary}
            />
          )}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleLogout}
          style={styles.listItem}
        />
      )}
    </MyScrollView>
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
  guestContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#000',
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

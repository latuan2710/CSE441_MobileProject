import MyView from '@components/MyView';
import Waiting from '@components/Waiting';
import {logout} from '@services/authService';
import {getProfile, updateAvatar} from '@services/userService';
import {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Appbar, Avatar, IconButton, List, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const options = [
  {title: 'Your profile', icon: 'account', link: 'ProfileEdit'},
  {title: 'My Orders', icon: 'shopping-outline', link: 'Order'},
  {title: 'Help Center', icon: 'help-circle-outline', link: 'Help'},
  {title: 'Privacy Policy', icon: 'lock-outline', link: 'Privacy'},
  {title: 'Logout', icon: 'logout'},
];

const needLogin = ['Your profile', 'My Orders', 'Logout'];

export default function Profile({navigation}) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile()
      .then(d => {
        setUser(d);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    const status = await logout();
    if (status === 200) {
      setUser(null);
    }
  };

  const editAvatar = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      await updateAvatar(result);
      setLoading(true);
      getProfile()
        .then(d => {
          setUser(d);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User canceled the picker');
      } else {
        console.error('File selection error:', error);
      }
    }
  };

  if (loading) {
    return <Waiting />;
  }

  return (
    <MyView>
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
              onPress={editAvatar}
            />
          </View>
          <Text style={styles.name}>{user.username}</Text>
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
            if (!user && needLogin.includes(item.title)) {
              return null;
            }
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
                onPress={() => {
                  if (item.title === 'Logout') {
                    handleLogout();
                  } else {
                    navigation.navigate(item.link);
                  }
                }}
                style={styles.listItem}
              />
            );
          }}
        />
      </MyView>
    </MyView>
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

import BottomDrawer from '@components/BottomDrawer';
import MyButton from '@components/MyButton';
import MyView from '@components/MyView';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Divider,
  IconButton,
  List,
  Text,
  useTheme,
} from 'react-native-paper';

export default function Profile({navigation}) {
  const isForcused = useIsFocused();
  const theme = useTheme();
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const menuItems = [
    {title: 'Your profile', icon: 'account', navigateScreen: "Profile_Edit"},
    {title: 'My Orders', icon: 'clipboard-list'},
    {title: 'Settings', icon: 'cog'},
    {title: 'Help Center', icon: 'help-circle-outline'},
    {title: 'Privacy Policy', icon: 'lock'},
  ];

  useEffect(() => {
    if (!isForcused) setDrawerVisible(false);
  }, [isForcused]);

  return (
    <MyView
      scrollable={false}
      style={styles.container}
      contentContainerStyle={styles.content}>
      <View style={styles.profileInfo}>
        <View>
          <Avatar.Image
            size={100}
            source={{uri: 'https://via.placeholder.com/100'}}
            style={styles.avatar}
          />
          <IconButton
            style={[styles.editIcon, {backgroundColor: theme.colors.primary}]}
            icon="pencil"
            size={15}
            iconColor="#fff"
            onPress={() => console.log('Edit Profile')}
          />
        </View>
        <Text variant="titleLarge" style={styles.name}>
          Esther Howard
        </Text>
      </View>
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <View key={index}>
            <List.Item
              title={item.title}
              left={props => (
                <List.Icon
                  {...props}
                  icon={item.icon}
                  color={theme.colors.primary}
                />
              )}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate(item.navigateScreen)}
            />
            <Divider />
          </View>
        ))}
        <View>
          <List.Item
            title={'Log out'}
            left={props => (
              <List.Icon
                {...props}
                icon={'logout'}
                color={theme.colors.primary}
              />
            )}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => setDrawerVisible(true)}
          />
        </View>
      </View>
      {isDrawerVisible && (
        <BottomDrawer
          visible={isDrawerVisible}
          onClose={() => setDrawerVisible(false)}>
          <View style={styles.content}>
            <Text variant="titleLarge" style={{textAlign: 'center'}}>
              Logout
            </Text>
            <Text>Are you sure you want to log out?</Text>
            <View style={styles.buttonContainer}>
              <MyButton
                buttonStyle={styles.cancel}
                textStyle={{color: '#000'}}
                text={'Cancel'}
                onPress={() => setDrawerVisible(false)}
              />
              <MyButton
                buttonStyle={styles.confirm}
                text={'Confirm'}
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          </View>
        </BottomDrawer>
      )}
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    marginLeft: 16,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    marginBottom: 8,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
  },
  name: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  menu: {
    marginTop: 16,
  },
  content: {
    padding: 16,
    alignSelf: 'center',
    marginVertical: 'auto',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancel: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
  },
  confirm: {
    borderRadius: 20,
    padding: 15,
  },
});

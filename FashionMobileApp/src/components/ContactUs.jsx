import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {List, useTheme} from 'react-native-paper';

const ContactUs = () => {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <List.Item
        title="Customer Service"
        description="1900.272737"
        left={props => <List.Icon {...props} icon="headset" color={theme.colors.primary} />}
      />
      <List.Item
        title="WhatsApp"
        description="(480) 555-0103"
        left={props => <List.Icon {...props} icon="whatsapp" color={theme.colors.primary} />}
      />
      <List.Item
        title="Website"
        description="https://www.coolmate.me/"
        left={props => <List.Icon {...props} icon="web" color={theme.colors.primary} />}
      />
      <List.Item
        title="Facebook"
        description="https://www.facebook.com/coolmate.me"
        left={props => <List.Icon {...props} icon="facebook" color={theme.colors.primary} />}
      />
      <List.Item
        title="Instagram"
        description="https://www.instagram.com/coolmate.me/"
        left={props => (
          <List.Icon {...props} icon="instagram" color={theme.colors.primary} />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});

export default ContactUs;

import ContactUs from "@components/ContactUs";
import FAQ from "@components/FAQ";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Appbar, Text, useTheme } from "react-native-paper";

export default function Help({navigation}) {
  const theme = useTheme();
  const [tab, setTab] = useState('faq');

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Help Center" titleStyle={styles.title} />
      </Appbar.Header>
      <ScrollView
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, tab === 'faq' && styles.activeTab]}
            onPress={() => setTab('faq')}>
            <Text
              variant="titleMedium"
              style={[styles.tabText, tab !== 'faq' && styles.inactiveTabText]}>
              FAQ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, tab === 'contact' && styles.activeTab]}
            onPress={() => setTab('contact')}>
            <Text
              variant="titleMedium"
              style={[
                styles.tabText,
                tab !== 'contact' && styles.inactiveTabText,
              ]}>
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>
        {tab === 'faq' && <FAQ />}
        {tab === 'contact' && <ContactUs />}
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
  },
  inactiveTabText: {
    color: 'gray',
  },
});

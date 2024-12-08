import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabs} from '@routes/index';
import {useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}>
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              let iconName = focused ? tab.activeIcon : tab.inActiveIcon;
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

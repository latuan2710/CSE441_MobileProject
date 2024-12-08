import {useCallback} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function MyScrollView({
  children,
  style,
  refreshing,
  setRefreshing,
}) {
  const theme = useTheme();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{flex: 1, backgroundColor: theme.colors.background, ...style}}>
      {children}
    </ScrollView>
  );
}

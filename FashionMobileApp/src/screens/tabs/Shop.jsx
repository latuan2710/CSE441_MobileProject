import MyScrollView from '@components/MyScrollView';
import ProductCard from '@components/ProductCard';
import Waiting from '@components/Waiting';
import {getAllProducts, searchProductsByKey} from '@services/productService';
import {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

export default function Shop() {
  const theme = useTheme();
  const [key, setKey] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllProducts()
      .then(d => {
        setProducts(d);
        setLoading(false);
      })
      .catch(err => Alert.alert('Error', err.message));
  }, [refreshing]);

  const handleSearch = useCallback(async () => {
    console.log(key);
    let data = await searchProductsByKey(key);
    setProducts(data);
  }, [key]);

  if (loading) return <Waiting />;

  return (
    <>
      <View style={{padding: 10, backgroundColor: theme.colors.background}}>
        <TextInput
          mode="outlined"
          value={key}
          onChangeText={setKey}
          placeholder={'Search...'}
          outlineStyle={{borderRadius: 50}}
          onSubmitEditing={handleSearch}
          left={<TextInput.Icon icon="magnify" />}
          right={
            key ? (
              <TextInput.Icon icon="close" onPress={() => setKey('')} />
            ) : null
          }
        />
      </View>
      <MyScrollView refreshing={refreshing} setRefreshing={setRefreshing}>
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({item}) => (
            <ProductCard
              id={item.id}
              title={item.name}
              price={item.price}
              rating={item.rating}
              imageUrl={item.image}
            />
          )}
        />
      </MyScrollView>
    </>
  );
}

import HomeProductList from '@components/HomeProductList';
import HomeSlide from '@components/HomeSlide';
import MyScrollView from '@components/MyScrollView';
import Waiting from '@components/Waiting';
import {getAllBrands} from '@services/brandService';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

export default function Home() {
  const [brands, setBrands] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBrands()
      .then(data => setBrands(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MyScrollView refreshing={refreshing} setRefreshing={setRefreshing}>
      <View>
        <HomeSlide />
      </View>
      {loading ? (
        <Waiting />
      ) : (
        brands.map(brand => (
          <HomeProductList
            key={brand.id}
            brandId={brand.id}
            brandName={brand.name}
            refresh={refreshing}
          />
        ))
      )}
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

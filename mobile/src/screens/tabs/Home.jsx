import HomeSlide from '@components/HomeSlide';
import MyView from '@components/MyView';
import ProductSlide from '@components/ProductSlide';
import {getAllProducts} from '@services/productService';
import {useEffect, useState} from 'react';
import {View} from 'react-native';

// const data = [
//   {
//     id: '1',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Jacket',
//     size: 'XL',
//     price: 83.97,
//   },
//   {
//     id: '2',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Suite',
//     size: 'XL',
//     price: 120,
//   },
//   {
//     id: '3',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Jacket',
//     size: 'XL',
//     price: 83.97,
//   },
//   {
//     id: '4',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Jacket',
//     size: 'XL',
//     price: 83.97,
//   },
//   {
//     id: '5',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Suite',
//     size: 'XL',
//     price: 120,
//   },
//   {
//     id: '6',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Jacket',
//     size: 'XL',
//     price: 83.97,
//   },
//   {
//     id: '7',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Jacket',
//     size: 'XL',
//     price: 83.97,
//   },
//   {
//     id: '8',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Suite',
//     size: 'XL',
//     price: 120,
//   },
//   {
//     id: '9',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Jacket',
//     size: 'XL',
//     price: 83.97,
//   },
//   {
//     id: '10',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Jacket',
//     size: 'XL',
//     price: 83.97,
//   },
//   {
//     id: '11',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Suite',
//     size: 'XL',
//     price: 120,
//   },
//   {
//     id: '12',
//     image: require('@assets/images/image.png'),
//     name: 'Brown Jacket',
//     size: 'XL',
//     price: 83.97,
//   },
// ];

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let products = await getAllProducts();
      setData(products);
    };

    fetchData();
  }, []);

  return (
    <MyView>
      <View>
        <HomeSlide />
      </View>
      <ProductSlide data={data} title={'Feature Product'} />
      <ProductSlide data={data} title={'Brand Product'} />
      <ProductSlide data={data} title={'Test Product'} />
    </MyView>
  );
}

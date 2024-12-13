import {useNavigation} from '@react-navigation/native';
import OrderItem from './OrderItem';

export default function OrderCompleted({orders}) {
  const navigation = useNavigation();
  return (
    <>
      {orders.map(item => (
        <OrderItem
          key={item.id}
          orderDetail={item}
          buttonTitle={'Leave Review'}
          onPress={() => navigation.navigate('Review')}
        />
      ))}
    </>
  );
}

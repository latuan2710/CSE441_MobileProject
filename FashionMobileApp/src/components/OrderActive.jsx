import OrderItem from './OrderItem';

export default function OrderActive({orders}) {
  return (
    <>
      {orders.map(item => (
        <OrderItem
          key={item.id}
          orderDetail={item}
          buttonTitle={'Track Order'}
          onPress={() => console.log('Track Order')}
        />
      ))}
    </>
  );
}

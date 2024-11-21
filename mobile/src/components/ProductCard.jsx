import { WishlistContext } from '@context/WishlistContext';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Icon, IconButton, Text } from 'react-native-paper';

export default function ProductCard({data}) {
  const [isFavor, setIsFavor] = useState(false);
  const {findWishlistById, addWishlist, wishlist} = useContext(WishlistContext);

  useEffect(() => {
    let product = findWishlistById(data.id);
    setIsFavor(product !== null);
  }, [wishlist]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{width: Dimensions.get('window').width * 0.45}}>
      <View>
        <Image
          source={{uri: data.image}}
          resizeMode="stretch"
          style={{
            height: 200,
            width: '100%',
            backgroundColor: 'blue',
            borderRadius: 10,
          }}
        />
        <IconButton
          icon={isFavor ? 'heart' : 'heart-outline'}
          size={20}
          onPress={() => {
            addWishlist(data);
          }}
          style={{
            position: 'absolute',
            bottom: -10,
            right: -10,
            backgroundColor: '#fff',
            borderWidth: 0.5,
          }}
        />
      </View>
      <View>
        <View style={{flexDirection: 'row', flexWrap: 'nowrap'}}>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Icon
                key={`star-${index}`}
                source={
                  Math.round(data.rating) - index <= 0
                    ? 'star-outline'
                    : data.rating - index === 0.5
                    ? 'star-half-full'
                    : 'star'
                }
                size={20}
                color="#FFD700"
              />
            ))}
        </View>
        <Text variant="titleMedium">{data.name}</Text>
        <Text variant="titleSmall">
          ${data.price}{' '}
          <Text
            variant="titleSmall"
            style={{
              color: 'red',
              textDecorationLine: 'line-through',
              marginLeft: 10,
            }}>
            ${data.price}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

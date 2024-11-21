import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useCallback, useEffect, useState} from 'react';

export const WishlistContext = createContext(null);

export default function WishlistContextProvider({children}) {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = async () => {
    const data = await AsyncStorage.getItem('wishlist');
    if (data) {
      setWishlist(JSON.parse(data));
    }
  };

  const updateWishlist = async () => {
    await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  const findWishlistById = useCallback(id => {
    let data = wishlist.find(product => product.id === id);

    return data ? data : null;
  });

  const addWishlist = useCallback(async data => {
    let product = findWishlistById(data.id);
    if (product) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, data]);
    }
  });

  useEffect(() => {
    loadWishlist();
  }, []);

  useEffect(() => {
    updateWishlist();
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{wishlist, findWishlistById, addWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
}

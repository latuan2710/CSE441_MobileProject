import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';

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

  const isContain = id => wishlist.includes(id);

  const addWishlist = async id => {
    let product = isContain(id);
    if (product) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  useEffect(() => {
    updateWishlist();
    console.log('wishlist: ', wishlist);
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{wishlist, isContain, addWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
}

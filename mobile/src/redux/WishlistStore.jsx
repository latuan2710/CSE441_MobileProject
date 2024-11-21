import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, createSlice} from '@reduxjs/toolkit';

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
  },
  reducers: {
    addWishlist: (state, action) => {
      const data = action.payload;

      let productIndex = state.wishlist.findIndex(
        product => product.id === data.id,
      );
      if (productIndex === -1) {
        state.wishlist.push({...data, isFavor: true});
      } else {
        const product = state.wishlist[productIndex];
        if (product.isFavor) {
          state.wishlist.splice(productIndex, 1);
        } else {
          state.wishlist[productIndex].isFavor = true;
        }
      }
    },
  },
});

export const getProductById = (state, id) => {
  console.log(state.wishlist);
};

export const {addWishlist} = WishlistSlice.actions;

const WishlistStore = configureStore({
  reducer: WishlistSlice.reducer,
});

export default WishlistStore;

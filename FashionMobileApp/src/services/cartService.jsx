import axios from 'axios';

const host = process.env.SERVER_HOST + '/api/service/carts';

export const getCart = async () => {
  const res = await axios.get(`${host}`);

  return res.data;
};

export const addToCart = async (productId, quantity) => {
  const res = await axios.post(`${host}/cart_detail`, {productId, quantity});

  return res.data;
};

export const changeQuantityCartItem = async (productId, quantity) => {
  const res = await axios.put(`${host}/cart_detail`, {productId, quantity});

  return res.data;
};

export const deleteCartItem = async id => {
  const res = await axios.delete(`${host}/cart_detail/${id}`);

  return res.data;
};

import axios from 'axios';

const host = process.env.SERVER_HOST + '/api/service/products';

export const getAllProducts = async () => {
  console.log(host);
  const res = await axios.get(`${host}`);

  return res.data;
};

export const getProductById = async id => {
  const res = await axios.get(`${host}/${id}`);

  return res.data;
};

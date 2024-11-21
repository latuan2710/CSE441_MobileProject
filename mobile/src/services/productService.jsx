import axios from 'axios';

const host = 'http://10.60.250.239:8080' + '/api/service/products';

console.log(host);

export const getAllProducts = async () => {
  const res = await axios.get(`${host}`);

  if (res.status === 200) {
    console.log('get all products ok: ');
  }

  return res.data;
};

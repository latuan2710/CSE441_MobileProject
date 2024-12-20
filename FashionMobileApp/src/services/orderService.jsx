import axios from 'axios';

const host = process.env.SERVER_HOST + '/api/service/orders';

export const checkout = async (
  receiverName,
  receiverAddress,
  receiverPhone,
) => {
  const res = await axios.post(`${host}/checkout`, {
    receiverName,
    receiverAddress,
    receiverPhone,
  });

  return res.data;
};

export const getOrderByStatus = async status => {
  const res = await axios.get(`${host}/user/${status}`);
  return res.data;
};

export const cancelOrder = async orderId => {
  const res = await axios.get(`${host}/user/cancel/${orderId}`);
  return res.data;
};

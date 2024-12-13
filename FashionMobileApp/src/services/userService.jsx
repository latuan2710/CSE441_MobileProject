import axios from 'axios';

const host = process.env.SERVER_HOST + '/api/users';

export const getProfile = async () => {
  const res = await axios.get(`${host}/profile`);

  return res.data;
};

export const updateProfile = async (username, email, address, phone) => {
  const res = await axios.put(`${host}/profile`, {
    username,
    email,
    phone,
    address,
  });

  return res.data;
};

export const updateAvatar = async file => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.put(`${host}/upload`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return res.data;
};

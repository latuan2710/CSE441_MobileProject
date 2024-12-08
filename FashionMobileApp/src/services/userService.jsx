import axios from 'axios';

const host = process.env.SERVER_HOST + '/api/users';

export const getProfile = async () => {
  const res = await axios.get(`${host}/profile`);

  if (res.status === 200) {
    console.log('get profile ok');
  }

  return res.data;
};

export const updateProfile = async (username, email, address, phone) => {
  const res = await axios.put(`${host}/profile`, {
    username,
    email,
    phone,
    address,
  });

  if (res.status === 200) {
    console.log('update profile ok: ', res.data);
  }

  return res.data;
};

export const updateAvatar = async file => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.put(`${host}/upload`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  if (res.status === 200) {
    console.log('update avatar ok: ', res.data);
  }

  return res.data;
};

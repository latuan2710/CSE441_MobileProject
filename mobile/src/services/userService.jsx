import axios from 'axios';

const host = 'http://10.60.250.239:8080' + '/api/users';

console.log(host);

export const getProfile = async () => {
  const res = await axios.get(`${host}/profile`);

  if (res.status === 200) {
    console.log('get profile ok: ', res.data);
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

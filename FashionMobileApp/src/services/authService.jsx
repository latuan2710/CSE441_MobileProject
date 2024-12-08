import axios from 'axios';

const host = process.env.SERVER_HOST + '/api/auth';

export const login = async (account, password) => {
  const res = await axios.post(`${host}/login`, {
    usernameOrEmail: account,
    password,
  });

  if (res.status === 200) {
    console.log('login ok: ', res.data);
  }

  return res.data;
};

export const register = async (username, email, password) => {
  const res = await axios.post(`${host}/register`, {
    username,
    password,
    email,
  });

  if (res.status === 200) {
    console.log('register ok: ', res.data);
  }

  return res.data;
};

export const verifyAccount = async token => {
  try {
    const res = await axios.get(`${host}/verify?token=${token}`);

    if (res.status === 200) {
      console.log('verifyAccount ok: ', res.data);
    }

    return res.status;
  } catch (error) {
    return 403;
  }
};

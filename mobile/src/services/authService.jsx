import axios from 'axios';

// const host = process.env.SERVER_HOST + '/api/auth';
const host = 'http://10.60.250.239:8080' + '/api/auth';

console.log(host);

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

export const register = async (username, email, password, phone) => {
  const res = await axios.post(`${host}/register`, {
    username,
    password,
    email,
    phone,
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

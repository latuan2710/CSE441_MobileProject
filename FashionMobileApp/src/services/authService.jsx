import axios from 'axios';

const host = process.env.SERVER_HOST + '/api/auth';

export const login = async (account, password) => {
  const res = await axios.post(`${host}/login`, {
    usernameOrEmail: account,
    password,
  });

  return res.data;
};

export const register = async (username, email, password) => {
  const res = await axios.post(`${host}/register`, {
    username,
    password,
    email,
  });

  return res.data;
};

export const verifyAccount = async token => {
  try {
    const res = await axios.get(`${host}/verify?token=${token}`);
    return res.status;
  } catch (error) {
    return 403;
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(`${host}/logout`);
    return res.status;
  } catch (error) {
    return 403;
  }
};

export const checkSession = async () => {
  try {
    const res = await axios.get(`${host}/check-session`);
    return res.status;
  } catch (error) {
    return 403;
  }
};

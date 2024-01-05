const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGenerator = (userId: string) => {
  const token = jwt.sign({ user_id: userId }, process.env.jwtSecret, {
    expiresIn: '1h', // Optionally, set an expiration time for the token
  });
  return token;
};

const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
};

const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.jwtSecret, { expiresIn: '1h' });
};

module.exports = { jwtGenerator, parseJwt, generateRefreshToken };

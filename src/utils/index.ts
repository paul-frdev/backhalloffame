const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_id: string) {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '4h' });
}

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

const axios = require('axios');

const USER_SERVICE_URL = "http://54.254.157.28:8080";

const validateUser = async (token) => {
  try {
    const res = await axios.get(
      `${USER_SERVICE_URL}/api/auth/validateToken`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error("User validation failed");
  }
};

module.exports = { validateUser };
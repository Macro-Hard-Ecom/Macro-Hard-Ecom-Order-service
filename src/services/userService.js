const axios = require('axios');

const USER_SERVICE_URL = "http://54.254.157.28:8080";

const validateUser = async (token) => {
  try {
    const res = await axios.get(
      `${USER_SERVICE_URL}/api/auth/validateToken`,
      {
        params: { token }, 
      }
    );

    if (res.data === true) {
      return { userId: "validated-user" }; 
    } else {
      throw new Error("Invalid token");
    }

  } catch (err) {
    console.error("User validation error:", err.message);
    throw new Error("User validation failed");
  }
};

module.exports = { validateUser };
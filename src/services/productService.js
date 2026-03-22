const axios = require('axios');

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

const getProduct = async (id, token) => {
  const res = await axios.get(`${PRODUCT_SERVICE_URL}/api/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data;
};

module.exports = { getProduct };
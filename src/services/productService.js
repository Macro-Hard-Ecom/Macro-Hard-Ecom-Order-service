const axios = require('axios');

const PRODUCT_SERVICE_URL = "http://localhost:3000"; // change later to AWS IP

const getProduct = async (id) => {
  const res = await axios.get(`${PRODUCT_SERVICE_URL}/products/${id}`);
  return res.data;
};

module.exports = { getProduct };
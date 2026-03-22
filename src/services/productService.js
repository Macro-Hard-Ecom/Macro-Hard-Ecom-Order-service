const axios = require('axios');

const PRODUCT_SERVICE_URL = "http://98.81.229.185:3000"; 

const getProduct = async (id) => {
  const res = await axios.get(`${PRODUCT_SERVICE_URL}/products/${id}`);
  return res.data;
};

module.exports = { getProduct };
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
} = require('../controllers/orderController');

/**
 * @swagger
 * /api/orders/createOrder:
 *   post:
 *     summary: Create new order
 *     tags: [Orders]
 */
router.post('/createOrder', createOrder);
router.get('/orders', getOrders);
router.get('/order/:id', getOrderById);

module.exports = router;
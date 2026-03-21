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
/**
 * @swagger
 * /api/orders/orders:
 *   get:
 *     summary: Get orders
 *     tags: [Orders]
 */
router.get('/orders', getOrders);
/**
 * @swagger
 * /api/orders/order/:id:
 *   post:
 *     summary: Get order by Id
 *     tags: [Orders]
 */
router.get('/order/:id', getOrderById);

module.exports = router;
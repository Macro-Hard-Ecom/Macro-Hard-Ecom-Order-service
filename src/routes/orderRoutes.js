const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  getProductStats,
} = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders/createOrder:
 *   post:
 *     summary: Create new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             items:
 *               - productId: "123"
 *                 quantity: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post('/createOrder', createOrder);

/**
 * @swagger
 * /api/orders/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/orders', getOrders);

/**
 * @swagger
 * /api/orders/order/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 */
router.get('/order/:id', getOrderById);
/**
 * @swagger
 * /api/orders/product-stats/{productId}:
 *   get:
 *     summary: Get total ordered quantity and revenue for a product
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product stats retrieved
 */
router.get('/product-stats/:productId', getProductStats);

module.exports = router;
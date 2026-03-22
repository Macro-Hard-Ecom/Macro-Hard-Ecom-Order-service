const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  getProductStats,
  updateOrderStatus,
  getUserOrderCount,
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

/**
 * @swagger
 * /api/orders/order/{id}/status:
 *   put:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: "Delivered"
 *     responses:
 *       200:
 *         description: Order updated successfully
 */

router.put('/order/:id/status', updateOrderStatus);

/**
 * @swagger
 * /api/orders/user/{userId}/count:
 *   get:
 *     summary: Get total number of orders by user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Total order count
 */
router.get('/user/:userId/count', getUserOrderCount);
module.exports = router;
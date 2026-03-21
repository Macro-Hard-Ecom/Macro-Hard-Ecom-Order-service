const Order = require('../models/order.js');
const { validateUser } = require('../services/userService');
const { getProduct } = require('../services/productService');

exports.createOrder = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const user = await validateUser(token);

    let total = 0;
    const items = [];

    for (let item of req.body.items) {
      const product = await getProduct(item.productId);

      items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });

      total += product.price * item.quantity;
    }

    const order = await Order.create({
      userId: user.id,
      items,
      totalAmount: total,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
};
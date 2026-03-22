const Order = require('../models/order.js');
const { validateUser } = require('../services/userService');
const { getProduct } = require('../services/productService');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
  try {
    //Extract token
    const token = req.headers.authorization?.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Validate user
    await validateUser(token);

    //Decode token
    const decoded = jwt.decode(token);
    const userId = decoded.sub;

    let total = 0;
    const items = [];

    for (let item of req.body.items) {
      const product = await getProduct(item.productId, token);

      items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });

      total += product.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      items,
      totalAmount: total,
    });

    res.status(201).json(order);

  } catch (err) {
    console.error(err);
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


exports.getProductStats = async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Aggregate data
    const result = await Order.aggregate([
      { $unwind: "$items" }, // split items array
      {
        $match: {
          "items.productId": new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$items.productId",
          totalQuantity: { $sum: "$items.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$items.price", "$items.quantity"] },
          },
        },
      },
    ]);

    // If no orders found
    if (result.length === 0) {
      return res.json({
        productId,
        totalQuantity: 0,
        totalRevenue: 0,
      });
    }

    res.json({
      productId,
      totalQuantity: result[0].totalQuantity,
      totalRevenue: result[0].totalRevenue,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    // Validate status
    const validStatuses = ["Pending", "Paid", "Shipped","Refunded"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Update
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate('userId').populate('products.productId');
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('userId').populate('products.productId');
  if (!order) return res.status(404).json({ message: 'الطلب غير موجود' });
  res.json(order);
};

exports.updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!order) return res.status(404).json({ message: 'الطلب غير موجود' });
  res.json(order);
};

exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'تم حذف الطلب' });
};

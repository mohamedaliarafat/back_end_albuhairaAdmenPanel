const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

// GET /dashboard/stats
exports.getStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();

    res.json({
      users: usersCount,
      orders: ordersCount,
      products: productsCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "حدث خطأ أثناء جلب البيانات 😢" });
  }
};

const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find().populate('recipients');
  res.json(notifications);
};

exports.createNotification = async (req, res) => {
  const notification = await Notification.create(req.body);
  res.json(notification);
};

exports.deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ message: 'تم حذف الإشعار' });
};

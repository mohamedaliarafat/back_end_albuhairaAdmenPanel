const Delivery = require('../models/Delivery');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// توليد OTP عشوائي
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  try {
    const delivery = await Delivery.findOne({ phone });
    if (!delivery) return res.status(400).json({ message: 'رقم الهاتف غير مسجل.' });

    const otp = generateOTP();
    delivery.otp = otp;
    delivery.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // صلاحية 5 دقائق
    await delivery.save();

    await client.messages.create({
      to: phone,
      from: process.env.TWILIO_PHONE,
      body: `رمز التحقق الخاص بك: ${otp}`
    });

    res.json({ message: 'تم إرسال OTP بنجاح.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'حدث خطأ أثناء إرسال OTP.' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const delivery = await Delivery.findOne({ phone });
    if (!delivery) return res.status(400).json({ message: 'رقم الهاتف غير مسجل.' });

    if (delivery.otp !== otp) return res.status(400).json({ message: 'OTP غير صحيح.' });
    if (delivery.otpExpires < new Date()) return res.status(400).json({ message: 'OTP منتهي الصلاحية.' });

    const token = jwt.sign({ id: delivery._id, role: 'delivery' }, process.env.JWT_SECRET, { expiresIn: '12h' });

    delivery.otp = null;
    delivery.otpExpires = null;
    await delivery.save();

    res.json({ message: 'تم التحقق بنجاح.', token, delivery: { id: delivery._id, name: delivery.name, phone: delivery.phone } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'حدث خطأ أثناء التحقق.' });
  }
};

// CRUD لإدارة السائقين
exports.getAll = async (req, res) => {
  const deliveries = await Delivery.find();
  res.json(deliveries);
};

exports.getById = async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);
  if (!delivery) return res.status(404).json({ message: 'سائق غير موجود.' });
  res.json(delivery);
};

exports.create = async (req, res) => {
  const newDelivery = new Delivery(req.body);
  await newDelivery.save();
  res.json(newDelivery);
};

exports.update = async (req, res) => {
  const updated = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.delete = async (req, res) => {
  await Delivery.findByIdAndDelete(req.params.id);
  res.json({ message: 'تم الحذف بنجاح.' });
};

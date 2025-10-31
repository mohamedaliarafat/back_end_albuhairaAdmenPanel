require('dotenv').config();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    const admin = await Admin.findOne({ phone });
    if (!admin) return res.status(400).json({ message: 'رقم الهاتف غير مسجل.' });

    await client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' });

    res.json({ message: 'تم إرسال رمز التحقق.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'حدث خطأ أثناء إرسال OTP.', error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, code } = req.body;

    const verificationCheck = await client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status !== 'approved') {
      return res.status(400).json({ message: 'رمز التحقق غير صحيح أو منتهي الصلاحية.' });
    }

    const token = jwt.sign({ phone, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'حدث خطأ أثناء التحقق من OTP.', error: err.message });
  }
};

const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  vehicle: { type: String }, // نوع المركبة
  status: { type: String, default: 'available' }, // الحالة: available, busy, off
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  otp: { type: String },
  otpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', deliverySchema);

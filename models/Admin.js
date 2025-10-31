const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, default: 'Admin' },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);

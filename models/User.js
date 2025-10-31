const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String },
  status: { type: String, default: 'active' }, // active / blocked
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);

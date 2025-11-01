// createAdmin.js
const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./models/Admin'); // المسار حسب مشروعك

// اتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const createAdmin = async () => {
  const newAdmin = new Admin({
    phone: '+966576595110', // رقم الجوال مع كود الدولة
    name: 'Nasser'
  });

  await newAdmin.save();
  console.log('Admin created!');
  mongoose.disconnect();
};

createAdmin();

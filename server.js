require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use("/dashboard", dashboardRoutes);


const PORT = process.env.PORT || 6014;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));

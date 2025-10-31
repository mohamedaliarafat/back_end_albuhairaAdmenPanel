const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

// OTP
router.post('/send-otp', deliveryController.sendOTP);
router.post('/verify-otp', deliveryController.verifyOTP);

// CRUD
router.get('/', deliveryController.getAll);
router.get('/:id', deliveryController.getById);
router.post('/', deliveryController.create);
router.put('/:id', deliveryController.update);
router.delete('/:id', deliveryController.delete);

module.exports = router;

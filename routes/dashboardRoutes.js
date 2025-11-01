const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authenticateToken = require("../middleware/authMiddleware"); // لو عندك توكن JWT

// GET /dashboard/stats
router.get("/stats", authenticateToken, dashboardController.getStats);

module.exports = router;


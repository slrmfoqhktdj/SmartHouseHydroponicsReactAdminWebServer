const express = require('express')
const router = express.Router()
const monitoring = require('../controllers/monitoring')
const authMiddleware = require('../middlewares/auth')

router.get('/dashboarddata',authMiddleware.isAuthenticated,monitoring.getDashboardData)


module.exports = router
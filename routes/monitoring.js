<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const monitoring = require('../controllers/monitoring')
const authMiddleware = require('../middlewares/auth')

router.get('/dashboarddata',authMiddleware.isAuthenticated,monitoring.getDashboardData)


=======
const express = require('express')
const router = express.Router()
const monitoring = require('../controllers/monitoring')
const authMiddleware = require('../middlewares/auth')

router.get('/dashboarddata',authMiddleware.isAuthenticated,monitoring.getDashboardData)


>>>>>>> d9c85bf62bb727feba0d3c463ce39bcb2f3ca3c9
module.exports = router
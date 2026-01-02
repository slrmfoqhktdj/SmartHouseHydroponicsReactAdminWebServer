<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth')
const authMiddleware = require('../middlewares/auth')



// router.get('/checkLogin', AuthController.isGuest)
router.post('/authenticate',authMiddleware.isLogin,  AuthController.authenticate)
router.post('/logout',authMiddleware.isAuthenticated,AuthController.signOut)

// router.get('/register', authMiddleware.isGuest, AuthController.register)
// router.post('/register', authMiddleware.isGuest, AuthController.signup)
// router.post('/logout', authMiddleware.isAuthenticated, AuthController.signOut)
// router.get('/reset-password', authMiddleware.isGuest, AuthController.passwordReset)





=======
const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth')
const authMiddleware = require('../middlewares/auth')



// router.get('/checkLogin', AuthController.isGuest)
router.post('/authenticate',authMiddleware.isLogin,  AuthController.authenticate)
router.post('/logout',authMiddleware.isAuthenticated,AuthController.signOut)

// router.get('/register', authMiddleware.isGuest, AuthController.register)
// router.post('/register', authMiddleware.isGuest, AuthController.signup)
// router.post('/logout', authMiddleware.isAuthenticated, AuthController.signOut)
// router.get('/reset-password', authMiddleware.isGuest, AuthController.passwordReset)





>>>>>>> d9c85bf62bb727feba0d3c463ce39bcb2f3ca3c9
module.exports = router
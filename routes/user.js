const express = require('express')
const router = express.Router()
const user = require('../controllers/user')
const authMiddleware = require('../middlewares/auth')

router.get('/userlist/:s_order/:e_order',authMiddleware.isAuthenticated,user.getuserlist)         // 유저 관리

router.get('/userlist/search/:column/:data',authMiddleware.isAuthenticated,user.getuserlist_search)         // 유저 검색

router.post('/user/register',authMiddleware.isAuthenticated,user.insertuser)    // 유저 추가
router.post('/user/remove',authMiddleware.isAuthenticated,user.removeuser)    // 유저 삭제
router.post('/user/update',authMiddleware.isAuthenticated,user.updateuser)    // 유저 수정
router.post('/user/alert',authMiddleware.isAuthenticated,user.alarmuser)    // 유저 알람
router.post('/user/whole/alert',authMiddleware.isAuthenticated,user.alarmwhole)    // 유저 전체 알람

module.exports = router
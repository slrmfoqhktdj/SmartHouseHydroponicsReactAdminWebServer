const express = require('express')
const router = express.Router()
const analysis = require('../controllers/analysis')
const authMiddleware = require('../middlewares/auth')



router.get('/device_daily_list/:s_order/:e_order',authMiddleware.isAuthenticated,analysis.getdevice_daily_list)  // 일자별 충전량 조회
router.get('/device_daily_list/search/:column/:data',authMiddleware.isAuthenticated,analysis.getdevice_daily_list_search)    // 일자별 충전량 조회 검색



// router.get('/charge_daily_graph_list',authMiddleware.isAuthenticated,analysis.getcharge_daily_graph_list)    //충전기 그래프 조회   - 기기 리스트
router.post('/device_daily_graph',authMiddleware.isAuthenticated,analysis.getdevice_daily_graph)    //충전기 그래프 조회   - 그래프 값

module.exports = router
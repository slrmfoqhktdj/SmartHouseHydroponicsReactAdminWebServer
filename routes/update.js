const express = require('express')
const router = express.Router()
const update = require('../controllers/update')
const multer = require('multer')
const authMiddleware = require('../middlewares/auth')

// const storagePole = multer.diskStorage({
//     destination:function(req,file,cb){
//         console.log(req.body)
//         cb(null,__dirname+"/../update_apks/POLE/")
//     },
//     filename: function(req,file,cb){
//         // cb(null,"app-debug.apk")
//     }
// })
// const uploadPolefunction = multer({storage:storagePole})

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname+"/../update_zip/")
    },
    filename: function(req,file,cb){
        // cb(null,"app-debug.apk")
        file.originalname = Buffer.from(file.originalname,'latin1').toString('utf8')
        cb(null,file.originalname)
    }
})
const uploadfunction = multer({storage:storage})


router.get('/zipfilelist',authMiddleware.isAuthenticated,update.getZipfilelist)    // 프로그램 업로드 페이지 리스트

router.get('/deviceswlist/:s_order/:e_order',authMiddleware.isAuthenticated,update.getDeviceswlist)  // 프로그램 업데이트 페이지 리스트

router.get('/deviceswlist/search/:column/:data',authMiddleware.isAuthenticated,update.getDeviceswlist_search)   // 프로그램업데이트 페이지 검색


router.post('/upload/zipfile',authMiddleware.isAuthenticated,uploadfunction.single('zipfile'),update.uploadZip)   // zip 업로드
router.post('/upload/filedelete',authMiddleware.isAuthenticated,update.deleteZip)   // zip 삭제

router.post('/command/upd',authMiddleware.isAuthenticated,update.commandUpdateFirmWare)    //프로그램 업데이트 명령

// router.post('/apks',update.)    // apk 파일 공유

module.exports = router
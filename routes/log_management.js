<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const log_management = require('../controllers/log_management')
const multer = require('multer')
const path = require('path');
const authMiddleware = require('../middlewares/auth')

const storageLog = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname+"/../logs/")
    },
    filename: function(req,file,cb){
        

        const extension = path.extname(file.originalname);		
        const basename = path.basename(file.originalname, extension);		
        
        cb(null, basename + extension); // 파일이름이 abc.txt로 들어간다
    }
})
const LogFilefunction = multer({storage:storageLog})


router.get('/logcmdpage/:s_order/:e_order',authMiddleware.isAuthenticated,log_management.getDevicelogcmdpage)   // 진단파일 요청 페이지

router.get('/logcmdpage/search/:column/:data',authMiddleware.isAuthenticated,log_management.getDevicelogcmdpage_search)   // 진단파일 요청 페이지 검색

router.get('/loglistpage',authMiddleware.isAuthenticated,log_management.getDeviceloglistpage)   // 진단파일 관리 페이지


router.post('/command/upl',authMiddleware.isAuthenticated,log_management.commandUploadLog)     // 진단파일 업로드 명령
router.post('/log/allremove',authMiddleware.isAuthenticated,log_management.commandRemoveAllLog)     // 해당 하우스 모든 진단파일 삭제
router.post('/log/remove',authMiddleware.isAuthenticated,log_management.commandRemoveLog)     //  진단파일 삭제

router.post('/uploadlog',LogFilefunction.single("upload_log"),log_management.uploadLog)   // 하우스 진단파일 업로드
router.get('/downloadlog/:fileName',authMiddleware.isAuthenticated,log_management.downloadLog) // 하우스 진단파일 다운로드

// router.post('/uploadlog',(req,res)=>{

//     LogFilefunction.array("upload_log")(req,res,function(err){
//         console.log(req.body.s_time)
//         console.log(req.body.e_time)
//     })
// })

=======
const express = require('express')
const router = express.Router()
const log_management = require('../controllers/log_management')
const multer = require('multer')
const path = require('path');
const authMiddleware = require('../middlewares/auth')

const storageLog = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname+"/../logs/")
    },
    filename: function(req,file,cb){
        

        const extension = path.extname(file.originalname);		
        const basename = path.basename(file.originalname, extension);		
        
        cb(null, basename + extension); // 파일이름이 abc.txt로 들어간다
    }
})
const LogFilefunction = multer({storage:storageLog})


router.get('/logcmdpage/:s_order/:e_order',authMiddleware.isAuthenticated,log_management.getDevicelogcmdpage)   // 진단파일 요청 페이지

router.get('/logcmdpage/search/:column/:data',authMiddleware.isAuthenticated,log_management.getDevicelogcmdpage_search)   // 진단파일 요청 페이지 검색

router.get('/loglistpage',authMiddleware.isAuthenticated,log_management.getDeviceloglistpage)   // 진단파일 관리 페이지


router.post('/command/upl',authMiddleware.isAuthenticated,log_management.commandUploadLog)     // 진단파일 업로드 명령
router.post('/log/allremove',authMiddleware.isAuthenticated,log_management.commandRemoveAllLog)     // 해당 하우스 모든 진단파일 삭제
router.post('/log/remove',authMiddleware.isAuthenticated,log_management.commandRemoveLog)     //  진단파일 삭제

router.post('/uploadlog',LogFilefunction.single("upload_log"),log_management.uploadLog)   // 하우스 진단파일 업로드
router.get('/downloadlog/:fileName',authMiddleware.isAuthenticated,log_management.downloadLog) // 하우스 진단파일 다운로드

// router.post('/uploadlog',(req,res)=>{

//     LogFilefunction.array("upload_log")(req,res,function(err){
//         console.log(req.body.s_time)
//         console.log(req.body.e_time)
//     })
// })

>>>>>>> d9c85bf62bb727feba0d3c463ce39bcb2f3ca3c9
module.exports = router
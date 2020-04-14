const express = require('express')
const moment = require('moment')

const router = express.Router()

router.get('/ios', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);

    res.render('ios.html')
})
router.get('/kefu', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    res.render('kefu.html')
})
router.get('/bidu', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    res.render('App试玩赚钱怎么做？新手篇_苹果宝盒网.html')
})

module.exports = router;
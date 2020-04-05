const express = require('express')
const router = express.Router()
const moment = require('moment')
router.get('/', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    res.render('mainpage.html')
})

module.exports = router;
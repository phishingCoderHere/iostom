const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.render('mainpage.html')
})
router.get('/ios', function (req, res) {
    res.render('ios.html')
})
router.get('/kefu', function (req, res) {
    res.render('kefu.html')
})
router.get('/bidu', function (req, res) {
    res.render('how.html')
})
router.get('/xinshou', function (req, res) {
    res.render('tutorial.html')
})
module.exports = router;
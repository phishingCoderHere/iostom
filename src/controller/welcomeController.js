const express = require('express')
const router = express.Router()

router.get('/welcome', function (req, res) {
    res.render('welcome.html')
})
router.get('/kefu', function (req, res) {
    res.render('kefu.html')
})
router.get('/newuser', function (req, res) {
    res.render('App试玩赚钱怎么做？新手篇_苹果宝盒网.html')
})

module.exports = router;
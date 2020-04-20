const express = require('express')
const router = express.Router()
router.get('/server/index', function (req, res) {
    console.log('后台管理首页req.url', req.url)
    res.render('index.html')
})
module.exports = router
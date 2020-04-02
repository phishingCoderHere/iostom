const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    console.log('主页req.url', req.url)
    res.render('quickstart/index.html')
})

module.exports = router;
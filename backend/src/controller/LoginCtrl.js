const express = require('express')
const router = express.Router()
router.get('/login', function (req, res) {
    console.log('登录页 url:', req.url)
    res.render('login.html')
})
module.exports = router
const express = require('express')
const router = express.Router()
const httpUtils = require('../utils/httpUtils')

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
    httpUtils.sendRequest('localhost', '/quickstart/condition.do', 'GET', 8445, (data) => {
        let result = JSON.parse(data.toString('utf8'))
        res.render('framework.html', {
            tmpl: './tmpls/toturial.tmpl.html',
            data: {
                toturials: result.data
            }
        })
    })
})
module.exports = router;
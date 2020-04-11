const express = require('express')
const moment = require('moment')
const router = express.Router()
const httpUtils = require('../utils/httpUtils')

router.get('/', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    res.render('mainpage.html')
})
router.get('/ios', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    res.render('framework.html', {
        tmpl: './tmpls/iosapps.tmpl.html'
    })
})
router.get('/kefu', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    res.render('framework.html', {
        tmpl: './tmpls/kefu.tmpl.html'
    })
})
router.get('/bidu', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    res.render('framework.html', {
        tmpl: './tmpls/how.tmpl.html'
    })
})
router.get('/jiaocheng/:id', function (req, res) {
    const id = req.params.id
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    console.log('查询教程 id:', id);

    httpUtils.sendRequest('localhost', `/quickstart/detail.do/${id}`, 'GET', 8445, (data) => {
        let result = JSON.parse(data.toString('utf8'))
        console.log('请求结果', result);

        res.render('framework.html', {
            tmpl: './tmpls/toturial.tmpl.html',
            toturial: {
                ...result
            }
        })
    })
})
router.get('/xinshou', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    console.log('新手页面');
    httpUtils.sendRequest('localhost', '/quickstart/condition.do', 'GET', 8445, (data) => {
        let result = JSON.parse(data.toString('utf8'))
        res.render('framework.html', {
            tmpl: './tmpls/toturiallist.tmpl.html',
            data: {
                toturials: result.data
            }
        })
    })
})
module.exports = router;
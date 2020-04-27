const express = require('express')
const moment = require('moment')
const router = express.Router()

const axios = require('axios')
// const httpUtils = require('../utils/httpUtils')


router.get('*', function (req, res, next) {
    let type
    switch (req.path) {
        case '/ios':
            type = '1'
            break;
        case '/android':
            type = '2'
            break;
        case '/course':
            type = '3'
            break;
        default:
            type = '0'
    }
    axios.post('http://localhost:8445/log/add.do', {
        start_time: moment(),
        end_time: moment(),
        host: req.host,//主机地址
        path: req.path,//路径 
        type: type,//类型（教程，安卓，IOS）
        name: '',//名称（可以是教程名称，应用名称）
        desc: '',//描述
        duration: 0,//执行时间ms
    }).then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
    }).catch(error => {
        console.error(error)
    })
    next()
})
router.get('/', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    res.render('mainpage.html')
})

router.get('/kefu', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    httpUtils.sendRequest({
        url: 'localhost', path: '/course/condition.do?local=6', method: 'GET', port: 8445,
        callback: (data) => {
            const result = JSON.parse(data);
            if (result.data.length === 1) {
                const content = JSON.parse(result.data[0].content)
                if (typeof content === 'object') {//兼容旧内容
                    //因为wangEditor存储时是存的修改记录的数组，所以每次取最新的
                    result.data[0].content = content[content.length - 1]
                }
                res.render('framework.html', {
                    tmpl: './tmpls/toturial.tmpl.html',
                    data: {
                        toturial: result.data[0]
                    }
                })
            } else {//默认页面  TODO
                res.render('framework.html', {
                    tmpl: './tmpls/kefu.tmpl.html'
                })
            }
        }
    })
})
/**
 * 必读
 */
router.get('/bidu', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    httpUtils.sendRequest({
        url: 'localhost', path: '/course/condition.do?local=5', method: 'GET', port: 8445,
        callback: (data) => {
            const result = JSON.parse(data);
            if (result.data.length === 1) {
                const content = JSON.parse(result.data[0].content)
                if (typeof content === 'object') {//兼容旧内容
                    //因为wangEditor存储时是存的修改记录的数组，所以每次取最新的
                    result.data[0].content = content[content.length - 1]
                }
                res.render('framework.html', {
                    tmpl: './tmpls/toturial.tmpl.html',
                    data: {
                        toturial: result.data[0]
                    }
                })
            } else {//默认页面  TODO
                res.render('framework.html', {
                    tmpl: './tmpls/how.tmpl.html',
                })
            }
        }
    })
})

/**
 * 新手教程
 */
router.get('/xinshou', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    httpUtils.sendRequest({
        url: 'localhost', path: '/course/condition.do', method: 'GET', port: 8445, callback: (data) => {
            let result = JSON.parse(data.toString('utf-8'))
            res.render('framework.html', {
                tmpl: './tmpls/toturiallist.tmpl.html',
                data: {
                    toturials: result.data
                }
            })
        }
    })
})

/**
 * 按id查询教程
 */
router.get('/jiaocheng/:id', function (req, res) {
    const id = req.params.id
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    console.log('查询教程 id:', id);

    httpUtils.sendRequest({
        url: 'localhost', path: `/course/detail.do/${id}`, method: 'GET', port: 8445, callback: (data) => {
            let result = JSON.parse(data.toString('utf8'))
            // console.log('请求结果', result);

            res.render('framework.html', {
                tmpl: './tmpls/toturial.tmpl.html',
                toturial: {
                    ...result
                }
            })
        }
    })
})
module.exports = router;
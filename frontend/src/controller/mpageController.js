const express = require('express')
const moment = require('moment')
const axios = require('axios')
const config = require('../config/Config')

const router = express.Router()

const address = `${config.BACKEND_HOST}:${config.BACKEND_PORT}`

/**
 * 所有请求入口
 * */
router.get('*', function (req, res, next) {
    let type, name
    const headers = req.headers.accept.split(",")
    if (headers.includes('text/html')) {
        switch (req.path) {
            case '/ios':
                type = '1'
                name = 'ios'
                break;
            case '/android':
                type = '2'
                name = 'android'
                break;
            case '/course':
                type = '3'
                name = 'course'
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
            name: name,//名称（可以是教程名称，应用名称）
            desc: '',//描述
            duration: 0,//执行时间ms
        }).then(res => {

        }).catch(error => {
            console.log('日志写入失败', error);
        })
    }
    next()
})

/**
 * 主页
 */
router.get('/', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    res.render('mainpage.html')
})

/**
 * 客服
 */
router.get('/kefu', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    axios.get(`${address}/course/condition.do?local=6`).then(({ data }) => {
        if (data.data.length === 1) {
            const content = JSON.parse(data.data[0].content)
            if (typeof content === 'object') {//兼容旧内容
                //因为wangEditor存储时是存的修改记录的数组，所以每次取最新的
                data.data[0].content = content[content.length - 1]
            }
            res.render('framework.html', {
                tmpl: './tmpls/toturial.tmpl.html',
                data: {
                    toturial: data.data[0]
                }
            })
        } else {//默认页面  TODO
            res.render('framework.html', {
                tmpl: './tmpls/kefu.tmpl.html'
            })
        }
    }).catch(error => {
        res.status(500).json(error)
    })
})

/**
 * 必读
 */
router.get('/bidu', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    axios.get(`${address}/course/condition.do?local=5`).then(({ data }) => {
        if (data.data.length === 1) {
            const content = JSON.parse(data.data[0].content)
            if (typeof content === 'object') {//兼容旧内容
                //因为wangEditor存储时是存的修改记录的数组，所以每次取最新的
                data.data[0].content = content[content.length - 1]
            }
            res.render('framework.html', {
                tmpl: './tmpls/toturial.tmpl.html',
                data: {
                    toturial: data.data[0]
                }
            })
        } else {//默认页面  TODO
            res.render('framework.html', {
                tmpl: './tmpls/how.tmpl.html',
            })
        }
    }).catch(error => {
        res.status(500).json(error)
    })
})

/**
 * 新手教程
 */
router.get('/xinshou', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    axios.get(`${address}/course/condition.do`).then(({ data }) => {
        res.render('framework.html', {
            tmpl: './tmpls/toturiallist.tmpl.html',
            data: {
                toturials: data.data
            }
        })
    }).catch(error => {
        res.status(500).json(error)
    })
})

/**
 * 添加入口
 */
router.get('/addentry', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    res.render('addentry.html')
})

/**
 * 按id查询教程
 */
router.get('/jiaocheng/:id', function (req, res) {
    const id = req.params.id
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    axios.get(`${address}/course/detail.do/${id}`).then(({ data }) => {
        res.render('framework.html', {
            tmpl: './tmpls/toturial.tmpl.html',
            toturial: {
                ...data
            }
        })
    }).catch(error => {
        res.status(500).json(error)
    })
})
module.exports = router;
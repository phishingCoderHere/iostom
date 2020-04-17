/**
 * 应用列表控制器
 */

const express = require('express')

const router = express.Router()
let App = require('../domain/App')
const appCrud = require('../repository/AppCrud')

/**
 * 条件查询
 */
router.get('/app/condition.do', function (req, res) {
    console.log('条件查询req.url', req.url)
    console.log('条件查询req.query', req.query)
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const obj = {}
    if (req.query.title) {//title：模糊查询
        obj.title = { $regex: `.*${req.query.title}.*`, $options: 'i' }
    }
    appCrud.find(App, obj,
        (err, ret) => {
            const data = JSON.stringify({
                data: ret,
                pagingBean: {
                    allNum: ret.length
                }
            })
            res.end(data)
        }
    )
})

/**
 * 详情
 */
router.get('/app/detail.do/:id', function (req, res) {
    console.log('详情 req.url', req.url)
    console.log('详情 req.params.id', req.params.id)
    appCrud.findById(App, req.params.id, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(ret))
    })
})

/**
 * 启用
 */
router.get('/app/enable.do/:id', function (req, res) {
    console.log('启用 req.params.id', req.params.id)
    const app = {
        _id: req.params.id,
        status: '1'
    }
    appCrud.updateById(App, app._id, app, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        res.end('ok')
    })
})

/**
 * 禁用
 */
router.get('/app/disable.do/:id', function (req, res) {
    console.log('禁用 req.params.id', req.params.id)
    const app = {
        _id: req.params.id,
        status: '0'
    }
    appCrud.updateById(App, app._id, app, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        res.end('ok')
    })
})

/***
 * 新增
 */
router.post('/app/add.do', function (req, res) {
    console.log('新增应用 req.url', req.url)
    const app = {
        _id: req.body._id,
        name: req.body.name,//名字
        type: req.body.type,//ios 安卓
        titledesc: req.body.titledesc,//简单描述
        order: req.body.order,//排序
        url: req.body.url,//地址
        status: req.body.status,//1：启用 0.禁用
        feature: req.body.feature
    }
    if (!app._id) {
        app._id = undefined
        appCrud.insert(App, app, (err, ret) => {
            res.end()
        })
    } else {
        appCrud.updateById(App, app._id, app, (err, ret) => {
            res.end()
        })
    }
})

router.mongoose = (mongoose) => {
    App = App(mongoose)
    return router
}


module.exports = router;
/**
 * 日志控制器
 */
const express = require('express')

const router = express.Router()
let LogSchema = require('../domain/Log')
const appCrud = require('../repository/AppCrud')

/**
 * 条件查询
 */
router.get('*/log/condition.do', function (req, res) {
    console.log('条件查询req.url req.query', req.url, req.query)
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const obj = {}
    if (req.query.title) {//title：模糊查询
        obj.title = { $regex: `.*${req.query.title}.*`, $options: 'i' }
    }
    if (req.query.type) {
        obj.type = req.query.type
    }
    appCrud.find({
        Model: LogSchema, criteria: obj, callback: (err, ret) => {
            const text = JSON.stringify({
                data: ret,
                pagingBean: {
                    allNum: ret.length
                }
            })
            res.end(Buffer.from(text))
        }, sort: { 'order': 1 }
    })
})

/**
 * 详情
 */
router.get('*/log/detail.do/:id', function (req, res) {
    console.log('详情 req.url', req.url)
    console.log('详情 req.params.id', req.params.id)
    appCrud.findById(LogSchema, req.params.id, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(ret))
    })
})

/***
 * 插入一条日志
 */
router.post('*/log/add.do', function (req, res) {
    console.log('插入日志 req.url', req.url)
    const log = {
        start_time: req.body.start_time,//开始时间
        end_time: req.body.end_time,//结束时间
        host: req.body.host,//主机地址
        path: req.body.path,//路径 
        type: req.body.type,//类型（教程，安卓，IOS）
        name: req.body.name,//名称（可以是教程名称，应用名称）
        desc: req.body.desc,//描述
        duration: req.body.duration,//执行时间ms
    }
    appCrud.insert(LogSchema, log, (err, ret) => {
        res.end()
    })

})

/***
 * 批量插入 //TODO
 */
router.post('*/log/add.do', function (req, res) {
    console.log('新增应用 req.url', req.url)
    const {
        length,
        data
    } = req.body;
})

router.mongoose = (mongoose) => {
    LogSchema = LogSchema(mongoose)
    return router
}


module.exports = router;
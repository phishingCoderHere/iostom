/**
 * 日志控制器
 */
const router = require('express').Router()
const crud = require('../repository/LogCrud')
const multer = require('multer')

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
/*
 * 重写时间的toJSON方法，因为在调用JSON.stringify的时候，时间转换就调用的toJSON，这样会导致少8个小时，所以重写它的toJSON方法
 */
Date.prototype.toJSON = function () {
    return this.format("yyyy-MM-dd hh:mm:ss"); // util.formatDate是自定义的个时间格式化函数
}


/**
 * 渲染日志
 */
router.get('*/log', function (req, res) {
    console.log('渲染日志 req.url', req.url)
    res.render('log/index.html')
})

/**
 * 条件查询
 */
router.get('*/log/condition.do', function (req, res) {
    console.log('条件查询req.url req.query', req.url, req.query)
    res.setHeader('Content-Type', 'loglication/json;charset=utf-8')
    const obj = {}
    if (req.query.start_time) {//title：模糊查询
        obj.start_time = { $regex: `.*${req.query.start_time}.*`, $options: 'i' }
    }
    crud.find({
        paging: {
            everySize: req.query.everySize,
            currPage: req.query.currPage
        },
        criteria: obj,
        callback: (err, ret, count) => {
            const text = JSON.stringify({
                data: ret,
                pagingBean: {
                    allNum: count
                }
            })
            res.end(text)
        },
        sort: { 'crt_time': -1 }
    })
})


/**
 * 详情
 */
router.get('*/log/detail.do/:id', function (req, res) {
    console.log('详情 url', req.url)
    crud.findById(req.params.id, (err, ret) => {
        res.setHeader('Content-Type', 'loglication/json')
        res.end(JSON.stringify(ret))
    })
})

/***
 * 新增
 */
router.post('*/log/add.do', function (req, res) {
    const data = req.body
    const doc = {
        start_time: data.start_time,//开始时间
        end_time: data.end_time,//结束时间
        host: data.host,//主机地址
        path: data.path,//路径 
        type: data.type,//类型（教程，安卓，IOS）
        name: data.name,//名称（可以是教程名称，应用名称）
        desc: data.desc,//描述
        duration: data.duration,//执行时间ms
        ip: req.ip,//IP地址
    }
    if (!doc._id) {
        doc._id = undefined
        crud.insert(doc, (err, ret) => {
            if (err) {
                res.end(JSON.stringify(err))
            }
            res.end(JSON.stringify(ret))
        })
    } else {
        crud.updateById(doc._id, doc, (err, ret) => {
            if (err) {
                res.end(JSON.stringify(err))
            }
            res.end(JSON.stringify(ret))
        })
    }
})

/***
 * 批量插入 //TODO
 */
router.post('*/log/muladd.do', function (req, res) {
})

module.exports = router;
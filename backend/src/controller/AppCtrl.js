/**
 * 应用列表控制器
 */
const router = require('express').Router()
const crud = require('../repository/AppCrud')
const multer = require('multer');

/**
 * 渲染应用试玩
 */
router.get('*/app', function (req, res) {
    console.log('渲染应用试玩 req.url', req.url)
    res.render('app/index.html')
})

/**
 * 条件查询
 */
router.get('*/app/condition.do', function (req, res) {
    console.log('条件查询req.url req.query', req.url, req.query)
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const obj = {}
    if (req.query.title) {//title：模糊查询
        obj.title = { $regex: `.*${req.query.title}.*`, $options: 'i' }
    }
    if (req.query.type) {
        obj.type = req.query.type
    }
    crud.find({
        criteria: obj,
        callback: (err, ret) => {
            const text = JSON.stringify({
                data: ret,
                pagingBean: {
                    allNum: ret.length
                }
            })
            res.end(text)
        },
        sort: { 'order': 1 }
    })
})

/**
 * 详情
 */
router.get('*/app/detail.do/:id', function (req, res) {
    console.log('详情 url', req.url)
    crud.findById(req.params.id, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(ret))
    })
})

/**
 * 启用
 */
router.get('*/app/enable.do/:id', function (req, res) {
    console.log('启用 id', req.params.id)
    const app = {
        _id: req.params.id,
        status: '1'
    }
    crud.updateById(app._id, app, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        res.end('ok')
    })
})

/**
* 禁用
*/
router.get('*/app/disable.do/:id', function (req, res) {
    console.log('禁用 id', req.params.id)
    const app = {
        _id: req.params.id,
        status: '0'
    }
    crud.updateById(app._id, app, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        res.end('ok')
    })
})

// /**
//  * 根据ID删除一条
//  */
// router.get('*/app/deleteOne.do/:id', function (req, res) {
//     console.log('根据ID删除一条 id:', req.params.id)
//     appDoc.deleteOneByCondition(App, { _id: req.params.id }, (result) => {
//         res.setHeader('Content-Type', 'application/json')
//         if (result.ok) {
//             const msg = `已删除${result.deletedCount}条`
//             console.log(msg);
//             res.end(msg)
//         } else {
//             console.error(JSON.stringify(result));
//             res.end(`error:${result.message}`)
//         }
//     })
// })

/***
 * 新增
 */
// router.post('*/app/add.do', multer({ dest: 'uploads/' }).single('appicon'), function (req, res) {
router.post('*/app/add.do', multer().none(), function (req, res) {
    const doc = {
        _id: req.body._id,
        name: req.body.name,//名字
        type: req.body.type,//ios 安卓
        titledesc: req.body.titledesc,//简单描述
        order: req.body.order,//排序
        url: req.body.url,//地址
        status: '1',//1：启用 0.禁用
        feature: req.body.feature,
        // imgurl: req.body.imgurl,//图片url
        imgdata: req.body.imgdata,//图片base64编码
        title: req.body.title,//标题
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

module.exports = router;
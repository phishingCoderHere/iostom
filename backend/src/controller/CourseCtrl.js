const express = require('express')
const router = express.Router()
const crud = require('../repository/CourseCrud')

/**
 * 渲染入门教程页
 */
router.get('*/course', function (req, res) {
    console.log('主页req.url', req.url)
    res.render('course/index.html')
})

router.get('*/course/condition.do', function (req, res) {
    console.log('条件查询req.url', req.url)
    console.log('条件查询req.query', req.query)
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const obj = {}
    if (req.query.title) {//title：模糊查询
        obj.title = { $regex: `.*${req.query.title}.*`, $options: 'i' }
    }
    if (req.query.local) {
        obj.local = req.query.local
    }
    crud.find(obj,
        (err, ret) => {
            res.json({
                data: ret,
                pagingBean: {
                    allNum: ret.length
                }
            })
        }
    )
})

router.get('*/course/detail.do/:id', function (req, res) {
    console.log('detail req.url', req.url)
    console.log('detail req.params.id', req.params.id)
    crud.findById(req.params.id, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        const content = JSON.parse(ret.content)
        if (typeof content === 'object') {//兼容旧内容
            //因为wangEditor存储时是存的修改记录的数组，所以每次取最新的
            ret.content = content[content.length - 1]
        }
        res.json(ret)
    })
})

router.get('*/course/enable.do/:id', function (req, res) {
    console.log('enable.do, req.params.id', req.params.id)
    const course = {
        _id: req.params.id,
        status: '1'
    }
    crud.updateById(course._id, course, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        res.json(ret)
    })
})
router.get('*/course/disable.do/:id', function (req, res) {
    console.log('disable.do, req.params.id', req.params.id)
    const course = {
        _id: req.params.id,
        status: '0'
    }
    crud.updateById(course._id, course, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        res.json(ret)
    })
})

router.post('*/course/add.do', function (req, res) {
    console.log('add req.url', req.url)
    const course = {
        _id: req.body._id,
        title: req.body.title,
        type: req.body.type,
        priority: req.body.priority,
        titledesc: req.body.titledesc,
        content: JSON.stringify(req.body.content),
        order: req.body.order,
        url: req.body.url,
        local: (typeof req.body.local === 'string') ? req.body.local : req.body.local.join(','),
        status: req.body.status
    }
    if (!course._id) {
        course._id = undefined
        crud.insert(course, (err, ret) => {
            res.end()
        })
    } else {
        crud.updateById(course._id, course, (err, ret) => {
            res.end()
        })
    }
})

module.exports = router;
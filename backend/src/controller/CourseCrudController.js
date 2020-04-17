const express = require('express')

const router = express.Router()
let Course = require('../domain/Course')
const courseCrud = require('../repository/CourseCrud')

router.get('/quickstart/condition.do', function (req, res) {
    console.log('条件查询req.url', req.url)
    console.log('条件查询req.query', req.query)
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const obj = {}
    if (req.query.title) {//title：模糊查询
        obj.title = { $regex: `.*${req.query.title}.*`, $options: 'i' }
    }
    courseCrud.find(Course, obj,
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

router.get('/quickstart/detail.do/:id', function (req, res) {
    console.log('detail req.url', req.url)
    console.log('detail req.params.id', req.params.id)
    courseCrud.findById(Course, req.params.id, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        const content = JSON.parse(ret.content)
        if (typeof content === 'object') {//兼容旧内容
            //因为wangEditor存储时是存的修改记录的数组，所以每次取最新的
            ret.content = content[content.length - 1]
        }
        res.end(JSON.stringify(ret))
    })
})

router.get('/quickstart/enable.do/:id', function (req, res) {
    console.log('enable.do, req.params.id', req.params.id)
    const course = {
        _id: req.params.id,
        status: '1'
    }
    courseCrud.updateById(Course, course._id, course, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        res.end('ok')
    })
})
router.get('/quickstart/disable.do/:id', function (req, res) {
    console.log('disable.do, req.params.id', req.params.id)
    const course = {
        _id: req.params.id,
        status: '0'
    }
    courseCrud.updateById(Course, course._id, course, (err, ret) => {
        res.setHeader('Content-Type', 'application/json')
        res.end('ok')
    })
})

router.post('/quickstart/add.do', function (req, res) {
    console.log('add req.url', req.url)
    // console.log('add req.body', req.body)
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
        courseCrud.insert(Course, course, (err, ret) => {
            res.end()
        })
    } else {
        courseCrud.updateById(Course, course._id, course, (err, ret) => {
            res.end()
        })
    }
})

router.mongoose = (mongoose) => {
    Course = Course(mongoose)
    return router
}


module.exports = router;
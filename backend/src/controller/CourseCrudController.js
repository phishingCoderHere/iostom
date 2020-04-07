const express = require('express')
const moment = require('moment')
const { v4 } = require('uuid')

const router = express.Router()
let Course = require('../domain/Course')
const courseCrud = require('../repository/CourseCrud')

const uuid = v4;

router.get('/quickstart/condition.do', function (req, res) {
    console.log('条件查询req.url', req.url)
    console.log('条件查询req.query', req.query)
    res.setHeader('Content-Type', 'application/json')
    const obj = {}
    if (req.query.title) {//title：模糊查询
        obj.title = { $regex: `.*${req.query.title}.*`, $options: 'i' }
    }
    courseCrud.find(Course, obj,
        (err, ret) => {
            if (err) {
                throw err;
            }
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
    const item = data.data.find(item => item.id == req.params.id)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(item))
})

router.post('/quickstart/add.do', function (req, res) {
    console.log('add req.url', req.url)
    console.log('add req.body', req.body)
    const course = {
        title: req.body.title,
        type: req.body.type,
        priority: req.body.priority,
        titledesc: req.body.titledesc,
        content: req.body.content,
        order: req.body.order,
        url: req.body.url,
        local: req.body.local.join(','),
        status: req.body.status
    }
    courseCrud.insert(Course, course, () => {
        res.end()
    })
})

router.mongoose = (mongoose) => {
    Course = Course(mongoose)
    return router
}


module.exports = router;
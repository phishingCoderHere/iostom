const express = require('express')
const moment = require('moment')
const { v4 } = require('uuid')

const router = express.Router()
const Course = require('../domain/Course')
const courseCrud = require('../repository/CourseCrud')

const uuid = v4();

router.get('/quickstart/condition.do', function (req, res) {
    console.log('条件查询req.url', req.url)
    console.log('条件查询req.params', req.params)
    res.setHeader('Content-Type', 'application/json')
    const param = req.params
    courseCrud.find(Course, { title: param.title },
        (err, ret) => {
            if (err) {
                throw err;
            }
            res.end(JSON.stringify(ret))
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
        ctime: moment(),
        utime: moment(),
        id: uuid(),
        titledesc: req.body.titledesc,
        content: req.body.content,
        order: req.body.order,
        url: req.body.url,
        local: req.body.local,
        status: req.body.status
    }
    courseCrud.insert(Course, course, () => {
        res.end()
    })
})

router.mongoose = (mongoose) => {
    course = Course(mongoose)
    return router
}


module.exports = router;
const express = require('express')
const router = express.Router()
const data = {
    data: [{
        title: '为什么阿森西奥下线',
        type: '1',
        prioriy: 0,
        ctime: new Date(),
        utime: new Date(),
        id: 1
    }, {
        title: '是地方是的地方北大法宝 ',
        type: '1',
        prioriy: 0,
        ctime: new Date(),
        utime: new Date(),
        id: 2
    }, {
        title: '合议庭很讨厌',
        type: '1',
        prioriy: 0,
        ctime: new Date(),
        utime: new Date(),
        id: 3
    }, {
        title: '同意合同合同',
        type: '1',
        prioriy: 0,
        ctime: new Date(),
        utime: new Date(),
        id: 4
    }],
    pagingBean: {
        allNum: 4
    }
}
router.get('/quickstart/condition.do', function (req, res) {
    console.log('条件查询req.url', req.url)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
})

router.get('/quickstart/detail.do/:id', function (req, res) {
    console.log('detail req.url', req.url)
    const item = data.data.find(item => item.id == req.params.id)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(item))
})

router.post('/quickstart/add.do', function (req, res) {
    console.log('add req.url', data.url)
    data.push({
        title: req.body.title,
        type: req.body.type,
        prioriy: req.body.prioriy,
        ctime: req.body.ctime,
        utime: req.body.utime,
        id: req.body.id
    })
})

module.exports = router;
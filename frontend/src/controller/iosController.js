const express = require('express')
const moment = require('moment')
const axios = require('axios')
const config = require('../config/Config')
const address = `${config.BACKEND_HOST}:${config.BACKEND_PORT}`
const router = express.Router()

const featureEnum = {
    '1': { title: '提现快', className: 'sign sign4 fs10' },
    '2': { title: '体验好', className: 'sign sign3 fs10' },
    '3': { title: '任务多', className: 'sign sign2 fs10' },
    '4': { title: '单价高', className: 'sign sign1 fs10' },
}

const getEnumNameByVal = (enum_, val) => {
    if (!enum_) {
        return val
    }
    return enum_[val]
}


router.get('/ios', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    axios.get(`${address}/app/condition.do?type=1`).then(({ data }) => {
        const arr = data.data
        for (i in arr) {
            arr[i].feature = getEnumNameByVal(featureEnum, arr[i].feature)
        }
        res.render('framework.html', {
            tmpl: './tmpls/iosapps.tmpl.html',
            data: {
                apps: arr
            }
        })
    }).catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router;
const express = require('express')
const moment = require('moment')
const httpUtils = require('../utils/httpUtils')
const router = express.Router()

const featureEnum = {
    '1': '提现快',
    '2': '体验好',
    '3': '任务多',
    '4': '单价高'
}

const getEnumNameByVal = (enum_, val) => {
    if (!enum_) {
        return val
    }
    return enum_[val]
}


router.get('/ios', function (req, res) {
    console.log("时间 " + moment().format('LLL') + " 路径 ", req.url);
    httpUtils.sendRequest('localhost', '/app/condition.do', 'GET', 8445, (data) => {
        // const aa = data.toJSON()
        // const b = data.toString('utf-8')
        const obj = JSON.parse(data);
        // const copy = JSON.parse(json, (key, value) => {
        //     return value && value.type === 'Buffer' ?
        //         Buffer.from(value.data) :
        //         value;
        // });
        // const a = data.toString('ascii')

        // let result = JSON.parse({}).data
        // for (i in result) {
        //     result[i].feature = getEnumNameByVal(featureEnum, result[i].feature)
        // }
        res.render('framework.html', {
            tmpl: './tmpls/iosapps.tmpl.html',
            data: {
                apps: obj.data
            }
        })
    })
})

module.exports = router;
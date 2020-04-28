const moment = require('moment')
const _ = require('lodash')
const Model = require('../model/Log')

const appName = '日志管理'

/**
 * 插入一条记录
 * @param {*} doc 
 * @param {*} callback 
 */
function insert(doc, callback) {
    const logModel = new Model({ ...doc, crt_time: moment() });
    logModel.save(function (err, product) {
        if (err) {
            return console.log(err);
        }
        callback(product)
    })
}


/**
 * 根据id查询一条
 * @param {*} Model
 * @param {*} criteria
 * @param {*} callback
 */
function findById(_id, callback) {
    Model.findById(_id, (err, ret) => {
        if (err) {
            return console.error(err)
        }
        callback(err, ret)
    })
}

/**
 * 条件查询一条
 * @param {*} Model
 * @param {*} criteria
 * @param {*} callback
 * @param {*} sort
 */
function find(args) {
    console.log(`${appName} 条件查询 时间`, new Date())
    const {
        criteria, callback, sort, paging
    } = args
    Model.count(criteria, function (err, count) {
        if (count > 0) {
            Model.find(criteria,
                null,
                {
                    skip: parseInt(paging.everySize * paging.currPage),
                    limit: parseInt(paging.everySize)
                },
                (err, ret) => {
                    if (err) {
                        console.error(err)
                    }
                    callback(err, ret, count)
                }).sort(sort)
        } else {
            callback(err, [], 0)
        }
    })

}

module.exports.insert = insert
module.exports.find = find
module.exports.findById = findById
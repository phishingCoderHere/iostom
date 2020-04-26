const moment = require('moment')
const _ = require('lodash')
const Model = require('../model/App')

const appName = '试玩应用'

/**
 * 根据id更新
 * @param {*} Model
 * @param {*} id
 * @param {*} entity
 * @param {*} callback
 */
function updateById(id, entity, callback) {
    entity = { ...entity, utime: moment() }
    Model.findByIdAndUpdate(id, entity, (err, ret) => {
        if (err) {
            return console.error(err)
        }
        callback(err, ret)
    })
}

/**
 * 插入一条记录
 * @param {*} doc 
 * @param {*} callback 
 */
function insert(doc, callback) {
    const appModel = new Model({ ...doc, ctime: moment(), utime: moment() });
    appModel.save(function (err, product) {
        if (err) {
            console.log(err);
            callback(err)
        }
        callback(product)
    })
}

/**
 * 条件查询一条
 * @param {*} Model
 * @param {*} criteria
 * @param {*} callback
 */
function findOne(Model, criteria, callback) {
    console.log(`${appName} 条件查询一条 时间`, new Date())
    Model.findOne(criteria, (err, ret) => {
        if (err) {
            console.error(err)
        }
        callback(err, ret)
    })
}

/**
 * 条件查询一条
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
        criteria, callback, sort
    } = args
    Model.find(criteria, (err, ret) => {
        if (err) {
            console.error(err)
        }
        callback(err, ret)
    }).sort(sort)
}

/**
 * 根据条件删除一条
 * @param {*} Model
 * @param {*} criteria
 * @param {*} callback
 */
function deleteOneByCondition(Model, condition, callback) {
    console.log(`功能:${appName}, 动作：deleteOneById, 时间:${new Date()}`)
    Model.deleteOne(condition).then((product) => {
        callback(product)
    }).catch((err) => {
        callback(err)
    })
}

module.exports.updateById = updateById
module.exports.insert = insert
module.exports.findOne = findOne
module.exports.find = find
module.exports.findById = findById
module.exports.deleteOneByCondition = deleteOneByCondition

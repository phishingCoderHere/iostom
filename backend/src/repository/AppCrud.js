const moment = require('moment')
const _ = require('lodash')
const appName = '试玩应用'

/**
 * 根据id更新
 * @param {*} Model
 * @param {*} id
 * @param {*} entity
 * @param {*} callback
 */
function updateById(Model, id, entity, callback) {
    console.log(`${appName} 根据id更新 时间`, new Date())
    const common = {
        utime: moment()
    }
    entity = _.merge(entity, common)
    Model.findByIdAndUpdate(id, entity, (err, ret) => {
        if (err) {
            console.error(err)
        }
        callback(err, ret)
    })
}

/**
 * 插入一条记录
 * @param {*} Model
 * @param {*} row
 * @param {*} callback
 */
function insert(Model, row, callback) {
    console.log(`${appName} 插入一条记录 时间`, new Date())
    const common = {
        ctime: moment(),
        utime: moment()
    }
    row = _.merge(row, common)
    new Model(row).save().then(() => callback())
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
function findById(Model, _id, callback) {
    console.log(`${appName} 条件查询一条 时间`, new Date())
    Model.findById(_id, (err, ret) => {
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
 * @param {*} sort
 */
function find(args) {
    const {
        Model, criteria, callback, sort
    } = args
    console.log(`${appName} 条件查询一条 时间`, new Date())
    Model.find(criteria, (err, ret) => {
        if (err) {
            console.error(err)
        }
        callback(err, ret)
    }).sort(sort)
}

/**
 * 删除
 * @param {*} Model
 * @param {*} criteria
 * @param {*} callback
 */
function removeById(Model, id, callback) {
    console.log(`${appName}删除 时间`, new Date())
    findOne(Model, {
        _id: id
    }, (err, ret) => {
        if (err) {
            console.error(err)
        }
        ret.remove().then((product) => {
            callback(product)
        }).catch((err) => {
            assert.ok(err)
        })
    })
}

module.exports.updateById = updateById
module.exports.insert = insert
module.exports.findOne = findOne
module.exports.find = find
module.exports.findById = findById
module.exports.removeById = removeById

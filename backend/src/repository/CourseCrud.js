const moment = require('moment')
const _ = require('lodash')
const Model = require('../model/Course')

const appName = '教程管理'

/**
 * 根据id更新
 * @param {*} id 
 * @param {*} entity 
 * @param {*} callback 
 */
function updateById(id, entity, callback) {
    console.log('updateById 时间', new Date())
    entity = { ...entity, utime: moment() }
    Model.findByIdAndUpdate(id, entity, (err, ret) => {
        if (err) {
            console.error(err);
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
function insert(row, callback) {
    console.log('insert 时间', new Date())
    row = {
        ...row, ctime: moment(), utime: moment()
    }
    const course = new Model(row)
    course.save().then((err, ret) => callback(err, ret));
}

/**
 * 条件查询一条
 * @param {*} Model 
 * @param {*} criteria 
 * @param {*} callback 
 */
function findOne(criteria, callback) {
    console.log('findOne 时间', new Date())
    Model.findOne(criteria, (err, ret) => {
        if (err) {
            return console.error(err);
        }
        callback(err, ret)
    })
}

/**
 * 条件查询一条
 * @param {*} criteria 
 * @param {*} callback 
 */
function findById(_id, callback) {
    console.log('findById 时间', new Date())
    Model.findById(_id, (err, ret) => {
        if (err) {
            console.error(err);
        }
        callback(err, ret)
    })
}

/**
 * 条件查询一条
 * @param {*} criteria 
 * @param {*} callback 
 */
function find(criteria, callback) {
    console.log('find 时间', new Date())
    Model.find(criteria, (err, ret) => {
        if (err) {
            console.error(err);
        }
        callback(err, ret)
    })
}

/**
 * 根据条件删除一条
 * @param {*} Model
 * @param {*} criteria
 * @param {*} callback
 */
function deleteOneByCondition(condition, callback) {
    console.log(`功能:${appName}, 动作：deleteOneById, 时间:${new Date()}`)
    Model.deleteOne(condition).then((product) => {
        callback(product)
    }).catch((err) => {
        callback(err)
    })
}

module.exports.updateById = updateById;
module.exports.insert = insert;
module.exports.findOne = findOne;
module.exports.find = find;
module.exports.deleteOneByCondition = deleteOneByCondition;
module.exports.findById = findById;
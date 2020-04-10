const moment = require('moment')
const _ = require('lodash')
const { v4 } = require('uuid')

const uuid = v4
/**
 * 根据id更新
 * @param {*} Model 
 * @param {*} id 
 * @param {*} entity 
 * @param {*} callback 
 */
function updateById(Model, id, entity, callback) {
    const common = {
        utime: moment(),
    }
    entity = _.merge(entity, common)
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
function insert(Model, row, callback) {
    const common = {
        ctime: moment(),
        utime: moment(),
    }
    row = _.merge(row, common)
    new Model(row).save().then(() => callback());
}

/**
 * 条件查询一条
 * @param {*} Model 
 * @param {*} criteria 
 * @param {*} callback 
 */
function findOne(Model, criteria, callback) {
    Model.findOne(criteria, (err, ret) => {
        if (err) {
            console.error(err);
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
    Model.findById(_id, (err, ret) => {
        if (err) {
            console.error(err);
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
function find(Model, criteria, callback) {
    Model.find(criteria, (err, ret) => {
        if (err) {
            console.error(err);
        }
        callback(err, ret)
    })
}

/**
 * 删除
 * @param {*} Model
 * @param {*} criteria 
 * @param {*} callback 
 */
function removeById(Model, id, callback) {
    findOne(Model, { _id: id }, (err, ret) => {
        if (err) {
            console.error(err);
        }
        ret.remove().then((product) => {
            callback(product)
        }).catch(function (err) {
            assert.ok(err)
        })
    })

}

module.exports.updateById = updateById;
module.exports.insert = insert;
module.exports.findOne = findOne;
module.exports.find = find;
module.exports.removeById = removeById;
module.exports.findById = findById;
const moment = require('moment')
/**
 * 根据id更新
 * @param {*} Model 
 * @param {*} id 
 * @param {*} entity 
 * @param {*} callback 
 */
function updateById(Model, id, entity, callback) {
    if (req.session.user) {
        const key = req.session.user._id
        entity.modifyDate = moment.now()
        entity.modifyUser = key
    }
    Model.findByIdAndUpdate(id, entity, (err, ret) => {
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
    if (req.session.user) {
        const key = req.session.user._id
        row.createDate = moment.now()
        row.modifyDate = moment.now()
        row.createUser = key
        row.modifyUser = key
    }
    const entity = new Model(row);
    entity.save().then(() => callback());
}

/**
 * 条件查询一条
 * @param {*} Model 
 * @param {*} criteria 
 * @param {*} callback 
 */
function findOne(Model, criteria, callback) {
    Model.findOne(criteria, (err, ret) => {
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
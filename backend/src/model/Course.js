/**
 * 教程
 */
const mongoose = require('../repository/MongooseFactory')
module.exports = mongoose.model
    ('Course',
        {
            id: String,
            ctime: Date,
            utime: Date,
            title: String,
            type: String,
            priority: Number,
            titledesc: String,
            content: String,
            order: Number,
            url: String,
            local: String,
            status: String,
        }
    );

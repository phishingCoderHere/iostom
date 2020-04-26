var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iostom', { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection
db.once('open', () => {
    console.log('mongoDB已连接');
})
db.on('error', console.error.bind(console, '错误'))
module.exports = mongoose;
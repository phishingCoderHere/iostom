const express = require('express')
const path = require('path')
const CourseCrudCtrl = require('./controller/CourseCrudCtrl')
const AppCrudCtrl = require('./controller/AppCrudCtrl')
const IndexCtrl = require('./controller/IndexCtrl')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var opn = require('opn');

const app = express()
const port = 8445

/**     mongoDB         */
mongoose.connect('mongodb://localhost:27017/iostom', { useNewUrlParser: true });
const db = mongoose.connection
db.once('open', () => {
    console.log('mongoDB已连接');
})
db.on('error', console.error.bind(console, '连接出错'));


/**     express     */
console.log(' dirname: ' + __dirname + ', 端口：' + port);
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ limit: 1048576, extended: false }))
app.set('views', path.join(__dirname, '/pages'))
app.use(CourseCrudCtrl)
app.use(AppCrudCtrl)
app.use(IndexCtrl)
/**资源文件 */
app.use('*/resources', express.static(path.join(__dirname, '/resources/')))
/* 声明控制器 */
app.use(CourseCrudCtrl.mongoose(mongoose))
app.use(AppCrudCtrl.mongoose(mongoose))
app.listen(port, () => {
    console.log(`后端已运行在端口号 ${port} 上....`);
    // opn(`http://localhost:${port}/server/index`);
})


const express = require('express')
const path = require('path')
const courseCrudController = require('./controller/CourseCrudController')
const AppCrudCtrl = require('./controller/AppCrudCtrl')
const IndexCtrl = require('./controller/IndexCtrl')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var opn = require('opn');

const app = express()

app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ limit: 1048576, extended: false }))
app.set('views', path.join(__dirname, '/pages'))

app.use(courseCrudController)
app.use(AppCrudCtrl)
app.use(IndexCtrl)

/**资源文件 */
app.use('*/resources', express.static(path.join(__dirname, '/resources/')))

mongoose.connect('mongodb://localhost:27017/iostom', { useNewUrlParser: true });
/* 声明控制器 */
app.use(courseCrudController.mongoose(mongoose))
app.use(AppCrudCtrl.mongoose(mongoose))

const port = 8445
console.log(' dirname: ' + __dirname + ', 端口：' + port);
app.listen(port, () => {
    console.log(`后端已运行在端口号 ${port} 上....`);
    opn(`http://localhost:${port}/server/index`);
})


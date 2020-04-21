const express = require('express')
const path = require('path')
const iosController = require('./controller/iosController')
const mpageController = require('./controller/mpageController')
const androidCtrl = require('./controller/androidCtrl')
const bodyParser = require('body-parser')

/* express */
const port = 8444
const app = express()
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, '/pages'))

/* 声明控制器 */
app.use(iosController)
app.use(mpageController)
app.use(androidCtrl)

/**资源文件 */
app.use('/pages', express.static(path.join(__dirname, '/pages')))
app.use('/resources', express.static(path.join(__dirname, '/resources')))

app.listen(port, () => {
    console.log(`前端已运行在端口号 ${port} 上....`);
})
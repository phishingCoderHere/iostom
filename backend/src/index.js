const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

/**声明控制器 */
const appCtrl = require('./controller/AppCtrl')

const port = 8445

const app = express()
var opn = require('opn');

/**     express     */
console.log('__dirname: ' + __dirname + ', 端口：' + port);
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ limit: 1048576, extended: false }))
app.set('views', path.join(__dirname, '/pages'))
app.use(appCtrl)

/**资源文件 */
app.use('*/resources', express.static(path.join(__dirname, '/resources/')))
// app.use(CourseCrudCtrl.mongoose(mongoose))
// app.use(AppCrudCtrl.mongoose(mongoose))
app.listen(port, () => {
    console.log(`后端已运行在端口号 ${port} 上....`);
    // opn(`http://localhost:${port}/server/index`);
})


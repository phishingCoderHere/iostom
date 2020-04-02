const express = require('express')
const path = require('path')
const QuickStartPageController = require('./controller/QuickStartPageController')
const QuickStartCrudController = require('./controller/QuickStartCrudController')
const bodyParser = require('body-parser')
var opn = require('opn');

const port = 8445

console.log(' dirname: ' + __dirname + ', 端口：' + port);

const app = express()

app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, '/pages'))

/* 声明控制器 */
app.use(QuickStartPageController)
app.use(QuickStartCrudController)

/**资源文件 */
app.use('/resources', express.static(path.join(__dirname, '/resources/')))

app.listen(port, () => {
    console.log(`backend server running on port ${port}....`);
    // opens the url in the default browser 
    opn(`http://localhost:${port}`);
})


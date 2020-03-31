const express = require('express')
const path = require('path')
// const mainPage = require('./controller/mpageController')
const iosController = require('./controller/iosController')
const mpageController = require('./controller/mpageController')
const bodyParser = require('body-parser')

const port = 8444

const app = express()

app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, '/pages'))

/* 声明控制器 */
// app.use(mainPage)
app.use(iosController)
app.use(mpageController)

/**资源文件 */
app.use('/pages', express.static(path.join(__dirname, '/pages')))
app.use('/resources', express.static(path.join(__dirname, '/resources')))
// app.use('/images', express.static(path.join(__dirname, '/', 'pages/login/images')))
// app.use('/public', express.static(path.join(__dirname, '/', 'pages/login/public')))
// app.use('/resources', express.static(path.join(__dirname, '/', 'pages/login/resources')))
// app.use('/', express.static(path.join(__dirname, '/', 'pages/login/resources')))
// app.set('views', path.join(__dirname, '/', 'pages'))

app.listen(port, () => {
    console.log(`server running on port ${port}....`);
})

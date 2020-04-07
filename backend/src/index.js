const express = require('express')
const path = require('path')
const courseCrudController = require('./controller/CourseCrudController')
const CoursePageController = require('./controller/CoursePageController')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var opn = require('opn');

const port = 8445

console.log(' dirname: ' + __dirname + ', 端口：' + port);

const app = express()

mongoose.connect('mongodb://localhost:27017/iostom', { useNewUrlParser: true });
/* 声明控制器 */
app.use(courseCrudController.mongoose(mongoose))

app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, '/pages'))

/* 声明控制器 */
app.use(courseCrudController)
app.use(CoursePageController)

/**资源文件 */
app.use('/resources', express.static(path.join(__dirname, '/resources/')))

app.listen(port, () => {
    console.log(`backend server running on port ${port}....`);
    // opens the url in the default browser 
    opn(`http://localhost:${port}`);
})


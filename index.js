const express = require('express')
// const session = require('express-session')
const path = require('path')

// console.log(__dirname);

const app = express()

app.engine('html', require('express-art-template'))
// app.use(session({
//     secret: 'gth good',
//     resave: false,
//     saveUninitialized: true
// }))
// app.use('/fonts', express.static(path.join(__dirname, '/', 'pages/login/fonts')))
// app.use('/images', express.static(path.join(__dirname, '/', 'pages/login/images')))
// app.use('/public', express.static(path.join(__dirname, '/', 'pages/login/public')))
// app.use('/resources', express.static(path.join(__dirname, '/', 'pages/login/resources')))
app.use('/', express.static(path.join(__dirname, '/', '/pages/')))
app.set('views', path.join(__dirname, '/', 'pages'))

app.listen(8080, () => {
    console.log('server running on port 8080....');
})

app.get('/', function (req, res) {
    res.render('index.html')
})
// app.get('/login', function (req, res) {
//     res.render('login/login.html')
// })
// app.get('/sign', function (req, res) {
//     res.render('sign/sign.html')
// })
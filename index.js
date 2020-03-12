const express = require('express')
const path = require('path')

const app = express()

app.engine('html', require('express-art-template'))
app.use('/', express.static(path.join(__dirname, '/', '/pages/')))
app.set('views', path.join(__dirname, '/', 'pages'))

app.listen(8080, () => {
    console.log('server running on port 8080....');
})

app.get('/', function (req, res) {
    res.render('index.html')
})

app.get('/ios', function (req, res) {
    res.render('index.html')
})
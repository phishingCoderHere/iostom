// const express = require('express')
// const fs = require('fs')
const index = require('./pages/index.art')
// template.defaults.extname = '.html'
// const app = express()

// app.engine('html', require('express-art-template'))
// app.use('/', express.static(path.join(__dirname, '/', '/pages/')))
// app.set('views', path.join(__dirname, '/', 'pages'))

// app.listen(8080, () => {
//     console.log('server running on port 8080....');
// })

// app.get('/', function (req, res) {
//     res.render('index.html')
// })

// app.get('/ios', function (req, res) {
//     res.render('index.html')
// })
// template.defaults.extname = '.html'
function component() {
    var element = document.createElement('div');
    element.className = 'root'
    element.innerHTML = index({})
    return element;
}
document.body.appendChild(component());



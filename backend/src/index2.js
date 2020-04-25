
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoosedemo');
const db = mongoose.connection
db.once('open', () => {
    console.log('mongoDB已连接');
})
db.on('error', console.error.bind(console, '错误'))

const KittenSchema = mongoose.Schema({
    name: String
})
KittenSchema.methods.speak = function () {
    console.log(this.name, '喵~');
}
const Kitten = mongoose.model('Kitten', KittenSchema)


// let xiaomiao = new Kitten({ name: 'damiao' })
// xiaomiao.save(function (err, maomi) {
//     if (err) {
//         return console.log(err);
//     }
//     maomi.speak();
// })

Kitten.find(null, (err, data) => {
    console.log(data);

})

// xiaomiao.speak()
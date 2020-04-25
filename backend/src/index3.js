var a = {
    b: function () {
        // var that = this
        var func = function () {
            // console.log(that);
            console.log(this.c);
        }
        func()
        // func.bind(this)()
    },
    c: 'Hello'
}
a.b()
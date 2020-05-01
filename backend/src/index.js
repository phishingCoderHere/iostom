const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

/**声明控制器 */
const appCtrl = require("./controller/AppCtrl");
const logCtrl = require("./controller/LogCtrl");
const courseCtrl = require("./controller/CourseCtrl");
const indexCtrl = require("./controller/IndexCtrl");
const loginCtrl = require("./controller/LoginCtrl");

const port = 8445;

const app = express();
// var opn = require('opn');

/**     express     */
console.log("__dirname: " + __dirname + ", 端口：" + port);
app.engine("html", require("express-art-template"));
app.use(bodyParser.urlencoded({ limit: 1048576, extended: false }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "/pages"));
app.use(
  session({
    secret: "gth good",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(appCtrl);
app.use(logCtrl);
app.use(courseCtrl);
app.use(indexCtrl);
app.use(loginCtrl);

/**资源文件 */
app.use("*/resources", express.static(path.join(__dirname, "/resources/")));
app.use("*/plugins", express.static(path.join(__dirname, "../../plugins/")));
app.use("*/dist", express.static(path.join(__dirname, "../../dist/")));
app.listen(port, () => {
  console.log(`后端已运行在端口号 ${port} 上....`);
  // opn(`http://localhost:${port}/server/index`);
});

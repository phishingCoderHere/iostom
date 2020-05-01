const express = require("express");
const multer = require("multer");
const router = express.Router();

const PWD = "Guo1995..";

router.get("/login", (req, res) => {
  console.log("登录页 url:", req.url);
  res.render("login.html");
});
router.post("/login.do", multer().none(), (req, resp) => {
  if (req.body.username === "admin" && req.body.password === PWD) {
    req.session.isLogin = true;
    if (req.body.rememberMe) {
      resp.setHeader("set-cookie", req.body.password);
    }
    resp.redirect("/index");
  } else {
    resp.json({ message: "密码不正确" });
  }
});
module.exports = router;

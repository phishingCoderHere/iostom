/**
 * 日志
 */
const mongoose = require("../repository/MongooseFactory");

module.exports = mongoose.model("Log", {
  crt_time: Date, //创建时间
  start_time: Date, //开始时间
  end_time: Date, //结束时间
  host: String, //url
  path: String, //路径
  type: String, //类型（教程，安卓，IOS）
  name: String, //名称（可以是教程名称，应用名称）
  desc: String, //描述
  duration: Number, //执行时间ms
  ip: String, //IP地址
});

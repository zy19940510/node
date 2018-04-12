var express = require("express");
var fs = require("fs");
var app = express();
var mongoose = require("mongoose");

var getnews = require("./controllers/getnews");

mongoose.connect("mongodb://localhost/amazon");
const database = mongoose.connection;
database.once('error', function(error) {
  console.log('数据库连接失败');
  return
});
database.once('open', function(error) {
  console.log('数据库连接成功');
});
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get("/news", getnews.checkoutNews);



app.listen(3002);

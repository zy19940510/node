var News = require("../models/News");
var url = require("url");

exports.checkoutNews = function(req, res) {
  // GET请求
  var page = url.parse(req.url, true).query.page || 1;
  var date = url.parse(req.url, true).query.date || '';
  var pagesize = url.parse(req.url, true).query.pagesize - 0 || 10;
  var sortby = url.parse(req.url, true).query.sortby || "date";
  var sortDirec = url.parse(req.url, true).query.sortDirec || 1;
  // 最终要在数据中查找的条件
  var searchJSON = {}
  //这个查找条件存在了，我们就加上这个条件。
  if (date) {
    searchJSON['date'] = date;
  }
  News.count(searchJSON, function(err, amount) {
    News.find(searchJSON).sort({[sortby]: sortDirec}).skip((page - 1) * pagesize).limit(pagesize).lean().exec((err, results) => {
      res.json({"amount": amount, "results": results});
    });
  });
};

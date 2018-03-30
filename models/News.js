var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	"date" : String ,		//日期
	"url" : String ,	//链接
	"title" : String  //内容
});

module.exports = mongoose.model("News" , schema);

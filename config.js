var fs = require("fs");
var globalConfig = {};
var conf = fs.readFileSync("./server.conf");
var configArr = conf.toString().split("\r\n");

for (var i = 0; i < configArr.length; i ++) {
    globalConfig[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim();
}
// console.log(globalConfig); //{ port: '12306', web_path: 'web' }
module.exports = globalConfig;
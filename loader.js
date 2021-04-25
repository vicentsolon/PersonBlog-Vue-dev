var fs = require("fs");
var globalConfig = require("./config.js");
var controllerSet = [];
var pathMap = new Map();
var files = fs.readdirSync(globalConfig["web_path"]);  // 读取文件目录

for (var i = 0; i < files.length; i ++) {
    var temp = require("./" + globalConfig["web_path"] + "/" + files[i]); // 获取web文件路径中所有文件的方法
    if (temp.path) {
        for (var [key, value] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value);
            } else {
                throw new Error("url path异常,url:" + key);
            }
        }
        controllerSet.push(temp);
    }
}
// console.log(pathMap); // Map(1) { '/editEveryDay' => [Function: editEveryDay] }
module.exports = pathMap;
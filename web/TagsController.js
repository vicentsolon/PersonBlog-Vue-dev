var tagsDao = require("../dao/TagsDao");
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();

function queryBlogIdByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queryBlogIdByTag(params.tag, parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (var i = 0; i < result.length; i ++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/g, ""); // 过滤图片
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, ""); // 过滤标签，存在缺陷
            result[i].content = result[i].content.substring(0, 300);  // 约束文本长度
        };
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryBlogIdByTag", queryBlogIdByTag);

function queryAllTags(request, response) {
    tagsDao.queryAllTags(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryAllTags", queryAllTags);

function queryTagBlogCount(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queryTagBlogCount(params.tag, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryTagBlogCount", queryTagBlogCount);

module.exports.path = path;
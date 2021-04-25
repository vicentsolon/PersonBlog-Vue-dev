var sitemapDao = require("../dao/SiteMapDao");
var respUtil = require("../util/RespUtil");

var path = new Map();

function queryAllBlog(request, response) {
    sitemapDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    })
}

path.set("/queryAllBlog", queryAllBlog);

module.exports.path = path;
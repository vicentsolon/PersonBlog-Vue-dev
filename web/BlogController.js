var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();

function querySearchBlogCount(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.querySearchBlogCount(params.text, function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/querySearchBlogCount", querySearchBlogCount);

function queryBlogBytext(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogBytext(params.text, parseInt(params.page), parseInt(params.pageSize), function(result) {
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

path.set("/queryBlogBytext", queryBlogBytext);

function queryHotBlog(request, response) {
    blogDao.queryHotBlog(function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryHotBlog", queryHotBlog);

function queryBlogById(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
        blogDao.addViews(parseInt(params.bid), function (result) {});
    })
}

path.set("/queryBlogById", queryBlogById);

function queryBlogCount(request, response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryBlogCount", queryBlogCount);

function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
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

path.set("/queryBlogByPage", queryBlogByPage);

function editBlog(request, response) {
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g, "").replace(/，/g, ",");
    request.on("data", function (data) {
        blogDao.insertBlog(params.title, data.toString(), 1, tags, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
            var blogId = result.insertId; //获取文章id
            var tagList = tags.split(",");
            for (var i = 0; i < tagList.length; i ++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        });
    });
}

path.set("/editBlog", editBlog);

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function(rusult) {});
        }
    });
}

function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId);
    });
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        // 后续
    });
}

module.exports.path = path;
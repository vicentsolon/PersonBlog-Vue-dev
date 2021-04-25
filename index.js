var express = require("express");
var globalConfig = require("./config.js");
var loader = require("./loader");
var app = new express();

app.use(express.static("./page/")); // 默认使用路径下的index.html

app.post("/editEveryDay", loader.get("/editEveryDay")); //设置接口
app.get("/queryEveryDay", loader.get("/queryEveryDay"));

app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));
app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogById", loader.get("/queryBlogById"));

app.get("/addComment", loader.get("/addComment"));
app.get("/queryRandomCode", loader.get("/queryRandomCode"));
app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"));

app.get("/queryAllBlog", loader.get("/queryAllBlog"));
app.get("/queryAllTags", loader.get("/queryAllTags"));
app.get("/queryHotBlog", loader.get("/queryHotBlog"));

app.get("/queryHotComments", loader.get("/queryHotComments"));
app.get("/queryBlogIdByTag", loader.get("/queryBlogIdByTag"));
app.get("/queryTagBlogCount", loader.get("/queryTagBlogCount"));

app.get("/queryBlogBytext", loader.get("/queryBlogBytext"));
app.get("/querySearchBlogCount", loader.get("/querySearchBlogCount"));

app.listen(globalConfig.port, function() {
    console.log("服务器已启动！")
});
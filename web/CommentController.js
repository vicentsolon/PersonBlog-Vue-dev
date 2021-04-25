var commentDao = require("../dao/CommentDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var captcha = require("svg-captcha");
var email = require("emailjs");

var path = new Map();

function queryHotComments(request, response) {
    commentDao.queryHotComments(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    });
}

path.set("/queryHotComments", queryHotComments);

function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    if (parseInt(params.parent) > 0) {
        // 发邮件提示 
        // npm install emailjs --save
        var commentStr = params.userName + ":回复@" + params.parentName + ": 发表于 "  + timeUtil.getNow() + ": " + params.content;
        var client = new email.SMTPClient({
            user: "603413691@qq.com",
            password: "dqeqwtijdvbubdab",
            host: "smtp.qq.com",
            ssl: true
        });
        client.send({
            text: commentStr,  // 邮件内容
            from: "603413691@qq.com", // 谁发送
            to: params.replyEmail, // 谁接收
            subject: "评论回复" // 邮件主题
        }, function (err, message) {
            console.log(err || message);
        });
    };
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.content, params.email, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
        
    });
}

path.set("/addComment", addComment);

function queryRandomCode(request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功", img));
    response.end();
}

path.set("/queryRandomCode", queryRandomCode);

function queryCommentsByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}

path.set("/queryCommentsByBlogId", queryCommentsByBlogId);


module.exports.path = path;
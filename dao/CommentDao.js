var dbutil = require("./DBUtil");

function insertComment(blodId, parent, parentName, userName, comments, email, ctime, utime, success) {
    // 插入数据库
    var insertSql = "insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`, `comments`,`email`, `ctime`,`utime`) value(?, ?, ?, ?, ?, ?, ?, ?);";
    var params = [blodId, parent, parentName, userName, comments, email, ctime, utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryCommentsByBlogId(blodId, success) {
    // 查询数据库
    var querySql = "select * from comments where blog_id = ?;";
    var params = [blodId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryHotComments(success) {
    // 插入数据库
    var querySql = "select * from comments order by id desc limit 5";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryHotComments = queryHotComments;
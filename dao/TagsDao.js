var dbutil = require("./DBUtil");

function insertTag(tag, ctime, utime, success) {
    // 将tag插入数据库
    var insertSql = "insert into tags (`tag`, `ctime`, `utime`) value(?, ?, ?);";
    var params = [tag, ctime, utime];
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

function queryTag(tag, success) {
    var querySql = "select * from tags where tag = ?;";
    var params = [tag];
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

function queryAllTags(success) {
    var querySql = "select id, tag from tags;";
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

function queryBlogIdByTag(tag, page, pageSize, success) {
    var querySql = "select * from blog where tags like '%" + tag + "%' order by id desc limit ?,?;";
    var params = [page * pageSize, pageSize];
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

function queryTagBlogCount(tag, success) {
    // 查询数据库
    var querySql = "select count(1) as count from blog where tags like '%" + tag + "%';";
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
    connection.end()
}


module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTags = queryAllTags;
module.exports.queryBlogIdByTag = queryBlogIdByTag;
module.exports.queryTagBlogCount = queryTagBlogCount;
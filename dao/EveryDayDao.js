var dbutil = require("./DBUtil");

function insertEveryDay(content, ctime, success) {
    // 将每日一句插入数据库
    var insertSql = "insert into every_day (`content`, `ctime`) value(?, ?);";
    var params = [content, ctime];
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

function queryEveryDay(success) {
    // 查询数据库
    var querySql = "select * from every_day order by id desc limit 1;";
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

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;
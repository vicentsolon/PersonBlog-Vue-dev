var dbutil = require("./DBUtil");

function queryAllBlog(success) {
    // 查询数据库
    var querySql = "select id, title from blog order by id desc;";
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

module.exports.queryAllBlog = queryAllBlog;

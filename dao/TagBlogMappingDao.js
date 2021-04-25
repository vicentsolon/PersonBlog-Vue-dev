var dbutil = require("./DBUtil");

function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    // 将tagId blogId 映射关系插入数据库
    var insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) value(?, ?, ?, ?);";
    var params = [tagId, blogId, ctime, utime];
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

module.exports.insertTagBlogMapping = insertTagBlogMapping;
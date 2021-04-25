var dbutil = require("./DBUtil");

function insertBlog(title, content, views, tags, ctime, utime, success) {
    // 将blog插入数据库
    var insertSql = "insert into blog (`title`,`content`,`views`,`tags`, `ctime`,`utime`) value(?, ?, ?, ?, ?, ?);";
    var params = [title, content, views, tags, ctime, utime];
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

function queryBlogByPage(page, pageSize, success) {
    // 查询数据库
    var querySql = "select * from blog order by id desc limit ?, ?;";
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
    connection.end()
}

function queryBlogCount(success) {
    // 查询数据库
    var querySql = "select count(1) as count from blog;";
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

function queryBlogById(id, success) {
    // 查询数据库
    var querySql = "select * from blog where id = ?;";
    var params = [id];
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

function addViews(id, success) {
    // 更新数据库
    var querySql = "update blog set views = views + 1 where id = ?;";
    var params = [id];
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

function queryHotBlog(success) {
    // 更新数据库
    var querySql = "select id, title from blog order by views desc limit 5";
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

function queryBlogBytext(text, page, pageSize, success) {
    // 模糊查询数据库
    var querySql = "select * from blog where concat(ifnull(title,''),ifnull(content,''),ifnull(tags,'')) like '%" + text + "%' order by id desc limit ?,?;";
    var params = [page*pageSize, pageSize];
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

function querySearchBlogCount(text, success) {
    // 查询数据库
    var querySql = "select count(1) as count from blog where concat(ifnull(title,''),ifnull(content,''),ifnull(tags,''))  like '%" + text + "%';";
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

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
module.exports.queryBlogBytext = queryBlogBytext;
module.exports.querySearchBlogCount = querySearchBlogCount;
function getNow() {
    var dt = new Date();
    var localTime = dt.toLocaleString("chinese", { hour12:false }).replace(/\//g, "-");
    return localTime;  // 返回时间
}

module.exports.getNow = getNow;
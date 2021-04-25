function writeResult(status, msg, data) {
    return JSON.stringify({status: status, msg: msg, data: data}); // json字符串
}

module.exports.writeResult = writeResult;
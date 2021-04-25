var email = require("emailjs");
var client = new email.SMTPClient({
    user: "603413691@qq.com",
    password: "dqeqwtijdvbubdab",
    host: "smtp.qq.com",
    ssl: true
});

module.exports.client = client;
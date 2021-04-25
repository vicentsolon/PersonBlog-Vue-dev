var blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        tags: "",
        content: "",
        ctime: "",
        views: ""
    },
    computed: {

    },
    created: function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
        if (searchUrlParams == "") {
            return;
        }
        var bid = -1;
        for (var i = 0; i < searchUrlParams.length; i ++) {
            if (searchUrlParams.split("=")[0] == "bid") {
                try{
                    bid = parseInt(searchUrlParams.split("=")[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(function (resp) {
            var result = resp.data.data[0];
            blogDetail.title = result.title;
            blogDetail.tags = result.tags;
            blogDetail.content = result.content;
            blogDetail.ctime = result.ctime;
            blogDetail.views = result.views;
        }).catch(function (resp) {
            console.log("请求失败");
        });
    }
});

var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {
        replyCancel: function () {
            return function () {
                document.getElementById("comment_reply").value = -1;
                document.getElementById("comment_reply_name").value = 0;
                document.getElementById("comment_reply_email").value = 0;
                document.getElementById("comment_reply_cancel").style.display = "none";
            }
        },
        changeCode: function () {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (resp) {
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text.toLowerCase();
                });
            }
        },
        sendComment: function () {
            return function () {
                var code = document.getElementById("comment_code").value;
                if (code.toLowerCase() != sendComment.rightCode) {
                    alert("验证码有误");
                    sendComment.changeCode();
                    return;
                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
                if (searchUrlParams == "") {
                    return;
                }
                var bid = -1;
                for (var i = 0; i < searchUrlParams.length; i ++) {
                    if (searchUrlParams.split("=")[0] == "bid") {
                        try{
                            bid = parseInt(searchUrlParams.split("=")[1]);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var replyEmail = document.getElementById("comment_reply_email").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;

                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName + "&replyEmail=" + replyEmail
                }).then(function (resp) {
                    alert(resp.data.msg);
                    // sendComment.changeCode();
                    // location.href = "/blog_detail.html?bid=" + bid;
                    location.reload();
                }).catch(function (resp) {
                    console.log("请求失败");
                });
            }
        }
    },
    created: function () {
        this.changeCode();
    }
});

var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: [
            {id: "1", user_name: "时序", ctime: "123432", comments: "喜欢就坚持吧", options: ""}
        ]
    },
    computed: {
        reply: function () {
            return function (commentId, userName, replyEmail) {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                document.getElementById("comment_reply_email").value = replyEmail;
                document.getElementById("comment_reply_cancel").style.display = "block";
                location.href = "#send_comment";
            }
        }
    },
    created: function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
        if (searchUrlParams == "") {
            return;
        }
        var bid = -10;
        for (var i = 0; i < searchUrlParams.length; i ++) {
            if (searchUrlParams.split("=")[0] == "bid") {
                try{
                    bid = parseInt(searchUrlParams.split("=")[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(function (resp) {
            blogComments.comments = resp.data.data;
            blogComments.total = resp.data.data.length;
            for (var i = 0; i < blogComments.comments.length; i ++) {
                if (blogComments.comments[i].parent > -1) {
                    blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
                }
            }
        }).catch(function (resp) {
            console.log("请求失败");
        });
    }
});
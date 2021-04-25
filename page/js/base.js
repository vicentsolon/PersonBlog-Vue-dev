var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
    },
    computed: {
        randomColor: function() {
            return function() {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return "rgb(" + red + "," + green + "," + blue + ")";
            }
        },
        randomSize: function () {
            return function () {
                var size = (Math.random() * 20 + 12) + "px";
                return size;
            }
        }
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryAllTags"
        }).then(function (resp) {
            var result = resp.data.data;
            for (var i = 0; i < result.length; i ++) {
                result[i].link = "/tag_blog.html?tag=" + result[i].tag
            };
            result.sort(function () {
                return Math.random() - 0.5;
            });
            randomTags.tags = result;
        }).catch(function (resp) {
            console.log("请求失败");
        });
    }
});

var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: [
            {title: "测试", link: ""},
        ]
    },
    computed: {

    },
    created: function () {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(function (resp) {
            var result = resp.data.data;
            for (var i = 0; i < result.length; i ++) {
                result[i].link = "/blog_detail.html?bid=" + result[i].id;
            }
            newHot.titleList = result;
        });
    }
});

var newComments = new Vue({
    el: "#new_comments",
    data: {
        commentsList: [
            {name: "用户名-1", time: "时间-1", comment: "热评：圣诞节就好好游戏和欢呼吧，因为圣诞节一年只有一次。"},
            {name: "用户名-1", time: "时间-1", comment: "热评：圣诞节就好好游戏和欢呼吧，因为圣诞节一年只有一次。"},
            {name: "用户名-1", time: "时间-1", comment: "热评：圣诞节就好好游戏和欢呼吧，因为圣诞节一年只有一次。"}
        ]
    },
    computed: {

    },
    created: function () {
        axios({
            method: "get",
            url: "/queryHotComments"
        }).then(function (resp) {
            newComments.commentsList = resp.data.data;
        }).catch(function (resp) {
            console.log("请求失败");
        });
    }
});

var searchBar = new Vue({
    el: "#search_bar",
    data: [],
    computed: {
        searchBlog: function () {
            return function () {
                var text = document.getElementById("search_input").value;
                if (text == "") {
                    alert("关键字不能为空");
                    return;
                };
                if (text.length > 20) {
                    alert("关键词不能超过20个字");
                    return;
                }
                location.href = "/search.html?search=" + text;
            }
        }
    },
    created: function () {
        //
    }
});

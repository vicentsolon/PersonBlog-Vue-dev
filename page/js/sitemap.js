var blogList = new Vue({
    el: "#blog_list",
    data: {
        blogList: []
    },
    computed: {

    },
    created: function () {
        axios({
            method: "get",
            url: "/queryAllBlog",
        }).then(function (resp) {
            result = resp.data.data;
            for (var i = 0; i < result.length; i ++) {
                result[i].link = "/blog_detail.html?bid=" + result[i].id;
            }
            blogList.blogList = result;
        });
    }
});
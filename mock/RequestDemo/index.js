const Mock = require("mockjs");
module.exports = {
    "POST /mock/request/demo": Mock.mock({
        result: 0,
        result_info: "success",
        content: {
            page: "RequestDemo",
            type: "/mock/request/demo"
        }
    }),
    "POST /mock/request/demo/page": require('./page.js')
}
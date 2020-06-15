const Mock = require("mockjs");
module.exports = {
    "POST /api/pageLu": Mock.mock({
        result: 0,
        result_info: "success",
        content: {
            a: 1
        }
    }),
    "POST /api/page": require('./page.js')
}
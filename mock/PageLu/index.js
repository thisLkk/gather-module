const Mock = require("mockjs");
module.exports = {
    "POST /mock/pageLu": Mock.mock({
        result: 0,
        result_info: "success",
        content: {
            a: 1
        }
    }),
    "POST /mock/page": require('./page.js')
}
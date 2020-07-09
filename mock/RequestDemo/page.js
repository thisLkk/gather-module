const Mock = require("mockjs");

let data = Mock.mock({
    result: 0,
    result_info: "ok",
    content: {
        page: "RequestDemo",
        type: "/mock/request/demo"
    }
});
module.exports = (req, res) => {
    setTimeout(() => {
        res.send(data);
    }, 100);
};

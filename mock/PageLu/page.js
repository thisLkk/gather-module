const Mock = require("mockjs");

let data = Mock.mock({
    result: 0,
    result_info: "ok",
    content: {
       page: 1
    }
});
module.exports = (req, res) => {
    setTimeout(() => {
        res.send(data);
    }, 100);
};

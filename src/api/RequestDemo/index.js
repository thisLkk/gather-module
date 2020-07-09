
// 引入mockjs
const Mock = require('mockjs');

const requestDemo = function() {
    return {
        result: 0,
        result_info: "success",
        content: {
            page: "RequestDemo",
            type: "/api/request/demo"
        }
    }
}
 
Mock.mock('/api/request/demo', 'post', requestDemo);
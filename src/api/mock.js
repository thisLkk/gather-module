/**
 * mock 目录是与view目录相对应(第二种方式)
 */
// 引入mockjs
const Mock = require('mockjs');
Mock.setup({
    timeout: 800, // 设置延迟响应，模拟向后端请求数据
});
const RequestDemo = require('./RequestDemo/index.js');

module.exports = {...RequestDemo };
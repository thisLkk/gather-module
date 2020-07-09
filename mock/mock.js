/**
 * mock 目录是与view目录相对应
 */
const pageLu = require('./PageLu/index.js');
const RequestDemo = require('./RequestDemo/index.js');

module.exports = {
    ...pageLu, ...RequestDemo
};
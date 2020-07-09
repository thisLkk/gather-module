/**
 * @file apiconfig
 * @description api地址配置列表，请求接口是来此处取路径
 */

const isLocal = process.env.NODE_ENV === 'development'; // 线上或者线下
const localPrefix = '/api/'; // 线下地址
const requestDemo = '/xianshang/requestDemo'; // 真实线上地址
export default {
    // 验证接口 下的三种方式
    apiDequestDemo: isLocal ? localPrefix + 'request/demo' : requestDemo + 'index',
    mockRequestDemo: isLocal ? '/mock/request/demo' : requestDemo + 'index',
    proxyRequestDemo: isLocal ? '/proxy/request/demo' : requestDemo + 'index',
};

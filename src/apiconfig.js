/**
 * @file apiconfig
 * @description api地址配置列表，请求接口是来此处取路径
 */

const isLocal = location.origin === 'http://localhost:8081';
const localPrefix = '/api/';
const pagelu = '/xianshang/pagelu';
export default {
    // 获取LU首页数据
    getPageLu: isLocal ? localPrefix + 'pageLu' : pagelu + 'index'
};

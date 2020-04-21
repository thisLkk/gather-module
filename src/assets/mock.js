// 引入mockjs
const Mock = require('mockjs');
Mock.setup({
    timeout: 800, // 设置延迟响应，模拟向后端请求数据
});
// 获取 mock.Random 对象
const Random = Mock.Random;
// 用户信息接口
const produceNewsData = function() {
    let data = {
        name: 'andim',
        onther:{
            onther:1
        }
    }
    return {
        data: data
    }
}

 
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/getUser', 'post', produceNewsData);
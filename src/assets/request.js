/**
 * 统一拦截请求，并处理转发请求
 */
import Qs from 'qs';
import axios from 'axios';

// 添加一个请求拦截器 （于transformRequest之前处理）
axios.interceptors.request.use(function (config) {
    // 可以同意添加想要添加的信息
    // 例子：headers 添加一条信息
    config.headers['demo'] = 'demo';
    return config;
}, function (error) {
    // 当出现请求错误是做一些处理
    return Promise.reject(error);
});

// 添加一个返回拦截器 （于transformResponse之后处理）
axios.interceptors.response.use(function (response) {
    // 可以设置满足一定条件才返回数据，如请求状态码或者接口返回的code
    return response.data;

}, function (error) {
    console.log(error);
    return Promise.reject({
        status: -404,
        msg: '网络异常'
    });
});


export default function request(url, {
    method = 'post',
    timeout = '25000',
    data = {},
    headers = {},
    dataType = 'json'
}) {
    // 扩展headers信息
    headers = Object.assign(method === 'get' ? {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    } : {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }, headers);

    const configOption = {
        url,
        method,
        params: data,
        data,
        timeout,
        headers,
        responseType: dataType
    };

    if (method === 'get') {
        delete configOption.data;
    }
    else {
        delete configOption.params;
        const contentType = headers['Content-Type'];
        if (typeof contentType !== 'undefined') {
            if (~contentType.indexOf('multipart')) {
                // 类型 `multipart/form-data;`
                configOption.data = data;
            } 
            else if (~contentType.indexOf('json')) {
                // 类型 `application/json`
                // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
                configOption.data = JSON.stringify(data);
            } 
            else {
                // 类型 `application/x-www-form-urlencoded`
                // 服务器收到的raw body(原始数据) name=homeway&key=nokey
                configOption.data = Qs.stringify(data);
            }
        }
    }
    return axios(configOption);

};
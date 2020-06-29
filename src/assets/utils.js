/**
 * 动态加载script
 *
 * @param {string} url 加载script的url
 * @param {Function} callback 回调函数
 * @inner
 */
import Vue from 'vue';
const WINDOW = window;
const DOCUMENT = WINDOW.document;
const loading = {};
const loaded = {};
/**
 *判断当前环境是否是微信
*
* @inner
*/
export function isWx() {
    return /MicroMessenger/i.test(navigator.userAgent);
}
export function getScript(requestURL, callback) {
    var el;
    var url = requestURL;
    var needToLoad = !loading[url];
    var q = loading[url] = loading[url] || [];

    function doCallback(e) {
        if (callback) {
            callback(e);
        }
    }
    if (loaded[url]) {
        doCallback();
        return;
    }
    q.push(doCallback);

    function onLoad(e) {
        loaded[url] = 1;
        while (q.length) {
            q.shift()(e);
        }
    }
    if (needToLoad) {
        el = document.createElement('script');
        el.type = 'text/javascript';
        el.charset = 'utf-8';
        if (el.addEventListener) {
            el.addEventListener('load', onLoad, false);
        } else { // IE
            el.attachEvent('onreadystatechange', onLoad);
        }
        el.setAttribute('data-requested', requestURL);

        el.src = url;
        document.getElementsByTagName('head')[0].appendChild(el);
    }
};
// 获取变量类型
export const getType = param => Object.prototype.toString.call(param).match(/\[object\s(\w+)\]/)[1];
/**
 * 获取url参数
 *
 * e.g:
 *
 *      https://1.baidu.com?from=baidu
 *
 *      var from = getQueryString( 'from' ); // output: baidu
 *
 * @param {String} param 参数名
 * @returns {String} 参数值
 */
export function getQueryString( param ) {
    let paramObj = {};
    location.search.replace( /([^?&=]+)=([^&=]*)/g, ( rs, $1, $2 ) => {
        paramObj[$1] = $2;
    } );
    return paramObj[param];
};
/**
 * 根据时间戳返回 年月日 / 月日
 * @param {Number} stamp 时间戳（秒级）
 * @param {Number} type 0：月/日 1：年/月/日 2:年/月/日 时/分/秒
 *
 */
export function timeFormat(stamp, type = 0) {
    if (stamp) {
        let date = new Date(+stamp * 1000);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let min = date.getMinutes();
        let s = date.getSeconds();
        switch(+type) {
            case 0:
                return `${m}月${d}日`;
            case 1:
                return `${y}年${m}月${d}日`;
            case 2:
                return `${y}年${m}月${d}日 ${h}:${min}:${s}`;
        }
    }
    else {
        return '';
    }
};
// 增加手机端调试
export const gloryFactory = (onPageLoad) => {
    // 方便我们分开处理样式
    // DOCUMENT.body.classList.add(
    //     // (AGENT && AGENT.OS.ios) ? 'ios' : 'android'
    // );

    let debug = getQueryString('door');
    // Debug model
    if (debug !== undefined && debug.indexOf('back') >= 0) {
        Vue.config.devtools = Vue.config.productionTip = true;
        if (debug.indexOf('sole') !== -1) {
            getScript('https://w0.dxmstatic.com/cdn-co.baifubao.com/static/agentjs/dist/sole.js', function () { });
        }
        window.addEventListener('error', function (event) {
            if (event.message.indexOf('Unexpected number') === -1) {
                alert(event.message);
            }
        });
    }
    return onPageLoad();
};
/**
 * 数字转换为金额,默认传入的数字为分
 * @param {Number} num 数字
 * @param {Number} type 类型 0默认：逗号相隔 例子          num ： 10001000   输出：10,001,000.00 
 * @param {Number} type 类型 1：过万展示万标示且没有逗号 例子 1、num ： 9999   输出： 9999.00  2、num ： 99999   输出： 9.99万
 *
 */
export function numToAmount (num, type = 0) {
    // 不存在返回 0.00
    if (!num) return '0.00';
    // 是否过万(单位是分)
    var isWan = +num >= 1000000 ? true : false;
    // 判断是否有小数
    // 过万添加万字标示
    switch (+type) {
        case 1:
            num = isWan ? (fen2yuan(num/10000, 2)) + '万' : fen2yuan(num, 2);
            break;
            
        default:
            num = fen2yuan(num, 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        break;
    }
    return num; 
}
/**
 * 分转化为元
 * val 数字，需要转化的金额
 * num 需要保留的小数位数
 */
export function fen2yuan(val, num = 0) {
    val = val * 10;
    return (parseInt(val) / 1000).toFixed(num);
}
// 禁止滚动
let scrollTop = 0;
let fixedCount = 0;
export function fixedBody(toTop) {
    fixedCount++;
    if (scrollTop <= 0) {
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        document.body.style.cssText += `position:fixed;top:-${toTop ? 0 : scrollTop}px;`;
    }
}

// 去除滚动禁止
export function looseBody() {
    fixedCount--;
    if(fixedCount > 0) {
        return false;
    }
    const body = document.body;
    body.style.position = '';
    const top = body.style.top;
    body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    body.style.top = '';
    scrollTop = 0;
}
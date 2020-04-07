/**
 * 动态加载script
 *
 * @param {string} url 加载script的url
 * @param {Function} callback 回调函数
 * @inner
 */
const loading = {};
const loaded = {};
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
import util from '../util';

// 最后一个分享参数，cache it to prevent race condition
let localData;

function shareUse(shareData) {
    localData = shareData;

    var apiList = [
        "Timeline",
        "AppMessage",
        "QQ",
        "Weibo",
        "QZone"
    ];

    apiList.forEach(function (name) {
        try {
            wx["onMenuShare" + name](localData);
        } catch (e) { }
    });
}

/**
 * demo
 * shareWechat({
 *   title: '分享标题',
 *   desc: '分享描述',
 *   link: 'www.baidu.com',
 *   imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
 *   success: function (res) {
 *     alert('已分享');
 *   },
 *   cancel: function (res) {
 *     alert('已取消');
 *   },
 *   fail: function (res) {
 *     alert(JSON.stringify(res));
 *   }
 * });
 **/

function shareWechat(shareData) {
    //判断是否在微信内部
    if (!util.isWx()) {
        return function () { };
    }

    localData = shareData;

    var url = location.href.split("#")[0];
    // var api = "https://www.baifubao.com/walletappapi/wechat/share?cmd=1073&callback=wechatCb&url=" + encodeURIComponent(url);

    var isJssdkLoaded = false;

    var isApiLoaded = false;

    var wx_api_data;

    //后端获取微信分享必要key的jsonph回调
    window.wechatCb = function (data = {}) {
        var _data = data.content || {};
        if (+data.ret === 0) {
            isApiLoaded = true;
            wx_api_data = _data;
            config();
        }
    };


    //jsonp拉取isApi
    util.getScript(api);
    //注入微信jssdk
    util.getScript("https://res.wx.qq.com/open/js/jweixin-1.4.0.js");


    //注册微信配置入口函数
    var config = function () {
        // 都加载了

        if (isJssdkLoaded && isApiLoaded) {
            var configData = {
                debug: false,
                appId: wx_api_data.appid,
                timestamp: wx_api_data.timestamp,
                nonceStr: wx_api_data.nonceStr,
                signature: wx_api_data.signature,
                jsApiList: [
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline'
                ]
            };

            wx.config(configData);
            wx.ready(ready);
            wx.error(function (res) {
                console.log(res, 'error');
            });
        }
    };

    //注册分享内容
    var ready = function () {
        shareUse(localData);
    };


    //检查微信jssdk是否被引用注册成功
    var checkJssdkLoaded = function () {
        if (window.wx) {
            isJssdkLoaded = true;
            config();
        } else {
            setTimeout(function () {
                checkJssdkLoaded();
            }, 100);
        }
    }

    //entrance!!
    checkJssdkLoaded();
}

export {
    shareWechat,
    shareUse,
}

/**
 * @file 读取微信返回的code暴露到页面中
 */

(function () {
    window.GlobalData = window.GlobalData || {};
    const GlobalData = window.GlobalData;
    const FOUNTAIN_MAIN_URL = GlobalData.mainUrl;
    const FOUNTAIN_SUPPORT_URL = GlobalData.supportUrl || location.href;
    const getShareCode = GlobalData.getShareCode;
    const getWechatCode = GlobalData.getWechatCode;
    const wechatAuthScope = GlobalData.wechatAuthScope;
    const cookieName = GlobalData.authCookieName;
    const WECHAT_AUTH = 'https://open.weixin.qq.com/connect/oauth2/authorize';
    const WX_URL_REST = '&response_type=code&scope=' + wechatAuthScope
        + '&state=STATE#wechat_redirect';
        // wxa09c25dc588 测试环境appid
    const UMONEY_WECHAT_APPID = 'wxa09c25dc54d';
    const initiialQs = deparams();
    const initiialCs = decookies();
    const isWeChat = /MicroMessenger/i.test(window.navigator.userAgent);
    const channel = initiialQs.channel || 'common';
    const fromtn = initiialQs.fromtn || initiialQs.fr || 'common';
    const activity_id = initiialQs.activity_id;
    const logMark = 'activity_id=' + activity_id + '&channel=' + channel + '&fromtn=' + fromtn;
    

    function exportShareCode() {
        const match = initiialQs.invite_code;

        if (match) {
            GlobalData.inviteCode = initiialQs.invite_code;
        } else if (GlobalData.noShareCodeJumpBack) {
            // location.replace(FOUNTAIN_MAIN_URL + '?' + logMark);
        }
    }

    function exportWechatCode(appid, returnUrl) {
        // 取url参数 code
        const match = initiialQs.code;
        if (match) {
            GlobalData.code = initiialQs.code;
            let wxCode = localStorage.getItem('wxCode');
            if (wxCode && wxCode === GlobalData.code) {
                location.replace(WECHAT_AUTH + '?appid=' + UMONEY_WECHAT_APPID
                    + '&redirect_uri=' + encodeURIComponent(returnUrl)
                    + WX_URL_REST);
            }
            else {
                // window.sessionStorage.setItem('shouldGotLog', 1)
                localStorage.setItem('wxCode', GlobalData.code);

            }
        } else {
            location.replace(WECHAT_AUTH + '?appid=' + UMONEY_WECHAT_APPID
                + '&redirect_uri=' + encodeURIComponent(returnUrl)
                + WX_URL_REST);
        }
    }

    if (getShareCode) {
        exportShareCode();
    }
    if (getWechatCode) {
        if(wechatAuthScope === 'snsapi_userinfo') {
            // 获取用户信息的scope下，根据cookie中的标识，如果已经获取过不再跳去授权
            // 在此次活动中，获取授权code之后 后端用code获取用户头像之后会setcookie useropenid表示已经拿到头像
            if(initiialCs[cookieName]) {
                return false;
            }
        }
        
        if (isWeChat) {
            exportWechatCode(UMONEY_WECHAT_APPID, FOUNTAIN_SUPPORT_URL
                + '?invite_code=' + (GlobalData.inviteCode || '') + '&' + logMark);
        }
    }
   
    function deparams() {
        const paramObj = {};
        const pairs = location.search.slice(1).split('&');
        for (let index = 0; index < pairs.length; index++) {
            const element = pairs[index];
            const pair = element.split('=');
            let key = pair[0];
            let val = pair[1];
            try {
                key = decodeURIComponent(pair[0]);
            } catch (error) { }
            try {
                val = decodeURIComponent(pair[1]);
            } catch (error) { }
            paramObj[key] = val;
        }
        return paramObj;
    }

    function decookies() {
        /*获取cookie参数*/
        let getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并且将获得的cookie格式化，去掉空格字符
        let arrCookie = getCookie.split(";") //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        let tips = {}; //声明变量tips

        for (var i = 0; i < arrCookie.length; i++) { //使用for循环查找cookie中的tips变量
            let arr = arrCookie[i].split("="); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            let key = arr.splice(0, 1)
            tips[key] = arr.join('='); // 再以 = 链接起来的操作是因为，发现有的cookie的value中含有 = ，避免误伤value
        }
        return tips
    }

})();

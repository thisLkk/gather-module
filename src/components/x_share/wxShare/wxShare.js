/* eslint-disable */
/**
* @file 微信分享核心js
* @author wuwenguo(wuwenguo@baidu.com)
* @Date 2018-10-11
*/
import {shareWechat, shareUse} from './shareWechat';
/**
 * 微信二次分享配置函数
 *
 * @param {object} shareData 分享的数据
 * @param {string} shareData.title 分享标题
 * @param {string} shareData.desc 分享描述
 * @param {string} shareData.imgUrl 分享icon图标地址
 * @param {string} shareData.link 分享出去的链接
 * @param {Function} shareData.success 用户点击分享的回调 具体分享成功还是失败无法知晓
 * @inner
 */
export default function wxShare(shareData) {
    let wxShareData = {
        title: shareData.title,
        desc: shareData.desc,
        imgUrl: shareData.imgUrl || 'https://www.baifubao.com/static/luodiye/icon_share_128.png',
        link: shareData.link || location.href.replace(/#.*$/, ''),
        success() {
            shareData.success && shareData.success();
        }
    }
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        // shareWechatInit全局变量，代表是否已经初始化微信分享
        if(window.shareWechatInit) {
            shareUse(wxShareData);
        }
        else {
            // 强制开启微信分享配置
            shareWechat(wxShareData);
            window.shareWechatInit = true;
        }
    }
};



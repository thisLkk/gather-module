import shareBase from './share.vue';
import multiShare from './multiShare.vue';
import Vue from 'vue';
import { getType, getQueryString } from '@/util/util';
import wxShare from "./wxShare/wxShare";
import ajax from "@/util/ajax";
import util from "./util";
// 路由跳转，需要自动关闭所有的share
const defaultOptions = {
    title: '默认title',
    desc: '默认描述',
    imgUrl: '分享图标',
    link: '',
    shareImgurl: '',
    content: '',
    isToCutScreenShare: 0,
    // 微信分享
    wxShare: {
        url: '',
    }
}
// 路由跳转，需要自动关闭所有的share
window.globalModuleCollector = window.globalModuleCollector || new Set();
export default class Share {
    constructor(customOptions = {},wxInit) {
        let self = this;
        this.options = {};
        this.setOptions(customOptions);
        this.share = createNewShare(this.options, this);
        this.el = document.body.appendChild(
            document.createElement('div')
        );
        if(wxInit&&util.isWx()){
            // 初始化微信分享
            this.setWxShare();
        }
        window.globalModuleCollector.add(this);
    }
    setOptions(customOptions = {}) {
        customOptions = Object.assign({}, defaultOptions, this.options, customOptions);
        this.options = customOptions;
        return this.options;
    }
    show(customOptions) {
        if (customOptions && getType(customOptions) === 'Object') {
            this.share.options = this.setOptions(customOptions);
            console.log(this.share)
        }
        if (this.mounted) {
            this.share.showShare = true;
        } else {
            this.share.$mount(this.el);
            this.el = this.share.$el;
            this.share.showShare = true;
            this.mounted = true;
        }
        if (getType(this.options.showCallBack) === 'Function') {
            this.options.showCallBack();
        }
        return this;
    }

    close() {
        if (getType(this.options.closeCallBack) === 'Function') {
            this.options.closeCallBack()
        }
        this.share.showShare = false;
    }
    copied(type) {
        if (getType(this.options.copied) === 'Function') {
            this.options.copied(type)
        }
        let text = type === "link" ? '链接复制成功' : '复制成功';
        Vue.prototype.$toast(text);
    }
    destory() {
        document.removeChild(this.el);
        this.el = null;
        window.globalModuleCollector.delete(this);
        return this;
    }
    // 初始化微信分享
    setWxShare() {
        ajax("/is/invite/get_share_url", {
            activity_id: getQueryString("activity_id") || "",
            channel: getQueryString("channel") || "",
            fromtn:
                getQueryString("fromtn") || getQueryString("fr") || ""
        }).then(
            data => {
                wxShare({
                    title: this.options.wxShare.title || this.options.title,
                    desc: this.options.wxShare.desc || this.options.desc,
                    imgUrl: this.options.imgUrl,
                    link: data.invite_url || this.options.link
                });
            },
            function (data) { }
        );
    }
}

function createNewShare(options, share) {
    let shareCom = options.shareType && options.shareType.includes('multi') ? multiShare : shareBase;
    return new Vue({
        data() {
            return {
                options,
                showShare: false
            }
        },
        components: {
            shareCom
        },
        render: function (createElement) {
            return createElement(
                shareCom,
                {
                    props: {
                        showShare: this.showShare,
                        shareData: this.options,
                        closeShare: share.close.bind(share)
                    },
                    on: {
                        copied:(type) => {
                            share.copied.call(share, type)
                        }
                    }
                }
            )
        }
    })
}
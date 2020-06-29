<template lang="pug">
    .share-mask(v-if="showShareMask",
        @click="delayCloseShare",
        @touchmove.prevent="")
        .wrapper(:class="classVal",)
            .content-wechat
                img(:src="shareData.wxShare.url",:class='shareData.wxShare.className')
            .content-other
                .close(@click="delayCloseShare")
                div.text(v-html='shareData.content')
                img(:src='shareData.shareImgurl')
                div(@click.stop="")
                    clipboard.clipboard(
                        :text="shareData.copyText+shareData.link",
                        @success="copied"
                    )
                        | 复制活动链接

</template>

<script>
import util from "./util";
import ajax from "@/util/ajax";
import { getQueryString } from "@/util/util";
import wxShare from "./wxShare/wxShare";
import clipboard from "../clipboard/clipboard";

const shareStyleConfig = {
    wechat: {
        class: "wechat"
    },
    other: {
        class: "other"
    }
};

export default {
    data() {
        var type = util.isWx()
            ? "wechat"
            : "other";
        const shareStyle = shareStyleConfig[type] || {};
        return {
            showShareMask: this.checkShareMask(),
            type: type,
            classVal: shareStyle.class,
            imgUrl: ""
        };
    },
    props: {
        showShare: {
            type: Boolean,
            required: true
        },
        closeShare: {
            type: Function,
            required: true
        },
        shareData: {
            type: Object,
            required: true,
            validator(shareData) {
                return (
                    !!shareData.title && !!shareData.desc && !!shareData.imgUrl
                );
            }
        }
    },
    created() {},
    methods: {
        /**
         * 初始化分享能力（微信&手百）
         *
         */
        initShare(shareData) {
            let self = this;
            if (this.type == "wechat") {
                wxShare({
                    title: shareData.wxShare.title || shareData.title,
                    desc: shareData.wxShare.desc || shareData.desc,
                    imgUrl: shareData.imgUrl,
                    link: shareData.link,
                    success() {
                        self.$emit("success");
                    }
                });
            }
        },
        /**
         * 模态框状态
         *
         */
        async checkShareMask() {
            const self = this;
            if (this.showShare) {
                await this.getShareImg();
                this.shareData.shareImgurl;
                this.showShareMask = true;
            } else {
                this.showShareMask = false;
            }
        },
        /**
         * 取消/结束分享
         *
         */
        delayCloseShare() {
            setTimeout(() => {
                this.closeShare();
            });
        },
        /**
         * 复制成功回调
         *
         */
        copied() {
            this.$emit("copied");
        },
        /**
         * 获取分享图片和链接的方法
         *
         */
        async getShareImg() {
            if (!this.shareData.shareImgurl || !this.shareData.link) {
                return ajax("/is/invite/get_share_url", {
                    activity_id: getQueryString("activity_id") || "",
                    channel: getQueryString("channel") || "",
                    fromtn:
                        getQueryString("fromtn") || getQueryString("fr") || ""
                }).then(
                    data => {
                        this.shareData.shareImgurl = data.share_url;
                        this.shareData.link = data.invite_url;
                        return true;
                    },
                    function(data) {}
                );
            } else {
                return true;
            }
        }
    },
    components: {
        clipboard
    },
    watch: {
        shareData: {
            handler(newval) {
                this.initShare(newval);
            },
            deep: true,
            immediate: true
        },
        showShare(n, o) {
            this.checkShareMask();
        }
    }
};
</script>

<style lang="less" scoped>
@import url("./share.less");
.share-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99;

    .content-wechat img {
        position: absolute;
    }

    .content-wechat,
    .content-other {
        display: none;
    }

    .wechat .content-wechat {
        display: block;
    }

    .other .content-other {
        display: block;
        color: white;
        padding: 50px 70px;

        .text {
            font-size: 32px;
            line-height: 1.5;
            color: #ffffff;
            text-align: center;
            line-height: 40px;
        }
        img {
            display: block;
            width: 590px;
            height: 800px;
            border-radius: 10px;
            margin: 0 auto;
            position: static;
            margin-top: 40px;
        }
        .clipboard {
            width: 326px;
            height: 87px;
            background-color: rgba(248, 67, 92, 1);
            background-color: -webkit-linear-gradient(
                267deg,
                rgba(248, 67, 92, 1),
                rgba(209, 44, 65, 1)
            );
            box-shadow: 0px 3px 6px 0px rgba(255, 159, 211, 0.35),
                -1px -2px 3px 0px rgba(104, 15, 2, 0.35);
            border-radius: 43px;
            font-size: 30px;
            color: #ffffff;
            font-family: FZLanTingHeiS-R-GB;
            text-align: center;
            line-height: 87px;
            margin: 60px auto 0;
        }
        .close {
            position: absolute;
            height: 35px;
            width: 35px;
            background-image: url("./img/close.png");
            background-repeat: no-repeat;
            background-size: 100%;
            right: 35px;
            top: 35px;

        }
    }
}
</style>

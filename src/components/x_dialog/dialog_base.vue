<template lang="pug">
    .mgm-dialog-container(:class="options.className")
        .bg(@click="close", @touchmove.prevent="" v-if="!options.showCloseBtn")
        .bg(@touchmove.prevent="" v-else)
        .dialog-body
            div(v-if="options.template", v-html="options.template")
            div(v-else)
                .title(v-html="options.title")
                    span 很抱歉!
                .content(v-html="options.content")
                    span 您需要先完成实名认证
                    span 才能提现哦
            .btn-group(:class="options.btnGroupDirection")
                .confirm-btn(v-if="options.showConfirmBtn", @click="confirmBtnClick")
                    x-text {{options.confirmBtnName}}
                .cancel-btn(v-if="options.showCancelBtn", @click="cancelBtnClick")
                    x-text {{options.cancelBtnName}}
            i.close(v-if="options.showCloseBtn", @click="closeBtnClick")
</template>

<script>
import xText from '@/component/x_text';
const components = {
    xText
}

export default {
    props: {
        options: {
            type: Object,
            required: true
        },

        close: {
            type: Function,
            required: true
        }
    },

    methods: {
        confirmBtnClick() {
            const {confirmBtnCallback: cb} = this.options;
            if(cb) { cb() };
            this.close();
        },

        cancelBtnClick() {
            const {cancelBtnCallback: cb} = this.options;
            if(cb) { cb() };
            this.close();
        },

        closeBtnClick() {
            const {closeBtnCallback: cb} = this.options;
            if(cb) { cb() };
            this.close();
        }
    },

    components
}
</script>

<style lang="less">
    // @import "~@/util/css/z-index.less";

    .mgm-dialog-container {
        position: fixed;
        .z-index10();
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .bg {
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
        }
        .dialog-body {
            width: 540px;
            height: auto;
            padding: 46px 50px;
            background-color: rgba(255, 255, 255, 1);
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 10px;
            text-align: left;
        }
        .title {
            font-size:42px;
            font-family:'FZLanTingHeiS-R-GB';
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:46px;
        }
        .content {
            font-size:26px;
            font-family:"FZLanTingHeiS-R-GB";
            font-weight:400;
            color:rgba(85,85,85,1);
            line-height:41px;
        }
        .btn-group {
            display: flex;
            text-align: center;
            &.column {
                flex-direction: column;
            }
            &.row {
                flex-direction: row;
            }
        }
        .confirm-btn {
            
        }
        .cancel-btn {
            
        }
        i.close {
            position: absolute;
            top: 40px;
            right: 62px;
            display: block;
            width: 36px;
            height: 36px;
            &:before,
            &:after {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                display: block;
                width: 100%;
                height: 0;
                border-top: 1px solid rgba(0, 0, 0, 1); /* no */
                transform: rotate(45deg);
            }
            &:after {
                transform: rotate(-45deg);
            }
        }
    }
</style>
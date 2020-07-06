<template lang="pug">
    div
        transition(:name="transitionNames[1]")
            div( :class="maskClasses",
                :style="wrapStyles",
                v-show="visible",
                v-if="showMask",
                @click="handleMask")
        div(:class="wrapClasses" :style="wrapStyles",@click="handleWrapClick")
            transition(:name="transitionNames[0]",@after-leave="animationFinish")
                div(:class="classes",v-show="visible")
                    div(:class="contentClasses",ref="content")
                        a(:class="[prefixCls + '-close']",v-if="closable",@click="close")
                            slot(name="close")
                                .close
                        div(:class="[prefixCls + '-header']", v-if="showHead")
                            slot(name="header")
                                div(:class="[prefixCls + '-header-inner']") {{ title }}
                        div(:class="[prefixCls + '-body']")
                            slot
                        div(:class="[prefixCls + '-footer']",v-if="!footerHide")
                            slot(name="footer")
                                button( @click="cancel") {{ localeCancelText }}
                                button(@click="ok") {{ localeOkText }}
</template>
<script>
import { fixedBody, looseBody } from '@/util/common'
const prefixCls = 'dialog'
export default {
    name: 'Dialog',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        // 是否显示关闭按钮
        closable: {
            type: Boolean,
            default: false
        },
        // 点击遮罩层是否可以关闭弹窗
        maskClosable: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        },
        okText: {
            type: String
        },
        cancelText: {
            type: String
        },
        className: {
            type: String
        },
        // 是否隐藏dialog 的footer
        footerHide: {
            type: Boolean,
            default: false
        },
        scrollable: {
            type: Boolean,
            default: false
        },
        transitionNames: {
            type: Array,
            default() {
                return ['ease', 'fade']
            }
        },
        // 是否全屏
        fullscreen: {
            type: Boolean,
            default: false
        },
        mask: {
            type: Boolean,
            default: true
        },
        zIndex: {
            type: Number,
            default: 1000
        }
    },
    data() {
        return {
            prefixCls: prefixCls,
            wrapShow: false,
            showHead: true,
            visible: this.value,
            isMouseTriggerIn: false
        }
    },
    computed: {
        wrapClasses() {
            return [
                `${prefixCls}-wrap`,
                {
                    [`${prefixCls}-hidden`]: !this.wrapShow,
                    [`${this.className}`]: !!this.className,
                    [`${prefixCls}-no-mask`]: !this.showMask
                }
            ]
        },
        wrapStyles() {
            return {
                zIndex: this.modalIndex + this.zIndex
            }
        },
        maskClasses() {
            return `${prefixCls}-mask`
        },
        classes() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-fullscreen`]: this.fullscreen,
                    [`${prefixCls}-fullscreen-no-header`]:
                        this.fullscreen && !this.showHead,
                    [`${prefixCls}-fullscreen-no-footer`]:
                        this.fullscreen && this.footerHide
                }
            ]
        },
        contentClasses() {
            return [
                `${prefixCls}-content`,
                {
                    [`${prefixCls}-content-no-mask`]: !this.showMask
                }
            ]
        },
        localeOkText() {
            if (this.okText === undefined) {
                return '确定'
            } else {
                return this.okText
            }
        },
        localeCancelText() {
            if (this.cancelText === undefined) {
                return '取消'
            } else {
                return this.cancelText
            }
        },
        showMask() {
            return this.draggable ? false : this.mask
        }
    },
    methods: {
        close() {
            this.visible = false
            this.$emit('input', false)
            this.$emit('on-cancel')
        },
        handleMask() {
            if (this.maskClosable && this.showMask) {
                this.close()
            }
        },
        handleWrapClick(event) {
            if (this.isMouseTriggerIn) {
                this.isMouseTriggerIn = false
                return
            }
            const className = event.target.getAttribute('class')
            if (className && className.indexOf(`${prefixCls}-wrap`) > -1) {
                this.handleMask()
            }
        },
        handleMousedown() {
            this.isMouseTriggerIn = true
        },
        cancel() {
            this.close()
        },
        ok() {
            this.visible = false
            this.$emit('input', false)
            this.$emit('on-ok')
        },
        animationFinish() {
            this.$emit('on-hidden')
        }
    },
    mounted() {
        if (this.visible) {
            this.wrapShow = true
        }

        let showHead = true

        if (this.$slots.header === undefined && !this.title) {
            showHead = false
        }

        this.showHead = showHead

        // 判断是否可以滚动
        if (!this.scrollable) {
            fixedBody()
        }
    },
    beforeDestroy() {
        looseBody();
        clearTimeout(this.timerName);
    },
    watch: {
        value(val) {
            this.visible = val
        },
        visible(val) {
            if (val === false) {
                this.timerName = setTimeout(() => {
                    this.wrapShow = false
                    looseBody()
                }, 300)
            } else {
                if (this.timerName) clearTimeout(this.timerName)
                this.wrapShow = true
                if (!this.scrollable) {
                    fixedBody()
                }
            }
            this.$emit('on-visible-change', val)
        },
        scrollable(val) {
            if (!val) {
                fixedBody()
            } else {
                looseBody()
            }
        },
        title(val) {
            if (this.$slots.header === undefined) {
                this.showHead = !!val
            }
        }
    }
}
</script>

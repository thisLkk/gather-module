<template lang="pug">
    .x-scroll(@scroll.stop="onScroll", ref="xScroll")
        .list-container
            slot
        .loading(v-show="showLoading")
            p.loading-circle
            p.loading-text 加载中
        .end-tip(v-if="!showLoading && isEnd")
            slot(name="more")
                p.end-text 没有更多了
        slot(name="noRecord")
            .empty(v-if="isEmpty")
                | 暂无记录
</template>

<script>
import {getType} from '@/util/util';

export default {
    data() {
        return {
            showLoading: false,
            isEnd: false,
            isEmpty: false,
            throttleTimer: 0,
            conOffsetHeight: 0
        }
    },

    props: {
        /**
         * return a Promise
         */
        callback: {
            type: Function,
            required: true
        }
    },

    mounted() {
        let callbackType = getType(this.callback);
        if(callbackType !== 'Function') {
            throw new Error(`x-scroll:: callback function is required, but got ${callbackType}`);
        }

        this.conOffsetHeight = this.$refs.xScroll.offsetHeight;
        this.fetchData(true);
    },

    methods: {
        /**
         * 加载数据
         */
        fetchData(isInit) {
            if(this.showLoading) {
                return false;
            };
            this.showLoading = true;
            this.callback().then(list => {
                this.showLoading = false;
                // 异常情况，由业务方处理
                if(getType(list) !== 'Array') {
                    return false;
                };
                if(list.length <= 0) {
                    if(isInit) {
                        // 初始化为空，应展示空图片
                        this.isEmpty = true;
                        return false;
                    }
                    this.isEnd = true;
                };
            })
        },
        /**
         * 滚动事件
         */
        onScroll(e) {
            if(this.isEnd || this.showLoading || this.isEmpty) {
                return false;
            }
            this.throttle(() => {
                const {conOffsetHeight, $refs} = this;
                const {xScroll} = $refs;
                const {scrollHeight, scrollTop} = xScroll;
                let shouldLoad = scrollHeight - scrollTop - conOffsetHeight <= 10;
                if(shouldLoad) {
                    this.fetchData();
                }
            }, 300)();
        },
        /**
         * 节流函数
         */
        throttle(fn, interval) {
            let timer = null;
            return function () {
                let $vm = this,
                    args = arguments;
                if(timer) {
                    return false;
                }
                //延迟一段时间执行
                timer = setTimeout(function() {
                    clearTimeout(timer);
                    timer = null;
                    fn.apply($vm, args);
                }, interval || 500);
            };
        }
    }
}
</script>

<style lang="less">
    .x-scroll {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        .loading {
            text-align: center;
            padding: 25px 0 50px;
            &-circle {
                display: inline-block;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 1px solid gray;
                border-bottom-color: transparent;
                vertical-align: middle;
                animation: circle-roll 0.7s linear infinite;
                display: inline-block;
                margin-right: 8px;
                @keyframes circle-roll {
                    0% { transform: rotate(0deg) }
                    100% { transform: rotate(360deg) }
                }
            }
            &-text {
                font-size:24px;
                font-family:'FZLanTingHeiS-R-GB';
                display: inline-block;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:24px;
            }
        }
        .end-tip {
            text-align: center;
            padding: 25px 0 50px;
            .wei-css() {
                content: '';
                position: absolute;
                width: 40px;
                height: 2px;
                background: rgba(245,241,239,1);
                top: 49%;
                left: -60px;
            }
            .end-text {
                display: inline-block;
                font-size:24px;
                font-family:'FZLanTingHeiS-R-GB';
                display: inline-block;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:24px;
                position: relative;
                &::before {
                    .wei-css();
                }
                &::after {
                    .wei-css();
                    left: auto;
                    right: -55px;
                }
            }
        }
        .empty {
            text-align: center;
            margin-top: 45%;
            color:rgba(153,153,153,1);
        }
    }
</style>
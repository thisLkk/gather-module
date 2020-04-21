<template lang="pug">
    .loading
        .loading-content
            .loading-content-bg(:style="{width: percent + '%'}")
            .loading-flower(:style="{left: percent + '%'}")
        .loading-text 努力加载中{{percent + '%'}}
</template>

<script>
    export default {
        data() {
            return {
                percent: 0,
                percents: [0, 10, 60, 100],
                pi: 0
            }
        },
        props: {
        },
        mounted() {
            let t = +new Date();
            this.setNextPercents();
            this.setProcess();
            let $vm = this;
            window.onload = function() {
                console.log('onload', +new Date() - t);
                $vm.setNextPercents();
            }
        },
        methods: {
            setProcess() {
                let $vm = this;
                let step = Math.ceil(Math.random()*8);
                let percent = $vm.percent + step;
                if(percent <= 100) {
                    $vm.percent = percent;
                    setTimeout(() => {
                        $vm.setProcess();
                    }, 100)
                } else {
                    $vm.percent = 100;
                    setTimeout(() => {
                        this.$emit('complete');
                    }, 100);
                }
            },
            setNextPercents() {
                let index = ++this.pi;
                if(this.percent < this.percents[index]) {
                    this.percent = this.percents[index];
                }
                
            }
        }
    }
</script>

<style lang="less" scoped>
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #b0eff7;
        z-index: 10;
        @width: 546px;
        @height: 36px;
        &-content {
            width: @width;
            height: @height;
            background: rgba(167,192,207,1);
            border: 1px solid rgba(147, 179, 199, 1);
            border-radius: @height;
            margin: 510px auto 70px;
            position: relative;
            &-bg {
                width: 0;
                height: 100%;
                position: relative;
                border-radius: @height;
                overflow: hidden;
                transition: all .5s;
                    &::after {
                    content: '';
                    display: block;
                    width: @width;
                    height: @height;
                    position: absolute;
                    right: 0;
                    background: url(./images/loading.png) center / cover no-repeat;
                    }
            }
            .loading-flower {
                content: '';
                display: block;
                width: 107px;
                height: 94px;
                position: relative;
                background: url(./images/sunflower0.png) center / cover no-repeat;
                top: -50%;
                left: 0;
                transform: translate(-50%, -50%);
                transition: all .5s;
            }
        }
        &-text {
            font-size: 30px;
            font-family: FZLanTingHeiS-R-GB;
            font-weight: 700;
            color: rgba(44,108,98,1);
            line-height: 28px;
            text-align: center;
        }
    }
</style>
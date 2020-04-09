<template>
    <div id="app" :class="cPath">
        <mt-header :class="'gm-header'" :title="cTitle">
            <mt-button icon="back" slot="left" v-show="cBackShow" @click="goBackHdl()"></mt-button>
            <mt-button icon="more" slot="right" @click="showMenuHdl()">
            </mt-button>
        </mt-header>
        <gm-menu
            v-if="menuOpt.show"
            :list="menuOpt.list"
            :closeMenu="menuOpt.closeMenu"
        ></gm-menu>
        <transition name="fade">
            <router-view />
        </transition>

    </div>
</template>
<script>
import gmMenu from '@/components/Menu/index.vue'
export default {
    data() {
        var self = this;
        return {
            // 侧边栏菜单的配置
            menuOpt: {
                show: false,
                closeMenu: function(){
                    self.menuOpt.show = false;
                },
                list: [
                    {
                        path: '/',
                        name: '鲁宽宽'
                    },
                    {
                        path: '/pageLi',
                        name: '李金婷'
                    },
                    {
                        path: '/jiuGePrize',
                        name: '九宫格抽奖'
                    },
                    {
                        path: 'progressBar',
                        name: '进度条'
                    }
                ]
            }
        };
    },
    components: {
        gmMenu
    },
    computed: {
        // 头部的标题
        cTitle() {
            let title = this.$route.name;
            return title;
        },
        // 当前路由
        cPath() {
            let path = this.$route.path;
            return path === "/" ? 'pageLu' : path.slice(1);
        },
        // 回退功能的展示时机
        cBackShow() {
            let isTrue = this.$route.path === "/" ? false : true;
            return isTrue;
        }
    },
    created() {
    },
    methods: {
        /**
         * 回退
         */
        goBackHdl() {
            if (window.history && window.history.length === 1) {
                this.$router.push('/');
            } else {
                window.history.go(-1);
            }
        },
        /**
         * 打开菜单
         */
        showMenuHdl() {
            this.menuOpt.show = true;
        }
    }
};
</script>
<style lang="scss">
@import "~@/assets/css/app.scss";
#app {
    max-width: 750px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    .mint-header {
        font-size: $fontSize22;
        .mintui {
            font-size: $fontSize40;
            &.mintui-back {
                font-size: $fontSize30;
            }
        }
    }
    // 配置每个页面的背景色，类名依赖于router.js
    &.pageLu {
        background: $colorSpare1;
        .gm-header {
            background: $colorSpare1;
        }
    }
    // 配置每个页面的背景色，类名依赖于router.js
    &.pageLi {
        background: $colorSpare4;
        .gm-header {
            background: $colorSpare4;
        }
    }
    .gm-header {
        height: 80px;
        .gm-h-more {
            position: relative;
        }
    }
    .fade-enter-active{
        transition: opacity .5s;
    }
    
    .fade-leave-active {
        display: none;
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
}
</style>

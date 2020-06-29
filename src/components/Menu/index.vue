<template>
    <div class="gm-menu" :class="animationCls" @touchmove="preventEvent($event)">
        <a class="gm-m-close" href="javascript:void(0)" @click="closeHdl()">关闭</a>
        <ul>
            <li
                v-for="(item, index) in list"
                :key="index"
                @click="toPathHdl(item.path)"
            >{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Menu",
    props: {
        // 路由集合
        list: {
            type: Array,
            default: []
        },
        // 关闭开关
        closeMenu: {
            type: Function
        }
    },
    data() {
        return {
            // 动画效果
            animationCls: ''
        };
    },
    created() {
        this.animationHdl()
        .then(data => {
            this.animationCls = 'gm-show';
        })
    },
    methods: {
        preventEvent(e) {
            e.preventDefault();
        },
        toPathHdl(path) {
            this.closeMenu();
            this.$router.push(path);
        },
        animationHdl(value) {
            var self = this;
            return new Promise(function(reslove, reject){
                if (value) {
                    self.animationCls = value;
                }
                setTimeout(function(){
                    reslove();
                }, 100)
            })
        },
        closeHdl() {
            this.animationHdl('gm-hide')
            .then(data => {
                this.closeMenu();
            })
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/assets/css/app.scss";
.gm-menu {
    position: fixed;
    top: 0;
    right: -1000px;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0);
    z-index: 10000;
    transition: right 0.5s;
    text-align: center;
    &.gm-show {
        right: 0px;
    }
    &.gm-hide {
        right: -1000px;
    }
    .gm-m-close {
        position: absolute;
        top: 0;
        right: 0;
        width: 200px;
        height: 80px;
        line-height: 80px;
        color: #fff;
        background: #000;
    }
    ul {
        position: absolute;
        top: 80px;
        right: 0px;
        width: 200px;
        height: 100%;
        background: rgb(0, 0, 0, 0.5);
        overflow-y: scroll;
        li {
            height: 80px;
            line-height: 80px;
            color: #fff;
        }
    }
}
</style>

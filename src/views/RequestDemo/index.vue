<template>
    <div class="requets-demo">
        <div class="requets-demo-btn">
            <mt-field class="btn-item" label="请求参" placeholder="请输入用户名" v-model="username"></mt-field>
            <p>sasdas</p>
            <mt-button class="btn-item" type="primary" @click="ceShiPhpHdl()">mock测试</mt-button>
        </div>
        <div class="ceshi">
            <div class="ceshi-y">

            </div>
        </div>

        <lazy-component @show="handler" tag="p">
            <img class="mini-cover" :src="src">
        </lazy-component>
    </div>
</template>
<script>
import request from "@/assets/request.js";
export default {
    name: "RequetsDemo",
    data() {
        return {
            username: "",
            src: require("../PageLu/images/swiper1.jpg")
        };
    },
    created() {
        // console.log(this.$Lazyload)
    },
    methods: {
        handler() {
            console.log(1)
        },
        ceShiPhpHdl() {
            request("/1.php", {
                data: { a: 1 }
            }).then(res => {
                console.log(res);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
.requets-demo-btn {
    .btn-item {
        display: block;
        margin: 0 auto;
        margin-top: 20px;
        width: 80%;
    }
}
.ceshi {
    width: 100%;
    height: 2800px;
    overflow-y: auto;
    background: rgba(11, 11, 11, .1);
    .ceshi-y {
        width: 80%;
        height: 1000px;
        background: rgba(11, 11, 11, .6);
    }
}
.mini-cover {
    width: 100px;
    height: 60px;
}
</style>
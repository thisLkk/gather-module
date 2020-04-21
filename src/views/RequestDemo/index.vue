<template>
    <div class="requets-demo">
        <div class="requets-demo-btn">
            <mt-field class="btn-item" label="请求参" placeholder="请输入用户名" v-model="username"></mt-field>
            <p>sasdas</p>
            <mt-button class="btn-item" type="primary" @click="ceShiPhpHdl()">mock测试</mt-button>
        </div>
    </div>
</template>
<script>
import request from "@/assets/request.js";
export default {
    name: "RequetsDemo",
    data() {
        return {
            username: ""
        };
    },
    created() {
    },
    methods: {
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
</style>
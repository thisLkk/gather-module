<template>
    <div class="requets-demo">
        <p>本地环境查看</p>
        <div class="requets-demo-btn">
            <mt-button class="btn-item" type="primary" @click="axiosMode1()">方式一(main.js配置)</mt-button>
            <span>描述：此方式在审查工具Network内是查看不到的。</span>
        </div>
        <div class="requets-demo-btn">
            <mt-button class="btn-item" type="primary" @click="axiosMode2()">方式二(vue.config.js配置)</mt-button>
            <span>描述：此方式在审查工具Network内是可以查看到的。</span>
        </div>
        <div class="requets-demo-btn">
            <mt-button class="btn-item" type="primary" @click="axiosMode3()">方式三(proxy属性配置)</mt-button>
            <span>描述：此方式在审查工具Network内是可以查看到的。</span>
        </div>
    </div>
</template>
<script>
import $http from "@/assets/request.js";
import apiConfig from "@/apiconfig.js";
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
        axiosMode1() {
            $http(apiConfig.apiDequestDemo, {
                data: { api: 1 }
            }).then(res => {
                console.log(res);
            });
        },
        axiosMode2() {
            $http(apiConfig.mockRequestDemo, {
                data: { mock: 1 }
            }).then(res => {
                console.log(res);
            });
        },
        // proxy 需要get请求
        axiosMode3() {
            $http(apiConfig.proxyRequestDemo, {
                data: { proxy: 1 },
                method: 'get'
            }).then(res => {
                console.log(res);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
p {
    margin: 40px;
}
.requets-demo-btn {
    overflow: hidden;
    padding: 0 20px 20px;
    margin-bottom: 40px;
    background: rgba(11, 11, 11, .06);
    .btn-item {
        display: block;
        margin: 20px auto;
        width: 80%;
    }
    span {
        font-size: $fontSize18;
    }
}
</style>
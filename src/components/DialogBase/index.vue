<template>
    <div class="dialog-base">
        <div class="dialog-main">
            <div class="dialog-header"></div>
            <div class="dialog-body">
                <slot></slot>
            </div>
            <div class="dialog-footer"></div>
            <div class="dialog-close" @click="btnColose">
                关闭
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "dialogBase",
    props: {
        show: {
            type: Boolean
        },
        close: {
            type: Function
        }
    },
    data() {
        return {
            username: ""
        };
    },
    created() {
    },
    methods: {
        btnColose() {
            this.close();
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
.dialog-base {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 100;
    .dialog-main {
        width: 630px;
        height: 500px;
        background: #fff;
        border-radius: 16px;
    }
}
</style>
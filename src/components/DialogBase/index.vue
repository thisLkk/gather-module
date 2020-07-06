<template>
    <div class="dialog-base">
        <div class="dialog-main">
            <div class="dialog-header">
                <slot name="header"></slot>
            </div>
            <div class="dialog-body">
                <slot name="body"></slot>
            </div>
            <div class="dialog-footer">
                <slot name="footer"></slot>
            </div>
            <div class="dialog-close" @click="onClose">
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
        title: {
            type: String
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
        onClose() {
            console.log(this.data)
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
        background: $bgColorWhite;
        border-radius: 16px;
    }
}
</style>
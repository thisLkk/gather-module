<template lang="pug">
    .dialog
        mt-button(
            class="btn-item",
            type="primary",
            @click="btnClickHdl(1)") 普通弹窗
</template>
<script>
export default {
    name: "Dialog",
    data() {
        return {
            show: false
        };
    },
    created() {
    },
    components: {
    },
    methods: {
        btnClickHdl() {
            console.log(this.$Dialog)
            this.$Dialog.show();
            // this.$Dialog.use('error',{title: "123"}).then(res => {
            //     console.log(res)
            // });
        },
        close() {
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
.dialog {

}
</style>
<template>
    <div class="dialog">
        <mt-button
            class="btn-item"
            type="primary"
            @click="btnClickHdl(1)"
        >打开弹窗</mt-button>
    </div>
</template>
<script>
import DialogBase from "@/components/DialogBase/index.vue";
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
        DialogBase
    },
    methods: {
        btnClickHdl() {
        //    this.show = true;
            this.$Dialog.use('error', {
                a: 2
            }).then(res => {
                console.log(111111)
            });
        },
        close() {
            // this.show = false;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
.dialog {

}
</style>
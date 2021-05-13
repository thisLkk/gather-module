<template lang="pug">
    .dialog
        mt-button(
            class="btn-item",
            type="primary",
            @click="btnClickHdl(1)") 普通弹窗
        <input type="text" placeholder="说些什么吧"  ref="input" />
</template>
<script>
export default {
    name: "Dialog",
    data() {
        // console.log(this);
        const self = this;
        return {
            show: false,
            props: ()=>{
                console.log(self);
            }
        };
    },
    created() {
    },
    mounted() {
    // console.log(self);
    this.props();
    this.$nextTick(() => {
      this.$refs.input.focus();
    });
  },
    components: {
    },
    methods: {
        btnClickHdl() {
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
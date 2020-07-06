<template lang="pug">
    dialog-base.error-dialog
        template(slot="footer")
            .btn.big.ok(@click='onOk') 确定
</template>
<script>
import DialogBase from "@/components/DialogBase/index.vue";
export default {
    name: "error",
    props: {
        title: {
            type: String
        }
    },
    data() {
        return {
            username1: ""
        };
    },
    created() {
    },
    components: {
        DialogBase
    },
    methods: {
        onOk() {
            this.$emit("confirm")
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
</style>
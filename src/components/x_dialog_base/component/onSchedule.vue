<template lang="pug">
        Dialog.m-dialig(v-model="visible")
            .content {{content}}
            //- template(slot="footer")
                //- .btn.big.ok(@click='onOk') 确定
</template>
<script>
import mixins from './mixin';
export default {
    mixins: [mixins],
    props: {
        content: ''
    },
    methods: {
        hdl() {
            this.visible = !this.visible;
            // on-visible-change
        }
    }
};
</script>
<style lang="less" scoped>
.content {
    text-align: center;
}
</style>
<template>
   <dialog-base class="error-dialog">
       <div>asd</div>
   </dialog-base>
</template>
<script>
import DialogBase from "@/components/DialogBase/index.vue";
export default {
    name: "error",
    props: {
        a: {
            type: Number
        }
    },
    data() {
        return {
            username1: ""
        };
    },
    created() {
        console.log(this.$props)
    },
    components: {
        DialogBase
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

</style>
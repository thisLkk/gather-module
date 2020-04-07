<template>
    <div class="jiugongge">
        抽奖页面
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        created() {
            console.log('-----------九宫格页面展示');
        },
        beforeDestroy() {
            console.log('-----------九宫格页面消失');
        }
    }
</script>
<style lang="scss" scoped>
@import '~@/assets/css/app.scss';
</style>
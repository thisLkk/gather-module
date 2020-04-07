<template>
    <div class="gm-footer">
        <p>寻昔时旧语,忆刹那繁华</p>
        <span>寻忆</span>
    </div>
</template>
<script>
export default {
    name: "Footer",
    components: {},
    data() {
        return {};
    },
    computed: {},
    mounted() {
    },
    methods: {
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
    .gm-footer {
        width: 100%;
        padding: 80px;
        text-align: center;
        box-sizing: border-box;
        p {
            color: $fontRoutine;
            font-size: $fontSize20;
            margin-bottom: 20px;
        }
        span {
            color: $fontSecondary;
            font-size: $fontSize18;
        }
    }
</style>

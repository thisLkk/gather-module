<template>
    <div class="gm-conformity">
        <ul class="gm-conformity-main" ref="gmul">
            <li class="gm-main-item" v-for="(item, index) in list" :key="index">
                <span>{{ item.title }}</span>
                <span>{{ item.details }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "Conformity",
    components: {},
    data() {
        return {
            timer: null
        };
    },
    props: {
        // 从众条数据
        list: {
            type: Array,
            default: []
        }
    },
    mounted() {
        // 设置定时器
        this.setAutoScroll();
    },
    beforeDestroy() {
        // 清空定时器
        clearInterval(this.timer);
    },
    methods: {
        // 执行动画zepto
        autoScroll(container) {
            let marginTopPx = $(".gm-conformity").height();
            $(container)
                .find("ul:first-child")
                .animate(
                    {
                        marginTop: `-${marginTopPx}px`
                    },
                    1000,
                    "linear",
                    function() {
                        $(this)
                            .css({
                                marginTop: "0px"
                            })
                            .find("li:first-child")
                            .appendTo(this);
                    }
                );
        },
        // 设置定时器
        setAutoScroll() {
            // 间隔执行的时间要大于动画的时间
            this.timer = setInterval(this.autoScroll, 3000, ".gm-conformity");
        }
    }
};
</script>
<style lang="scss" scoped>
.gm-conformity {
    font-size: 24px;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    position: relative;
    &-main {
        position: absolute;
        width: 100%;
    }
    .gm-main-item {
        display: flex;
        justify-content: space-between;
    }
}
</style>

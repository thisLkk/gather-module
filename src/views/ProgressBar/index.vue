<template>
    <div class="progress-bar">
        <h4>canvas进度条，由于是移动端<br>canvas的宽与高依赖父盒子的宽高</h4>
        <div class="gm-progress-canvas-box">
            <gm-progress-canvas
                :is-draw-text="isDrawText"
                :radius="radius"
                :line-width="lineWidth"
                :round-color="roundColor"
                :roundList="roundList"
            ></gm-progress-canvas>
        </div>
        <div class="jiugongge-btn">
            <mt-button
                class="btn-item"
                type="primary"
                @click="btnClickHdl(1)"
                :disabled="isDraw"
            >随机添加一个进度</mt-button>
        </div>
        <div class="jiugongge-btn">
            <mt-button
                class="btn-item"
                type="primary"
                @click="btnClickOne(2)"
            >重置为一个进度</mt-button>
        </div>
        <div class="jiugongge-btn">
            <mt-button
                class="btn-item"
                type="primary"
                @click="btnClickNum(2)"
            >点击一次每个进度+10</mt-button>
        </div>
    </div>
</template>
<script>
import gmProgressCanvas from "@/components/ProgressRound/index.vue";
export default {
    name: "ProgressBar",
    components: {
        gmProgressCanvas
    },
    data() {
        return {
            isDrawText: true,
            radius: 60,
            lineWidth: 30,
            roundColor: "#999999",
            roundList: [
                {
                    value: 10, // 满值为100
                    color: "red"
                },
                {
                    value: 20, // 3 99
                    color: "blue"
                }
            ],
            isDraw: false // 若是roundList的所有子集value相加除以roundList长度等于100；表示进度已完成
        };
    },
    created() {
    },
    methods: {
        btnClickHdl() {
            let colorList = ['#e6c47b', '#c99979', '#f8aba6', '#FFF0F5', '#F0FFFF'];
            let index = parseInt(7 * Math.random() - 1);
            let color =  colorList[Math.abs(index)] || '#e6c47b';
            this.roundList.push({
                value: index === 0 ? 1 * 10 : index * 10,
                color: color
            })
        },
        btnClickNum() {
            let num = 0;
            for (let index = 0; index < this.roundList.length; index++) {
                this.roundList[index].value += 10;
                if (this.roundList[index].value > 100) {
                    this.roundList[index].value = 100;
                }
                num += this.roundList[index].value;
                if (num / this.roundList.length === 100) {
                    this.isDraw = true;
                }
            }
        },
        btnClickOne() {
            this.isDraw = false;
            this.roundList = [
                {
                    value: 20,
                    color: 'blue'
                }
            ]
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
.gm-progress-canvas-box {
    margin: 0 auto;
    width: 400px;
    height: 400px;
    background: greenyellow;
}
h4 {
    padding: 30px 0;
    font-size: $fontSize28;
    text-align: center;
    line-height: 36px;
}
.jiugongge-btn {
    .btn-item {
        display: block;
        margin: 0 auto;
        margin-top: 20px;
        width: 80%;
    }
}
</style>
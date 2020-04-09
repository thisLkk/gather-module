<template>
    <div class="gm-progress-canvas">
        <canvas id="gm-canvas" :width="Width" :height="Height"></canvas>
    </div>
</template>
<script>
export default {
    name: "ProgressCanvas",
    props: {
        // 是否画中心区的%文字
        isDrawText: {
            type: Boolean,
            default: false
        },
        // 半径
        radius: {
            type: Number,
            default: 30
        },
        // 绘制的线宽度
        lineWidth: {
            type: Number,
            default: 10
        },
        // 圆环的底色
        roundColor: {
            type: String,
            default: '#666666'
        },
        // 进度条：总和 0 - 100
        // 可以提供多个色值的进度 
        roundList: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            Width: 0, // canvas的宽 依赖父盒子的宽
            Height: 0, // canvas的高 依赖父盒子的高
            X: 0, // 中心点x值
            Y: 0, // 中心点y值
            ctx: null, // canvas实例
            itemStatr: 0, // 每一个进度条的起始位置
            isDraw: false, // 当进度已100时不再绘制
        };
    },
    watch: {
        // 监听所有的props变化
        $props:{
            handler: function() {
                let num = 0;
                for (let index = 0; index < this.roundList.length; index++) {
                    // 每个进度大于100时赋值为100，表示完成
                    if (this.roundList[index].value > 100) {
                        this.roundList[index].value = 100;
                    } 
                    num += this.roundList[index].value;
                }
                if (!this.isDraw) {
                    this.drawFrame();
                }
                // 进度为100时上锁
                if (num / this.roundList.length === 100) {
                    this.isDraw = true;
                } else {
                    this.isDraw = false;
                    this.drawFrame();
                }
            },
            deep:true
        }
    },
    mounted() {
        this.Width = $('.gm-progress-canvas').width(); // 依赖父盒子定义的宽
        this.Height = $('.gm-progress-canvas').height(); // 依赖父盒子定义的高
        this.X = this.Width / 2;
        this.Y = this.Height / 2;
        this.ctx = document.getElementById("gm-canvas").getContext("2d") || null;
        var self = this;
        // 解决有时获取数据失败问题
        setTimeout(function() {
            self.drawFrame();
        }, 0);
    },
    methods: {
        // 执行总关
        drawFrame() {
            this.ctx.clearRect(0, 0, this.Width, this.Height); // 清空绘图区
            // 绘制底色圆环
            this.drawBottomRing(0, 100, this.roundColor);
            // 绘制进度条，可以绘制多个
            if (this.roundList.length > 0) {
                this.drawProgress(this.roundList);
            }
            if (this.isDrawText) {
                this.drawText(this.roundList);
            }
        },
        /**
         * 绘制圆环
         * @param {Number} start 起始点
         * @param {Number} end   结束点
         * @param {String} color 底色
         * @param {Number} scale 把360圆划分100份
         */
        drawBottomRing(start, end, color, scale = 100) {
            let angle = (Math.PI * 2) / scale;
            this.ctx.save();
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.beginPath();
            this.ctx.arc(this.X, this.Y, this.radius, start * angle, end * angle, false);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
        },
        /**
         * 绘制进度圆环
         * @param {Array} data 进度条集合
         */
        drawProgress(data) {
            for (var i = 0; i < data.length; i++) {
                // 计算起点
                this.itemStatr = 0;
                for (var j = 0; j < i; j++) {
                    this.itemStatr += data[j].value;
                }
                this.itemStatr /= data.length;
                this.drawBottomRing(this.itemStatr, this.itemStatr + data[i].value / data.length, data[i].color);
                this.itemStatr = this.itemStatr + data[i].value;
            }
        },
        /**
         * 绘制圆环中心的百分比
         * @param {Array} data 进度条集合
         */
        drawText(data) {
            // 计算总进度
            var t = 0;
            for (var i = 0; i < data.length; i++) {
                t += data[i].value;
            }
            t = t / data.length;
            t = t >= 100 ? 100 : t.toFixed(0);
            this.ctx.font="14px Verdana";
            this.ctx.fillText(t+'%', this.X - 16, this.Y + 6);
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
.gm-progress-canvas {
    width: 100%;
    height: 100%;
}
</style>
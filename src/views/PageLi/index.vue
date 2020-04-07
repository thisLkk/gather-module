<template>
    <div class="page-li">
        <div class="li-card" @touchend="touchEndHdl()" @touchstart="touchStartHdl()">
            <div
                class="li-card-item-box"
                v-for="(item, index) in cardOption"
                :class="item.animationClass"
                :key="index"
                :style="'z-index:' + item.boxIndex + ';'"
            >
                <div class="li-card-item" :class="item.bindTypeClass">
                    <div class="li-c-item-img">
                        <img :src="imgSrcHdl(item.listItem.imgsrc)" />
                    </div>
                    <div class="li-c-item-details">
                        <p>时间：
                            <span>{{item.listItem.time}}</span>
                        </p>
                        <p>空间：
                            <span>{{item.listItem.place}}</span>
                        </p>
                        <p>记录：
                            <span>{{item.listItem.details}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageLi",
    data() {
        return {
            // 接口数据的集合
            dataOption: [
                {
                    id: "1",
                    place: "北京市",
                    details: "说说你在思考什么",
                    time: "2019-11-22",
                    imgsrc: "1.jpg"
                },
                {
                    id: "2",
                    place: "北京市",
                    details: "你笑你最大",
                    time: "2019-11-23",
                    imgsrc: "2.jpg"
                },
                {
                    id: "3",
                    place: "北京市",
                    details: "黄昏与景不可缺一",
                    time: "2019-11-24",
                    imgsrc: "3.jpg"
                },
                {
                    id: "4",
                    place: "河南 | 周口",
                    details: "这是你做伴娘的照片吧",
                    time: "2019-11-25",
                    imgsrc: "4.jpg"
                },
                {
                    id: "5",
                    place: "北京市",
                    details: "清凉一夏，吃个西瓜",
                    time: "2019-11-26",
                    imgsrc: "5.jpg"
                },
                {
                    id: "6",
                    place: "北京市",
                    details: "这家伙很懒，什么都没留下",
                    time: "2019-11-27",
                    imgsrc: "6.jpg"
                }
            ],
            // 处理后接口数据集合
            cardOption: [],
            // 动画的属性集合
            animationOption: {
                startX: 0, // 手指的初始坐标
                startY: 0,
                boxIndex: 10000, // 卡片的层级
                activeIndex: 0 // 当前呈现视口卡片索引
            }
        };
    },
    created() {
        // 处理接口数据，填充动画所需属性数据
        this.dataOption.forEach((item, index) => {
            let boxIndex = this.animationOption.boxIndex - 1;
            let bindTypeClass = "threeScale";
            if (index == 0) {
                bindTypeClass = "oneScale";
            } else if (index == 1) {
                bindTypeClass = "twoScale";
            }
            this.cardOption.push({
                animationClass: "", // （向上向下）方向
                listItem: item, // 接口数据
                bindTypeClass: bindTypeClass, // 三个不同状态的缩放
                boxIndex: boxIndex // 每个元素绑定层级
            });
            this.animationOption.boxIndex = boxIndex;
        });
    },
    methods: {
        imgSrcHdl(data) {
            return require("./images/" + data);
        },
        // 手指开始时记录坐标
        touchStartHdl() {
            event.preventDefault();
            this.animationOption.startX = event.changedTouches[0].pageX;
            this.animationOption.startY = event.changedTouches[0].pageY;
        },
        // 手指离开时处理坐标
        touchEndHdl() {
            event.preventDefault();
            let moveEndX = event.changedTouches[0].pageX;
            let moveEndY = event.changedTouches[0].pageY;
            let X = moveEndX - this.animationOption.startX;
            let Y = moveEndY - this.animationOption.startY;
            if (Math.abs(Y) > Math.abs(X) && Y > 0) {
                console.log("top 2 bottom");
                this.toDownHdl();
            } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
                console.log("bottom 2 top");
                console.log(this.cardOption);
                this.toUpHdl();
            } else {
                console.log("just touch");
            }
        },
        // 下滑方法
        toDownHdl() {
            let idx = this.animationOption.activeIndex;
            let len = this.cardOption.length;
            // 当前为第一张卡片
            if (idx === 0) {
                return;
            }
            // 显示第三层卡片
            if (len - idx >= 3) {
                this.$set(
                    this.cardOption[idx + 2],
                    "bindTypeClass",
                    "threeScale"
                );
            }
            if (len - idx == 1) {
                this.$set(
                    this.cardOption[idx - 1],
                    "animationClass",
                    "downAnimation"
                );
                this.$set(this.cardOption[idx], "bindTypeClass", "twoScale");
            } else {
                this.$set(
                    this.cardOption[idx - 1],
                    "animationClass",
                    "downAnimation"
                );
                this.$set(this.cardOption[idx], "bindTypeClass", "twoScale");
                this.$set(
                    this.cardOption[idx + 1],
                    "bindTypeClass",
                    "threeScale"
                );
            }
            this.animationOption.activeIndex = idx - 1;
        },
        toUpHdl() {
            let idx = this.animationOption.activeIndex;
            let len = this.cardOption.length;
            if (idx + 1 == len) {
                return;
            }
            if (len - idx >= 4) {
                this.$set(
                    this.cardOption[idx + 3],
                    "bindTypeClass",
                    "threeScale"
                );
            }
            if (len - idx == 2) {
                this.$set(
                    this.cardOption[idx],
                    "animationClass",
                    "upAnimation"
                );
                this.$set(
                    this.cardOption[idx + 1],
                    "bindTypeClass",
                    "oneScale"
                );
            } else {
                this.$set(
                    this.cardOption[idx],
                    "animationClass",
                    "upAnimation"
                );
                this.$set(
                    this.cardOption[idx + 1],
                    "bindTypeClass",
                    "oneScale"
                );
                this.$set(
                    this.cardOption[idx + 2],
                    "bindTypeClass",
                    "twoScale"
                );
            }
            this.animationOption.activeIndex = idx + 1;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
.page-li {
    position: relative;
    width: 100%;
    padding: 40px;
    padding-bottom: 80px;
    box-sizing: border-box;
    height: calc(100vh - 80px);
    overflow: hidden;
    .li-card {
        height: 100%;
        position: relative;
        perspective: 1600; // 3d透视点
        .li-card-item-box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: calc(100%);
            border-radius: 24px;
            transform-style: preserve-3d;
            transform: scale3d(1, 1, 1);
            opacity: 1;
            z-index: auto;
            .li-card-item {
                width: 100%;
                height: 100%;
                position: relative;
                overflow: hidden;
                border-radius: 6px;
                background-color: $colorSpare5;
                box-shadow: 0 2px 12px 0 rgba(39, 49, 64, 0.2);
                transition: transform 0.5s ease, opacity 0.5s ease 0.5s;

                .li-c-item-img {
                    margin: 65px auto;
                    margin-bottom: 0;
                    width: 540px;
                    height: 660px;
                    background: $colorSpare5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    img {
                        display: inline-block;
                        width: 100%;
                        margin: 0 auto;
                    }
                }
                .li-c-item-details {
                    position: absolute;
                    bottom: 0;
                    left: 25px;
                    padding: 0 40px;
                    padding-bottom: 20px;
                    font-size: $fontSize26;
                    p {
                        margin-bottom: 20px;
                        span {
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
}
// 实现卡片叠压
// 一级不缩放
.oneScale {
    transform: translateY(0) scale3d(1, 1, 1);
}
// 二级缩放
.twoScale {
    transform: translateY(50px) scale3d(0.96, 0.96, 0.96);
}
// 三级缩放
.threeScale {
    transform: translateY(100px) scale3d(0.92, 0.92, 0.92);
}
// 向上滑动的动画（translateY的值为当前屏幕高减小3~10px）
.upAnimation {
    transform-origin: 50% 100%;
    animation: upAnimation 0.6s ease forwards;
}

@keyframes upAnimation {
    0% {
        transform: translateY(0) scale3d(1, 1, 1);
    }

    100% {
        transform: translateY(-1230px) scale3d(1, 1, 1);
    }
}
// 向下滑动的动画
.downAnimation {
    transform-origin: 50% 0;
    animation: downAnimation 0.6s ease forwards;
}

@keyframes downAnimation {
    0% {
        transform: translateY(-1230px) scale3d(1, 1, 1);
    }

    100% {
        transform: translateY(0) scale3d(1, 1, 1);
    }
}
</style>
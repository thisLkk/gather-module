<template>
    <div class='luckpage'>
        <jiugonggeLottery
            :lotteryList='opt.data'
            :buttonClickable='buttonClickable'
            :attributeOption='attributeOption'
            :resultInfo='resultInfo'
            :onFirstClick ='onFirstClick'
            :onNonClickable ='onNonClickable'
            :onFinished ='onFinished'
        >
            <div class="ceshi1" :class="{'active': !buttonClickable}">
                <div class="btn"></div> 点击抽奖
                <div class="qibao"></div> 九宫格
            </div>
        </jiugonggeLottery>
    </div>
</template>

<script>
import jiugonggeLottery from "@/components/PrizeJiu/index.vue";
/* global Agent */
export default {
    metaInfo: {
        title: "luckpage",
        titleTemplate: chunk => {
            Agent && Agent.setTitle(chunk);
            return chunk;
        }
    },
    components: {
        jiugonggeLottery
    },
    data() {
        return {
            opt: {
                data: [
                    {
                        title: "1",
                        type: "A",
                        image: require("./demoImages/lucky1.png")
                    },
                    {
                        title: "2",
                        type: "B",
                        image: require("./demoImages/lucky2.png")
                    },
                    {
                        title: "3",
                        type: "C",
                        image: require("./demoImages/lucky3.png")
                    },
                    {
                        title: "4",
                        type: "D",
                        image: require("./demoImages/lucky4.png")
                    },
                    {
                        title: "5",
                        type: "E",
                        image: require("./demoImages/lucky5.png")
                    },
                    {
                        title: "6",
                        type: "F",
                        image: require("./demoImages/lucky6.png")
                    },
                    {
                        title: "7",
                        type: "G",
                        image: require("./demoImages/lucky7.png")
                    },
                    {
                        title: "8",
                        type: "D",
                        image: require("./demoImages/lucky4.png")
                    }
                ]
            },
            messageOption: {
                status: '活动已结束1'
            },
            buttonClickable: true,
            resultInfo: {},
            attributeOption: {
                mainStyle: {
                    width: 0,
                    height: '500',
                    // background: '#fff',
                },
                squaresStyle: {
                    width: 180,
                    height: 150,
                    fontSize: 24,
                    color: 'blue',
                    fontWeight: 400,
                    top: 120,
                    background: `url(${require("./demoImages/luck-active.png")}) center center no-repeat`,
                    backgroundActive: `url(${require("./demoImages/getLuck-bg.png")}) center center no-repeat`
                }
            }
        };
    },
    methods: {
        onFirstClick(data) {
            console.log(data);
            this.buttonClickable = false;
            setTimeout(() => {
                this.resultInfo = {
                    status: 0,
                    title: "7",
                    type: "G",
                    image: require("./demoImages/lucky1.png")
                }
            }, 3000);
        },
        onNonClickable(data) {
            console.log(data);
        },
        onFinished(data) {
            this.buttonClickable = true
            console.log(data);
        }
    }
};
</script>
<style lang="scss" scoped>
.luckpage {
    color: red;
}
.ceshi1 {
    color: #fff;
    width: 100%;
    height: 100%;
    background: blue;
    &.active {
        background: red;
    }
}
</style>
<template>
    <div class="gm-prize-jiu">
        <div class="gm-jiu-main">
            <ul class="gm-jiu-main-ul">
                <li class="gm-jiu-item" :class="currentLocation === 0 ? `active` : ``">
                    <img :src="contentList[0].url" alt="">
                    <p>{{contentList[0].name}}</p>
                </li>
                <li class="gm-jiu-item" :class="currentLocation === 1 ? `active` : ``">
                    <img :src="contentList[1].url" alt="">
                    <p>{{contentList[1].name}}</p>
                </li>
                <li class="gm-jiu-item" :class="currentLocation === 2 ? `active` : ``">
                    <img :src="contentList[2].url" alt="">
                    <p>{{contentList[2].name}}</p>
                </li>
                <li class="gm-jiu-item" :class="currentLocation === 7 ? `active` : ``">
                    <img :src="contentList[7].url" alt="">
                    <p>{{contentList[7].name}}</p>
                </li>
                <li class="gm-jiu-item getLuck" :class="cLuckBtn" @click='startLottery'>
                    {{cBtnTitle}}
                </li>
                <li class="gm-jiu-item" :class="currentLocation === 3 ? `active` : ``">
                    <img :src="contentList[3].url" alt="">
                    <p>{{contentList[3].name}}</p>
                </li>
                <li class="gm-jiu-item" :class="currentLocation === 6 ? `active` : ``">
                    <img :src="contentList[6].url" alt="">
                    <p>{{contentList[6].name}}</p>
                </li>
                <li class="gm-jiu-item" :class="currentLocation === 5 ? `active` : ``">
                    <img :src="contentList[5].url" alt="">
                    <p>{{contentList[5].name}}</p>
                </li>
                <li class="gm-jiu-item" :class="currentLocation === 4 ? `active` : ``">
                    <img :src="contentList[4].url" alt="">
                    <p>{{contentList[4].name}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PrizeJiu',
        data() {
            return {
                // 当前位置
                currentLocation: -1,
                // 中奖位置
                prizePos: -1,
                // 位置总数
                posCount: 8,
                // 转动定时器
                timer: null,
                // 初始转动速度
                speed: 200,
                // 当前转动次数
                currentTimes: 0,
                // 转动基本次数：即至少需要转动多少次再进入抽奖环节
                basicTimes: 50,
                // 抽奖结果数据
                luckResultData: {},
                // 是否正在抽奖
                isBtnClick: false
            }
        },
        props: {
            // 判断是否可点
            isClick: {
                type: Boolean,
                default: false
            },
            // 每一个格内容
            contentList: {
                type: Array,
                default: []
            },
            // 中奖的编号
            luckState: {
                type: String,
                default: ''
            }
        },
        mounted() {
        },
        computed: {
            // 抽奖按钮背景状态
            cLuckBtn() {
                // 正在抽奖
                if (this.isBtnClick) {
                    return 'active';
                }
                // 可以抽奖
                if (this.isClick) {
                    return '';
                }
                // 默认不可以抽奖
                return 'noactive';
            },
            // 不同状态下的按钮文案,默认有点击抽奖文案为了解决接口返回慢时的展示
            cBtnTitle() {
                if (this.isBtnClick) {
                    return '正在抽奖'
                } else {
                    return '点击抽奖';
                }
            },
        },
        methods: {
            /**
             * 开始抽奖
             *
             */
            startLottery() {
                // 抽奖进行中按钮不可点击，不能进行抽奖
                if (this.isBtnClick) {
                    return true;
                }
                // 不满足抽奖条件
                if (!this.isClick) {
                    this.$emit('errorEmit');
                    return;
                }
                this.speed = 200;
                this.isBtnClick = true;
                this.currentLocation = -1;
                this.startRoll();
                // 发送抽奖接口请求
                this.$emit('getDataEmit');
            },
            /**
             * 开始转动
             *
             */
            startRoll() {
                // 转动次数
                this.currentTimes += 1;
                this.oneRoll();
                // 抽奖接口异常
                if (this.luckState === 'error') {
                    this.clearTimeoutHdl(this.timer);
                    this.currentLocation = -1;
                    this.$emit('errorEmit');
                    return;
                }
                // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
                if ((this.currentTimes > this.basicTimes + 10 && this.prizePos === this.currentLocation)) {
                    // 清除转动定时器，停止转动
                    this.clearTimeoutHdl(this.timer);
                    let self = this;
                    setTimeout(function(){
                        self.$emit('successEmit');
                    }, 300)
                }
                else {
                    if (this.currentTimes < this.basicTimes) {
                        // 加快转动速度
                        this.speed -= 10;
                    }
                    // 判断中奖结果
                    else if (this.currentTimes === this.basicTimes) {
                        // 依据数据返回结果来判断是否中奖；接口若未返回继续转动
                        // 若这个字段返回错误会在上面进行拦截
                        if (this.luckState) {
                            this.prizePos = this.countPos(this.luckState)
                        } else {
                            this.currentTimes = this.currentTimes - this.posCount;
                        }
                    }
                    else if (this.currentTimes > this.basicTimes + 10 && ((this.prizePos === 0 && this.currentLocation === 7) || this.prizePos === this.currentLocation + 1))
                    {
                        this.speed += 110;
                    }
                    else {
                        this.speed += 20;
                    }
                    if (this.speed < 40) {
                        this.speed = 40;
                    }
                    this.timer = setTimeout(this.startRoll, this.speed);
                }
            },
            /**
             * 通用的重置字段属性的方法
             */
            clearTimeoutHdl() {
                clearTimeout(this.timer);
                this.prizePos = -1;
                this.currentTimes = 0;
                this.isBtnClick = false;
            },
            /**
             * 每一次转动数据变化
             *
             */
            oneRoll() {
                // 当前转动到哪个位置
                let index = this.currentLocation;
                // 总共有多少个位置
                const posCount = this.posCount;
                index += 1;
                if (index > posCount - 1) {
                    index = 0;
                }
                this.currentLocation = index;
            },
            /**
             * 计算当前应该停在哪个位置
             *
             */
            countPos(type) {
                let pos = -1;
                switch(type) {
                    case 'A':
                        pos = 0;
                        break;
                    case 'B':
                        pos = 1;
                        break;
                    case 'C':
                        pos = 2;
                        break;
                    case 'D':
                        pos = 3;
                        break;
                    case "E":
                        pos = 4;
                        break;
                    case "F":
                        pos = 5;
                        break;
                    case 'G':
                        pos = 6;
                        break;
                    case 'H':
                        pos = 7;
                        break;
                    default:
                        break;
                }
                return pos;
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '~@/assets/css/app.scss';
    .gm-prize-jiu{
        .gm-jiu-main {
            margin: auto;
            width: 606px;
            padding-top: 13px;
            .gm-jiu-main-ul {
                width: 100%;
                height: 420px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                .gm-jiu-item {
                    position: relative;
                    text-align: center;
                    width: 195px;
                    height: 130px;
                    background: $colorSpare2;
                    overflow: hidden;
                    img {
                        display: inline-block;
                        margin-top: 10px;
                        width: 120px;
                        height: 80px;
                    }
                    p {
                        font-size: $fontSize20;
                        color: $colorMain2;
                        font-weight: bold;
                        transform: scale(0.83) translateY(-0.2rem);
                        margin-top: 14px;
                    }
                    &.active {
                        background: $colorSpare1;
                        p {
                            color: $colorMain1;
                        }
                    }
                }
                .getLuck {
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: $fontSize28;
                    font-weight: bold;
                    background: $colorMain5;
                    &.active {
                        background: $colorMain1;
                        color: $fontWhite;
                    }
                    &.noactive {
                        color: $fontWhite;
                        background: $fontSecondary;
                    }
                }
            }
        }
    }
@keyframes luck_animation {
    0% {
        left: -100%;
    }
    20% {
        left: -80%;
    }
    60% {
        left: 60%;
    }
    100% {
        left: 100%;
    }

}
</style>

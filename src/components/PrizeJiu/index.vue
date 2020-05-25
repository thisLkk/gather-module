<template>
    <div class="jiugongge-lottery"
        v-if="prizeData.length === 9"
        :style="lotteryStyle"
    >
        <ul>
            <div v-for="(item, index) in prizeData" :key="index">
                <li
                    class="lottery-item"
                    v-if="item.isBotton"
                    :class="bottonClass"
                    :style="`width: ${item.width};height: ${item.height};`"
                    @click='startLottery'>
                        <slot>点击抽奖</slot>
                </li>
                <li v-else 
                    class="lottery-item"
                    :class="{'lottery-item-active': +currentIndex === +item.index}"
                    :style="+currentIndex === +item.index ? item.styleActive : item.style"
                    >
                        <img :src="item.image" alt="">
                        <p v-show="item.title" :style="`top: ${item.top};`">
                            {{item.title}}
                        </p>
                </li>
            </div>
        </ul>
    </div> 
</template>
<script>
export default {
    name: "jiugonggeLottery",
    props: {
        // 数据装载
        lotteryList: {
            type: Array,
            required: true
        },
        // 按钮是否可点击
        buttonClickable: {
            type: Boolean,
            required: true
        },
        // 属性配置项
        attributeOption: {
            type: Object,
            default: ()=> ({})
        },
        // 中奖的信息
        resultInfo: {
            type: Object,
            required: true,
            default: ()=> ({})
        },
        // 第一次点击时触发
        onFirstClick: {
            type: Function,
            required: true
        },
        // 不可点击时触发
        onNonClickable: {
            type: Function,
        },
        // 不可点击时触发
        onFinished: {
            type: Function,
        },
    },
    data() {
        return {
            // rem
            widths: '',
            // 方格总数
            squaresCount: 8,
            // 当前方格转动的位置
            currentIndex: -1,
            // 中奖方格的位置（由父组件提供）
            prizeSquares: -1,
            // 转动基本次数
            basicTimes: 50,
            // 当前转动次数
            currentTimes: 0,
            // 转动定时器
            timer: null,
            // 初始转动速度（毫秒）
            speed: 0,


            /**
             * 依赖props---中奖的数据配置
             * @param {String}  status    奖品的名称
             *                       status：0 中奖的结果标示（中奖、未中奖（有谢谢参与））
             *                       status：1 中奖的结果标示（未中奖（没有谢谢参与）或者报错）
             * @param {String}  title      奖品的名称
             * @param {String}  type      奖品的类别 用于停止到中奖位置
             * @param {String}  image    奖品的图片
             */
            resultData: {},
            /** 
             * 依赖props.attributeOption---属性配置信息
             * @param {Object}  mainStyle 整体组件的大小
             *  width  宽度
             *  height 高度度
             *  background 背景色
             */
            mainStyle: {
                width: '20.9375rem',
                height: '16.25rem',
                background: ''
            },
            /** 
             * 依赖props.attributeOption---属性配置信息
             * @param {Object}  squaresStyle 每个方格的属性，不包括背景图片
             *  width  宽度
             *  height 高度度
             *  fontSize 文字大小
             *  top 位置
             */
            squaresStyle: {
                width: '6.5625rem',
                height: '5rem',
                fontSize: '0.75rem',
                top: '3.75rem',
                fontWeight: 700
            }
        };
    },
    computed:{
        /**
         * 数据配置
         * @param {Number} index 用于dom转动时匹配选中的位置
         * @param {String} title      奖品的名称
         * @param {String} type      奖品的类别
         * @param {String} image    奖品的图片
         */
        prizeData() {
            let list = [];
            let data = JSON.parse(JSON.stringify(this.$props.lotteryList));
            if (data.length !== 8) {
                throw 'props: data 传入的数据不是8条';
            }
            // 重置顺序 (data 总长为8,传入的就是拍好的顺序，需要用代码实现)
            // data [A, B, C, D, E, F, G, H]
            // 期望排序 num (dom[index]) (data[index])
            // 以 H 位置解读 
            // H 的位置 在dom中为        [3];
            // H 的位置 在data中的下标为 [7];
            // A  (0) (0)    B  (1) (1)    C  (2) (2)
            // H  (3) (7)                  D  (4) (3)
            // G  (5) (4)    F  (6) (5)    E  (7) (6)
            // 对应关系
            data.forEach((item, idx) => {
                switch (idx) {
                    case 3:
                        list.push({...data[7], index: 7});
                        break;
                    case 4:
                        list.push({...data[3], index: 3});
                        break;
                    case 5:
                        list.push({...data[6], index: 6});
                        break;
                    case 6:
                        list.push({...data[5], index: 5});
                        break;
                    case 7:
                        list.push({...data[4], index: 4});
                        break;
                
                    default:
                        list.push(Object.assign(item, {index: idx}));
                        break;
                }
            })
            // 插入点击按钮
            list.splice(4, 0, {
                isBotton: true
            })
            // 设置方格的样式
            let newList = [];
            let style = `width: ${this.squaresStyle.width};
                        height: ${this.squaresStyle.height}; 
                        font-size: ${this.squaresStyle.fontSize};
                        font-weight: ${this.squaresStyle.fontWeight};
                        color: ${this.squaresStyle.color};
                        background: ${this.squaresStyle.background};`;
            let styleActive = style + `background: ${this.squaresStyle.backgroundActive};`;
            list.forEach(item=> {
                newList.push({...item, 
                    width: this.squaresStyle.width,
                    height: this.squaresStyle.height,
                    style: style,
                    styleActive: styleActive,
                    top: this.squaresStyle.top,
                })
            })
            return newList;
        },
        // 点击按钮的class状态
        bottonClass() {
            let text = 'lottery-item-btn';
            if (!this.buttonClickable) {
                text += ' lottery-click-btn-active';
            }
            return text;
        },
        // 主盒子的style属性
        lotteryStyle() {
            let style = `width: ${this.mainStyle.width};height: ${this.mainStyle.height};background: ${this.mainStyle.background};`;
            return style;
        }
    },
    watch: {
        // 监听中奖信息
        'resultInfo': {
            handler: function(newValue) {
                this.resultData = JSON.parse(JSON.stringify(newValue));
                if (+this.resultData.status === 0) {
                    if (!this.resultData.type) {
                        throw '中奖信息：缺少类别';
                    }
                }
            },
            deep: true,
            immediate: true
        },
        // 监听传入的属性信息
        'attributeOption': {
            handler: function(newValue) {
                let rem = 375/750/16; // 前提设计稿是750,用于设置行内的rem
                this.attributeOptionData = JSON.parse(JSON.stringify(newValue));
                let mainStyle = this.attributeOptionData.mainStyle;
                let squaresStyle = this.attributeOptionData.squaresStyle;
                // 设置主盒子的style
                if (mainStyle) {
                    this.mainStyle.width = mainStyle.width ? mainStyle.width*rem + 'rem' : '20.9375rem';
                    this.mainStyle.height = mainStyle.height ? mainStyle.height*rem + 'rem' : '16.25rem';
                    this.mainStyle.background = mainStyle.background ? mainStyle.background : '';
                    // 传入的是图片
                    if (mainStyle.backgroundImage) {
                        this.mainStyle.background = mainStyle.backgroundImage ;
                    }
                }
                // 设置每一个方格的style
                if (squaresStyle) {
                    this.squaresStyle.width = squaresStyle.width ? squaresStyle.width*rem + 'rem' : '6.5625rem';
                    this.squaresStyle.height = squaresStyle.height ? squaresStyle.height*rem + 'rem' : '5rem';
                    this.squaresStyle.fontSize = squaresStyle.fontSize ? squaresStyle.fontSize*rem + 'rem' : '0.75rem';
                    this.squaresStyle.color = squaresStyle.color ? squaresStyle.color : '';
                    this.squaresStyle.top = squaresStyle.top ? squaresStyle.top*rem + 'rem' : '0';
                    this.squaresStyle.background = squaresStyle.background ? squaresStyle.background : '';
                    this.squaresStyle.backgroundActive = squaresStyle.backgroundActive ? squaresStyle.backgroundActive : '';
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        /**
         * 开始抽奖
         *
         */
        startLottery() {
            // 正在抽奖中禁止点击
            if (!this.buttonClickable) {
                this.errorHdl(400);
                return;
            }
            this.speed = 240;
            this.startRoll();
            this.successHdl(200); // 通知调用方开始抽奖
        },
        /**
         * 开始转动
         *
         */
        startRoll() {
            this.currentTimes += 1; // 转动的总次数
            this.everyTimeRoll(); // 转动
            // 1.     当前转动次数达到预定的次数（+10次处理确定中奖后的过渡效果）
            // 2.且   目前转到的方格是中奖方格的位置
            if (
                this.currentTimes > this.basicTimes + 10 &&
                this.prizeSquares === this.currentIndex
            ) {
                this.successHdl(201);
                return;
            }
            // 容错处理
            // 依赖调用方是否传入中奖信息,当调用方未传入中奖信息时执行
            if (this.prizeSquares === 401) {
                this.errorHdl(401);
                return;
            }
            // 未达到预期的转动次数时，转动速度慢慢加快
            if (this.currentTimes < this.basicTimes) {
                this.speed -= 10;
            }
            // 此处是重要区域，只有此时才会去验证是否有中奖信息
            // 达到预期的转动次数时，确定父组件是否把中奖的信息返回
            else if (this.currentTimes === this.basicTimes) {
                // 中奖信息有返回处理中奖结果
                if (+this.resultData.status > -1) {
                    this.formatResult(); // 处理中奖信息结果
                }
                // 接口还没返回多转一圈
                else {
                    this.currentTimes = this.currentTimes - this.squaresCount;
                }
            }
            // 转动次数慢慢减缓
            // 1.超过预期的转动次数时 且
            // 2.1      中奖的方格位置是第一个方格 且 当前转动的方格在最后一个；
            // 2.2 或者 中奖的方格位置
            //      加快减缓
            // 否则 稍快正常减缓
            else if (
                this.currentTimes > this.basicTimes + 10 &&
                ((this.prizeSquares === 0 && this.currentIndex === 7) ||
                this.prizeSquares === this.currentIndex + 1)
            ) {
                this.speed += 110;
            }
            else {
                this.speed += 20;
            }
            // 最快速度
            if (this.speed < 70) {
                this.speed = 70;
            }
            // 转动定义
            this.timer = setTimeout(this.startRoll, this.speed);
        },
        /**
         * 每一次转动数据变化
         * 改变dom元素的背景色，达到转动视觉效果
         */
        everyTimeRoll() {
            this.currentIndex ++;
            // dom索引从0开始,转动8次为一周期,需要从0继续开始转动
            if (this.currentIndex > this.squaresCount - 1) {
                this.currentIndex = 0;
            }
        },
        /**
         * 处理中奖结果 只有这两种状态
         * @param {Number} status  0: 含有谢谢参与(中奖、未中奖)
         *                         1：没有谢谢参与（未中奖、或者报错） 需要额外处理方格的位置
         * @param {Number} type 依据此字段计算出中奖位置
         */
        formatResult() {
            let data = this.resultData;
            switch (+data.status) {
                case 0:
                    let prizeObj = this.prizeData.filter(res => {
                        return res.type == data.type;
                    });
                    this.prizeSquares = prizeObj[0].index;
                    break;
                case 1:
                    this.prizeSquares = 401; // 容错的位置
                    break;
            
                default:
                    break;
            }
        },
        /**
         * 成功的方法集合
         */
        successHdl(type) {
            switch (+type) {
                // 点击抽奖按钮、上锁前
                case 200:
                    this.onFirstClick();
                    break;
                case 201:
                    // 中奖结果回传
                    this.clearTimeoutHdl();
                    this.onFinished({
                            resultInfo: this.resultData
                        });
                    break;
            
                default:
                    break;
            }
        },
        /**
         * 失败方法的集合
         */
        errorHdl(type) {
            switch (+type) {
                // 按钮不可点击
                case 400:
                    this.onNonClickable	({
                        type: 400,
                        message: '按钮不可点击'
                    });
                    break;
                // 其他错误 未接收到中奖信息或其他错误
                case 401:
                    this.clearTimeoutHdl();
                    this.onFinished({
                            resultInfo: this.resultData
                        });
                    this.currentIndex = -1;
                    break;

                default:
                    break;
            }
        },
        clearTimeoutHdl() {
            clearTimeout(this.timer); // 清除转动定时器，停止转动
            this.prizeSquares = -1;   // 初始化中奖方格的位置
            this.currentTimes = 0;    // 初始化转动次数
        }
    }
};
</script>

<style lang="scss">
.jiugongge-lottery {
    font-weight: 400;
    width: 600px;
    height: 520px;
    background-size: contain;
    margin: 0 auto;
    ul {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        box-sizing: border-box;
        .lottery-item {
            position: relative;
            text-align: center;
            width: 210px;
            height: 160px;
            font-size: 24px;
            background: rgba(255, 217, 0, 0.911);
            background-size: contain !important;
            &.lottery-item-active {
                background: rgb(255, 166, 0);
                background-size: contain !important;
            }
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            p {
                position: absolute;
                width: 100%;
                text-align: center;
            }
        }
        .lottery-item-btn {
            background: orange;
            background-size: 100%;
            background-repeat: no-repeat;
            position: relative;
            font-size: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:active {
                opacity: 0.8;
            }
            &.lottery-click-btn-active {
                background: #666;
            }
        }
    }
}
</style>

<template>
    <div class="jiugongge">
        <gm-prize-jiu
            :is-click="prizeJiuOpt.isClick"
            :content-list="prizeJiuOpt.contentData"
            :luck-state="luckState"
            @successEmit="successEmit"
            @getDataEmit="getDataEmit"
            @errorEmit="errorEmit"
        ></gm-prize-jiu>
        <div class="jiugongge-btn">
            <mt-button class="btn-item" :disabled='btnDisabled' type="primary" @click="getIndexInfo(1)">按钮可点击 | 只可抽一次 | 命中第一个</mt-button>
            <mt-button class="btn-item" :disabled='btnDisabled' type="primary" @click="getIndexInfo(111)">按钮可点击 | 可抽二次 | 命中第二个</mt-button>
            <mt-button class="btn-item" :disabled='btnDisabled' type="primary" @click="getIndexInfo(11)">按钮可点击 | 不中奖 | 抽奖接口异常</mt-button>
            <mt-button class="btn-item" :disabled='btnDisabled' type="primary" @click="getIndexInfo(2)">按钮不可点击 | 活动已结束 | 首页接口</mt-button>
            <mt-button class="btn-item" :disabled='btnDisabled' type="primary" @click="getIndexInfo(3)">按钮不可点击 | 活动异常 | 首页接口</mt-button>
            <mt-button class="btn-item" :disabled='btnDisabled' type="primary" @click="getIndexInfo()">清空状态</mt-button>
        </div>
    </div>
</template>
<script>
import gmPrizeJiu from "@/components/PrizeJiu/index.vue";
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            // 抽奖组件的配置
            prizeJiuOpt: {
                isClick: false, // 此状态可以根据活动状态与用户状态控制
                contentData: [
                    {
                        name: "1",
                        url:
                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586336120393&di=325201dc2887ebf990c37cf4230eac1e&imgtype=0&src=http%3A%2F%2Fimg41.nipic.com%2F20130111%2F11596169_103654354311_1.jpg"
                    },
                    {
                        name: "2",
                        url:
                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586336120393&di=325201dc2887ebf990c37cf4230eac1e&imgtype=0&src=http%3A%2F%2Fimg41.nipic.com%2F20130111%2F11596169_103654354311_1.jpg"
                    },
                    {
                        name: "3",
                        url:
                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586336120393&di=325201dc2887ebf990c37cf4230eac1e&imgtype=0&src=http%3A%2F%2Fimg41.nipic.com%2F20130111%2F11596169_103654354311_1.jpg"
                    },
                    {
                        name: "4",
                        url:
                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586336120393&di=325201dc2887ebf990c37cf4230eac1e&imgtype=0&src=http%3A%2F%2Fimg41.nipic.com%2F20130111%2F11596169_103654354311_1.jpg"
                    },
                    {
                        name: "5",
                        url:
                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586336120393&di=325201dc2887ebf990c37cf4230eac1e&imgtype=0&src=http%3A%2F%2Fimg41.nipic.com%2F20130111%2F11596169_103654354311_1.jpg"
                    },
                    {
                        name: "6",
                        url:
                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586336120393&di=325201dc2887ebf990c37cf4230eac1e&imgtype=0&src=http%3A%2F%2Fimg41.nipic.com%2F20130111%2F11596169_103654354311_1.jpg"
                    },
                    {
                        name: "7",
                        url:
                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586336120393&di=325201dc2887ebf990c37cf4230eac1e&imgtype=0&src=http%3A%2F%2Fimg41.nipic.com%2F20130111%2F11596169_103654354311_1.jpg"
                    },
                    {
                        name: "8",
                        url:
                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586336120393&di=325201dc2887ebf990c37cf4230eac1e&imgtype=0&src=http%3A%2F%2Fimg41.nipic.com%2F20130111%2F11596169_103654354311_1.jpg"
                    }
                ] // 必须是8个
            },
            // 首页接口的数据存储
            indexInfo: {},
            // 抽奖接口的数据存储
            luckInfo: {},
            // 抽奖组件的props
            luckState: "",
            // 模拟不同接口下的提示，实际项目中不依赖
            mockLuckState: 0,
            btnDisabled: false
        };
    },
    components: {
        gmPrizeJiu
    },
    created() {
        console.log("-----------九宫格页面展示");
    },
    beforeDestroy() {
        console.log("-----------九宫格页面消失");
    },
    methods: {
        // 此处是模拟首页的数据接口影响抽奖是否可点击
        getIndexInfo(type) {
            this.btnDisabled = true;
            if (type === 1) {
                // 首页接口正常状态 模拟对应ajax的scuuess回调 只中一次奖
                this.indexInfo = {
                    result: 0,
                    content: {
                        info: "",
                        luck_number: 1
                    }
                };
                this.mockLuckState = 1;
                this.prizeJiuOpt.isClick = true;
            } else if (type === 11) {
                // 首页接口正常状态 抽奖接口异常
                this.indexInfo = {
                    result: 0,
                    content: {
                        info: "",
                        luck_number: 1
                    }
                };
                this.mockLuckState = 11;
                this.prizeJiuOpt.isClick = true;
            } else if (type === 111) {
                // 首页接口正常状态 活动结束
                this.indexInfo = {
                    result: 0,
                    content: {
                        info: "",
                        luck_number: 2
                    }
                };
                this.mockLuckState = 111;
                this.prizeJiuOpt.isClick = true;
            } else if (type === 2) {
                // 首页接口正常状态 活动结束
                this.indexInfo = {
                    result: 5005,
                    content: {
                        info: "活动已结束~"
                    }
                };
                this.mockLuckState = 2;
                this.prizeJiuOpt.isClick = false;
            } else if (type === 3) {
                // 首页接口正常状态 异常容错
                this.indexInfo = {
                    result: 10086,
                    content: {
                        info: "首页接口异常"
                    }
                };
                this.mockLuckState = 3;
                this.prizeJiuOpt.isClick = false;
            }else {
                this.luckInfo = {};
                this.indexInfo = {};
                this.mockLuckState = 0;
                this.luckState = '';
                this.prizeJiuOpt.isClick = false;
            }
        },
        // 弹窗展示
        showDialogHdl() {
            if (this.luckInfo.result === 0) {
                MessageBox('提示', this.luckInfo.content.info);
            } else if (this.indexInfo.result === 5005) {
                this.prizeJiuOpt.isClick = false;
                MessageBox('提示', this.indexInfo.content.info);
            } else if (this.indexInfo.result === 10086) {
                this.prizeJiuOpt.isClick = false;
                MessageBox('提示', this.indexInfo.content.info);
            } else if (this.luckInfo.result === 10086) {
                this.prizeJiuOpt.isClick = false;
                MessageBox('提示', this.luckInfo.content.info);
            }
            this.btnDisabled = false;
        },
        /**
         * 满足抽奖条件的回调接口数据
         */
        getDataEmit() {
            // 延迟模拟点击抽奖的数据接口
            let self = this;
            setTimeout(function() {
                if (self.mockLuckState === 1) {
                    // 数据返回正常
                    self.luckState = "A";
                    self.luckInfo = {
                        result: 0,
                        content: {
                            type: "A",
                            info: "中奖了第一个"
                        }
                    };
                    self.indexInfo.content.luck_number -=1;
                    // 防止用户在出弹窗的瞬间点击按钮
                    if (self.indexInfo.content.luck_number) {
                        self.prizeJiuOpt.isClick = true;
                    }else {
                        self.prizeJiuOpt.isClick = false;
                    }
                } else if (self.mockLuckState === 11) {
                    // 数据返回异常
                    self.luckState = "error";
                    self.luckInfo = {
                        result: 10086,
                        content: {
                            type: "",
                            info: '抽奖接口异常'
                        }
                    };
                } else if (self.mockLuckState === 111) {
                    self.luckState = "B";
                    self.luckInfo = {
                        result: 0,
                        content: {
                            type: "",
                            info: "中奖了第二个"
                        }
                    };
                    self.indexInfo.content.luck_number -=1;
                    if (self.indexInfo.content.luck_number) {
                        self.prizeJiuOpt.isClick = true;
                    }else {
                        self.prizeJiuOpt.isClick = false;
                    }
                }
            }, 2000);
        },
        /**
         * 抽奖成功
         */
        successEmit() {
            this.showDialogHdl();
        },
        /**
         * 不满足抽奖条件的回调
         * 状态码交由父组件控制
         */
        errorEmit() {
            this.showDialogHdl();
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/app.scss";
.jiugongge-btn {
    .btn-item {
        display: block;
        margin: 0 auto;
        margin-top: 20px;
        width: 80%;
    }
}
</style>
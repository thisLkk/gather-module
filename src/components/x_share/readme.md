## 分享组件

#### 设计理念
```javascript

import Dialog from '@/component/dialog'

 let myShare = new Share({
    // 主标题
    title: "邀请好友，得现金",
    // 副标题
    desc: "好友接受邀请，得有钱花现金礼包",
    // 端外分享图片上方文案，支持富文本
    content:
        "将图片或活动链接分享给好友<br>好友完成注册后，坐等奖励到账",
    // 图片
    imgUrl:
        "https://mgminvitedonline.bj.bcebos.com/mgminvitedonline/share_15046647579428_common_common.png",
    link: "",
    // 是否采用接截屏分享
    isToCutScreenShare: "0",
    wxShare: {
        url: require("./images/wxShare.png"),
        className: "stage_rewards_wx_share"
    },
    showCallBack: () => {
        //    do somming
    },
    closeCallBack: () => {
        //    do somming
    },
    copied:()=>{
        //    do somming
    }
})
// 注册的Share 通过show来控制显示，show方法也也可以传入配置项例如{title:**},会将注册对象时的title替换掉，其他配置项不变。
myShare.show(options?)



```

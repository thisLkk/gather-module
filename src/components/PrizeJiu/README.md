# luckpage
#### 设计（底部有详细的调用方式）
九宫格的九个dom，称为九个方格;
设计出发点，调用方需要遵守设计的调用方式
1. 组件内部不调用接口；
2. 整体大盒子的样式及方格盒子样式由调用方控制；
3. 点击按钮的方格，通过solt实现，文案及图片由调用方控制；
4. 中奖的位置依赖调用方传入的属性；
5. 异常的处理依赖调用方传入的错误状态；
6. 组件主要逻辑是实现数据的整理与传入状态的回传；
#### props接收的属性
抽奖组件主要接受6个属性：
1. lotteryList 原数据
    1. 用于渲染页面的方格
2. buttonClickable 是否可点击
    1. 组件内监听此属性，来更新组件内 isBtnLock 的状态
3. messageOption 携带信息的并返回
    1. 处理是否中奖及异常状态，把调用方传进来的数据再回传出 去以供调用方处理
4. resultInfo 中奖信息
    1. resultInfo.status = 0 表示中奖，若有谢谢参与（type），需要调用方把谢谢参与（type）的以正常中奖形式传递（调用处理这个问题）
    2. resultInfo.status = 1 表示未中奖（无谢谢参与状态）||异常错误等
5. attributeOption 属性配置
    1. mainStyle 设置盒子的大小、背景色、背景图片
    2. squaresStyle 设置每一个方格盒子的大小、字体大小、是否展示标题及标题位置
6. success 成功状态的回传
    1. type === 200 表示触发了点击抽奖按钮，调用方可以依据此状态做抽奖接口处理
    2. type === 201 表示抽奖流程正常，把中奖信息回传（包含谢谢参与的处理）给调用方
7. error 失败状态的回传
    1. type === 400 表示正在抽奖中，抽奖按钮不可点击
    2. type === 401 表示抽奖异常，把用户传进来的信息回传出去
#### props接收的属性详解
```js
1. lotteryList Array
    // 数据格式 由8个数据组成（只能是8个，否则控制台会错误提示）
    // 数据排列不需要调用方处理，调用方需要传入的就是 九宫格顺时针 的排列
    lotteryList = [ {
        title: "1", // 奖品的名称
        type: "A", // 奖品的对应的规则
        image: require("./images/lucky1.png") // 奖品图片地址，需要require引入
    }]
2. buttonClickable Boolean
    // 按钮是否可点击态
    // 用户点击抽奖时会通过success方法告诉调用方已触发点击，调用方更改此属性状态
    // 初始化时使用：活动已结束、无资格等
3. attributeOption Object
    // 处理调用方指定的样式属性
    attributeOption = {
         mainStyle: {             // 大盒子的属性
            width: 0,             // 盒子的宽 默认670px
            height: 500,        // 盒子的高 默认520px
            background: '#fff',   // 盒子的背景色 默认 无
        },
        squaresStyle: {           // 九个方格的样式（点击按钮只有宽与高，其他属性建议通过solt的方式在调用方控制）
            width: 180,           // 方格的宽 默认 210px
            height: 150,          // 方格的高 默认 160px
            fontSize: 24,         // 字体大小 默认 24px（点击抽奖按钮默认32px）
            color: 'blue',        // 字体颜色 默认 无
            positionY: 120,       // 若有标题 标题的位置 默认 120px
            background: '#fff',   // 未选中的背景色  图片使用方式 `url(${require("./images/getLuck-bg.png")}) center center no-repeat`
            backgroundActive: 'blue',// 选中的背景色
        }
    }
4. resultInfo Object
    // 用户中奖（谢谢参与也算中奖）
    resultInfo = {
        status: 0, // 必填项 0 表示正常中奖
        title: "7",     // 选填项（会通过success回调给调用方） 中奖名称 
        type: "G",     // 必填项 中奖的类别，依据此字段动画到中奖位置
        image: require("./images/lucky1.png"), // 选填项 中奖的图片地址
        messageData: {} // 选填项 中奖的图片地址
    }
5. onFirstClick Function
    // 首次点击
6. onNonClickable Function
    // 不可点击
7. onFinished Function
    // 动画完成后的回调，成功或者失败都会触发
```
***
#### 组件-九宫格抽奖
***
```
1. 状态由此组件内控制，比如接口动画时长等；
2. 父组件可以提供一些活动状态
3. 组件会通过执行$emit把中奖的信息回传给调用方
```
***
### props属性：activityState
`activityState`：\[String|Number\] 活动状态<br>
`说明`：<br>
```
   用于控制抽奖按钮的点击与文案
   可以是String或者Number。
   在此组件内部会强制转换为Number;
```
***
### props属性：userState
`activityState`：\[String|Number\] 用户状态<br>
`说明`：<br>
```
   用于控制抽奖按钮的点击与文案
   可以是String或者Number。
   在此组件内部会强制转换为Number;
```

***
### $emit回传方法
`luckInfoEmit`：\[function\]<br>
`例子`：<br>
```
    父组件：
        luckInfoEmit(data) {};
    子组件：
        this.$emit('luckInfoEmit', {a:1})
```
<br>
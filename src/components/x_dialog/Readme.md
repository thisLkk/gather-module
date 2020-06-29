## 弹窗组件

#### 设计理念
```javascript
// -- 最大限度减少业务方代码量
// 达到这个目的最大的阻碍是template 和 css代码的组织方式
// 此次开发依旧采用将弹窗的html和css代码统一抽到一起，使用props: type选择

import Dialog from '@/component/dialog'

new Dialog({
    type: 'centerStyle',
})
.set({ // set 方法返回Dialog的实例， 推荐先set属性再调用show方法, 且展示期间set方法也可以更新组件内容
    // template 与title&content 互斥
    template?: `
        <span>¥${slotProps.money}元</span>
        <span>累计已提现4000.00元</span>
        <span>您可在APP账户余额中查看可提现金</span>
    `,
    title?: '',
    content?: '',
    className?: '',
    showCloseBtn: true,
    showConfirmBtn: true,
    showCancelBtn: true,
    mainBtnCallback: null,
    cancelBtnCallback: null,
    closeBtnCallback: null
})
.show() // show方法返回Promise，方便弹窗展示之后的后续处理逻辑的编写
.then((dialog: Dialog) => {
    // 弹窗展示之后 do something 比如埋点
    dialog.close();
    dialog.destory(); // destory 会删除dom元素，但dialog对象实例的引用还需要业务方处理
})
```

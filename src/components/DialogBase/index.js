import Dialog from './index.vue';
import Vue from 'vue';
import { getType } from '../../assets/utils';
var defaultOption = {
    title: "主标题",
    subTitle: "副标题",
    content: "内容区"
}
// 1.index  是基础组件，
// 2.error 是在基础组
// 展示基础组件
Dialog.show = (option) => {
    
    // // 获取调用的组件
    // let model = require(`./components/${name}.vue`).default;
    // // 返回虚拟dom
    // return new Promise((resolve, reject) => {
    //     let vNode = Dialog.add(name, options);
    //     // 挂载在全局：注意盒子的优先级
    //     document.body.appendChild(vNode.$mount().$el);
    //     resolve();
    // })
}
Dialog.add = (name, obj) => {
    // 获取调用的组件
    let model = require(`./components/${name}.vue`).default;
    // 返回虚拟dom
    return new Vue({
        data() {
            return {
                closing: false
            }
        },
        render(h) {
            return h(model, {
                props: {
                    ...obj
                },
                on: {
                    // 确认弹窗
                    confirm: () => {
                        if (this.closing) return;
                        else {
                            this.$children[0].visible = false;
                            this.remove();
                        }
                        this.callFun(obj.onOk)
                    },
                    // 取消弹窗
                    cancel: () => {
                        if (this.closing) return;
                        this.$children[0].visible = false;
                        this.remove();
                        this.callFun(obj.onCancel)
                    }
                }
            });
        },
        methods: {
            remove() {
                this.closing = true;
                setTimeout(() => {
                    this.closing = false;
                    this.destroy();
                }, 300);
            },

            destroy() {
                this.$destroy();
                if (this.$el) {
                    document.body.removeChild(this.$el);
                }
                this.callFun(obj.onRemove);
            },

            // 判断是不是function，如果是则调用该函数
            callFun(fn) {
                if (getType(fn) === "Function") {
                    fn()
                }
            }
        }
    });
}
// use的时候去渲染，返回一个promise
Dialog.use = (name, opt) => {
    var options = Object.assign({}, defaultOption, opt);
    return new Promise((resolve, reject) => {
        let vNode = Dialog.add(name, options);
        // 挂载在全局：注意盒子的优先级
        document.body.appendChild(vNode.$mount().$el);
        resolve();
    })
};
// 通过main.js挂载在vue的原型链中。
export default Dialog;







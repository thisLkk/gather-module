import Dialog from './dialog.vue';
import Vue from 'vue';
import "./style/index.less";
import "./style/style.less";
import { getType } from '@/util/common';
import onSchedule from './component/onSchedule.vue';

Dialog.add = (name, com) => {
    Dialog[name] = (obj = {}) => {
        const Instance = new Vue({
            data() {
                return {
                    closing: false
                }
            },
            render(h) {
                return h(com, {
                    props: {
                        ...obj
                    },
                    on: {
                        onOk: () => {
                            if (this.closing) return;
                            else {
                                this.$children[0].visible = false;
                                this.remove();
                            }
                            this.callFun(obj.onOk)

                        },
                        onCancel: () => {
                            if (this.closing) return;
                            this.$children[0].visible = false;
                            this.remove();
                            this.callFun(obj.onCancel)
                        },
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
        const component = Instance.$mount();
        document.body.appendChild(component.$el);
    }
}

// 注册
Dialog.add('onSchedule', onSchedule); // 按期还款弹窗
export default Dialog;
import Dialog from './index.vue';
import Vue from 'vue';
import { getType } from '../../assets/utils';

import error from './components/error.vue';


Dialog.add = (name, obj) => {
    let model = require(`./components/${name}.vue`).default;
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
}
Dialog.use = (name, obj) => {
    return new Promise((resolve, reject) => {
        let vNode = Dialog.add(name, obj);
        document.body.appendChild(vNode.$mount().$el)
        resolve()
    })
};
export default Dialog;







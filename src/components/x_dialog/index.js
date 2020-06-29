import dialogBasevm from './dialog_base.vue';
import DT from './template';
import Vue from 'vue';
import {getType, fixedBody, looseBody} from '@/util/util';

// 路由跳转，需要自动关闭所有的dialog
window.globalModuleCollector = window.globalModuleCollector || new Set();
const defaultOptions = {
    title: '自定义title',
    content: '自定义content',
    template: null,
    showConfirmBtn: true,
    confirmBtnName: '确认',
    showCancelBtn: false,
    cancelBtnName: '取消',
    btnGroupDirection: 'column',
    showCloseBtn: false,
}

export default class Dialog {
    constructor(customOptions = {}) {
        const dialogType = customOptions.type;
        const presetType = DT[dialogType];
        if(dialogType) {
            if(!presetType) {
                throw new Error(`Dialog type ${dialogType} is not defined`);
            }

            // 保留预设className
            customOptions.className = [presetType.className, customOptions.className];
            customOptions = Object.assign({}, presetType, customOptions);
            this.usePreset = true;
        }

        customOptions.className = getType(customOptions.className) === 'Array' ? customOptions.className : [customOptions.className];
        customOptions = Object.assign({}, defaultOptions, customOptions);

        this.options = customOptions;
        this.dialog = createNewDialog(this.options, this);
        this.el = document.body.appendChild(
            document.createElement('div')
        );
        window.globalModuleCollector.add(this);
    }
    
    set(customOptions) {
        let type = getType(customOptions);

        if(type !== 'Object') {
            throw new Error(`Dialog.set:: customOptions must be object, but got ${type}`);
        }

        for(let i in customOptions) {
            if(customOptions.hasOwnProperty(i)) {
                if(i === 'className') {
                    // 设置的域名 会同时存在
                    let customClassName = customOptions.className;
                    customOptions.className = this.options.className.concat(
                        getType(customClassName) === 'Array' ? customClassName : [customClassName]
                    );
                }

                Vue.set(
                    this.dialog.options,
                    i,
                    customOptions[i]
                )
            }
        }
        return this;
    }

    show() {
        if(this.mounted) {
            this.el && (this.el.style.display = 'block');
        }else {
            this.dialog.$mount(this.el);
            this.el = this.dialog.$el;
            this.mounted = true;
        }

        if(this.options.type === 'text') {
            fixedBody();
        }
        return this;
    }

    /**
     * 1. 弹窗所有操作 均为同步操作
     * 2. 此then方法只是让你随时可以执行一个包含 当前dialog实例 为第一个实参的回调
     * @param {Function} callback 
     */
    then(callback) {
        if(getType(callback) !== 'Function') {
            throw new Error(`Dialog.then:: callback must be Function, but got ${getType(callback)}`);
        }

        callback.call(this, this.dialog);
        return this;
    }

    close() {
        this.el && (this.el.style.display = 'none');
        this.looseBody();
        return this;
    }

    looseBody() {
        if(this.options.type === 'text') {
            looseBody();
        }
    }

    destory() {
        document.removeChild(this.el);
        this.el = null;
        window.globalModuleCollector.delete(this);
        this.looseBody();
        return this;
    }
}

function createNewDialog(options, dialog) {
    const {close} = dialog;

    return new Vue({
        data() {
            return {
                options
            }
        },
        components: {
            dialogBasevm,
        },
        render: function(createElement) {
            return createElement(
                dialogBasevm,
                {
                    props: {
                        options: this.options,
                        close: close.bind(dialog)
                    },
                    slot: options.template
                }
            )
        }
    })
}
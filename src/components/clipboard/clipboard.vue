<template lang="pug">
    div(v-on="$listeners")
        slot
</template>

<script>
import { getScript } from '@/util/util';
export default {
    data() {
        return {

        }
    },
    props: {
        text: {
            type: String,
            required: true
        },
    },
    mounted() {
        // 加载依赖文件
        getScript('https://www.baifubao.com/static/cdn-libs/clipboard.js/2.0.4/clipboard.min.js', this.init);
    },
    methods: {
        /**
         * 初始化剪切板
         *
         */
        init() {
            const self = this;
            const clipboard = new ClipboardJS(this.$el, {
                text() {
                    return self.text;
                },
                action() {
                    return 'copy';
                },
                container: this.$el
            });
            clipboard.on('success', function () {
                self.$emit('success');
            });
            clipboard.on('error', function () {
                const ua = navigator.userAgent;
                if (ua.match(/UCBrowser\//) && ua.match(/Android/)) {
                    self.$emit('success');
                } else {
                    self.$emit('error');
                }
            });
        }
    }
}
</script>


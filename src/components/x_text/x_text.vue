<template lang="pug">
    span.x-text(:style="getStyles")
        span
            slot
</template>

<script>
export default {
    props: {
        options: {
            type: Object,
            default: () => {}
        }
    },

    computed: {
        getStyles() {
            const styles = [];
            const {options} = this;
            for(let i in options) {
                if(options.hasOwnProperty(i) && !!options[i]) {
                    styles.push(`${i}: ${options[i]}`);
                }
            }
            return styles.join(';');
        }
    },
}
</script>

<style lang="less">
    .x-text {
        display: inline-block;
        padding: 24px 40px;
        span {
            vertical-align: bottom;
        }
    }
</style>
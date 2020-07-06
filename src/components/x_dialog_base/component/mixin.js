import Dialog from "../dialog.vue";
export default {
    data() {
        return {
            visible: true
        };
    },
    components: { Dialog },
    methods: {
        onOk() {
            this.$emit("onOk");
        },
        onCancel() {
            this.$emit("onCancel");
        }
    }
};

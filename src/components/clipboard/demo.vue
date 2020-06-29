<template>
    <div>
        <clipboard :text="text" @success="copyed">
            <button>copy!</button>
        </clipboard>
    </div>
</template>
<script>
    import clipboard from './clipboard';
    export default {
        data() {
            return {
                text: 'someMagicCopyData'
            };
        },
        methods: {
            copyed() {
                alert('copyed!');
            }
        },
        components: {
            'clipboard': clipboard
        }
    };
</script>

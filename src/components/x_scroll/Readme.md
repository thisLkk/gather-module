## 下拉 加载更多

####使用方法
```javascript
    import xScroll from '@/component/x-scroll';
    const components = {
        xScroll
    }

    new Vue({
        template: `
            x-scroll(
                ref="xScroll",
                :callback="xScrollFn"
            )
                <!-- 
                    你自己想写点什么写点什么
                    div(v-for="item in list")
                    ...
                -->
        `,

        methods: {
            // 需要返回一个Promise
            xScrollFn() {
                return ajax('/path/to/api')
                    .then(res => {
                        // ...
                        return res.list
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        },

        components
    })
```
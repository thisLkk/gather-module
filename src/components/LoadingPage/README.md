```js
loading(
            v-if="!dataLoaded",
            ref="loading",
            @complete="complete"
        )
dataLoaded:false
complete() {
                this.dataLoaded = true;
            },
```
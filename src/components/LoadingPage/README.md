```js
loading(
            v-if="!dataLoaded",
            ref="loading",
            @complete="complete"
        )
complete() {
                this.dataLoaded = true;
            },
```
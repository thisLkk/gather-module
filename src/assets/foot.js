/**
 * @file copy
 *  from
 *  http://gitlab.baidu.com/z3/z3-warehouse/blob/master/templates/fe-active/common/layout.jade#L63
 *  to
 *  http://gitlab.baidu.com/z3/z3-warehouse/blob/master/templates/fe-active/common/layout.jade#L125
 */
(function () {
    // 解决ios11以上，input框聚焦问题bug
    document.body.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() === 'input') {
            e.target.focus();
        }
    });
    var ua    = navigator.userAgent.toLowerCase();
    var isIOs = ua.indexOf('iphone') > 0 || ua.indexOf('ipad') > 0;

    function isIOsInputEvent(e) {
        var el      = e.target;
        var tagName = e.target.tagName.toLowerCase();

        return isIOs && (
            (tagName === 'input' && el.type !== 'submit' && el.type !== 'button') ||
            tagName === 'textarea');
    }

    // 同上面问题
    // 这里监听键盘收起，然后滚动顶部
    var inputFocusCounter = 0;
    var startScrollTop    = 0;
    document.body.addEventListener('focusout', function (e) {
        // 软键盘收起的事件处理
        if (isIOsInputEvent(e)) {
            // 键盘收齐页面空白问题
            setTimeout(function () {
                inputFocusCounter--;
                if (inputFocusCounter === 0) {
                    // for iphone x
                    document.body.scrollTop            = startScrollTop;
                    // for iphone xr
                    document.documentElement.scrollTop = startScrollTop;
                }
            }, 100);
        }
    });
    document.body.addEventListener('focusin', function (e) {
        if (isIOsInputEvent(e)) {
            if (inputFocusCounter === 0) {
                startScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            }
            inputFocusCounter++;
        }
    });
    // disable bfcache 禁用bdcache事件
    try {
        var bfWorker = new Worker(window.URL.createObjectURL(new Blob(['1'])));
        window.addEventListener('unload', function () {
            // 这里绑个事件，构造一个闭包，以免 worker 被垃圾回收导致逻辑失效
            bfWorker.terminate();
        });
    } catch (e) {
        // if you want to do something here.
    }
})();

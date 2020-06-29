/* eslint-disable */

import { getScript } from '@/assets/utils';

const util = {
    getScript,

    /**
     *判断当前环境是否是微信
     *
     * @inner
     */
    isWx: function () {
        return /MicroMessenger/i.test(navigator.userAgent);
    },

    /**
     * 判断openJS是否引入
     *
     * @inner
     */
    hasBox() {
        return 'Box' in window;
    },

    /**
     * 判断Agent是否引入
     *
     * @inner
     */
    hasAgent() {
        return 'Agent' in window;
    },
};

export default util;

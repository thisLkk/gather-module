import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'mint-ui/lib/style.css';
import './assets/rem';
import './assets/fx';
import './assets/foot';
import lazy from './assets/lazy/index';
import { gloryFactory } from './assets/utils';
import Dialog from './components/DialogBase/index.js';
import { Header, Button, Navbar, TabItem, Swipe, SwipeItem, Field } from 'mint-ui';
require('./api/mock.js');
lazy.install(Vue, {lazyComponent: true, lazyImage: true});
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Field.name, Field);
Vue.config.productionTip = false;
Vue.prototype.$Dialog = Dialog;
gloryFactory(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
    watch: {
      // 监听路由跳转回到顶部
      "$route": () => {
        document.body && (document.body.scrollTop = 0);
        document.documentElement && (document.documentElement.scrollTop = 0);
      }
    }
  }).$mount("#app");
})

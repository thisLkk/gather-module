import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'mint-ui/lib/style.css';
import './assets/rem';
import './assets/fx';
import { Header, Button, Navbar, TabItem, Swipe, SwipeItem, Field } from 'mint-ui';

Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Field .name, Field );
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

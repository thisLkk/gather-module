import Vue from "vue";
import Vuex from "vuex";
import getters from './getters';
import demo from './modules/demo'

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  modules: {
    demo
  }
});

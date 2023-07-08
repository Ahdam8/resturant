import { createStore } from "vuex";
import router from "../router/index";

export default createStore({
  state: {},
  getters: {},
  mutations: {
    redirectto(state , payload) {
      router.push({name: payload});
    },
  },
  actions: {
    redirectto({ commit } , val) {
      commit("redirectto" , val.value)
    },
  },
  modules: {},
});

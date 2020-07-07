import Vue from "vue";
import GtApp from "./GtApp.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
    render: h => h(GtApp),
    router: router,
    store: store,
}).$mount("#gt-checkout");

import Vue from "vue";
import Router from "vue-router";
import GtCart from "../GtCart";
import GtCheckout from "../GtCheckout";
import GtProcessing from "../GtProcessing";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/checkout/cart/",
            name: "cart",
            component: GtCart,
        },
        {
            path: "/checkout/",
            name: "checkout",
            component: GtCheckout,
        },
        {
            path: "/checkout/processing",
            name: "processing",
            component: GtProcessing,
        },
    ],
});

<template>
    <div class="gt-courier" v-if="shipping.items.length">
        <p class="gt-courier__text-do">{{ textCourierAction }}</p>
        <div class="sipping-method__list">
            <gt-shipping-list-item
                v-for="item in shipping.items"
                @item-selected="selectedItem"
                :key="item.id"
                :item="item"
                :selected="shipping.selected === item.id"
                :button-map-view="false"
                :shipping-item-default="false"
            ></gt-shipping-list-item>
        </div>
        <gt-customer-addresses></gt-customer-addresses>
    </div>
</template>

<script>
import GtShippingListItem from "./GtShippingListItem";
import GtCustomerAddresses from "./GtCustomerAddresses";

export default {
    name: "GtCourier",
    components: {GtCustomerAddresses, GtShippingListItem},
    computed: {
        shipping() {
            return this.$store.state.shipping.courier;
        },
        textCourierAction() {
            return this.$store.state.data.messages.courierAction;
        },
    },
    methods: {
        async selectedItem(shippingId) {
            this.$emit("shipping-updating", true);
            await this.$store.dispatch("setCurrentShipping", {shippingId});
            this.$emit("shipping-updating", false);
        },
    },
};
</script>

<style scoped>
.gt-courier__text-do {
    padding-left: 2em;
    font-size: 0.9em;
}
</style>

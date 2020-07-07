<template>
    <div class="gt-shipping-default">
        <gt-shipping-list-item
            v-for="item in shipping.items"
            @item-selected="selectedItem"
            @show-shipping-default="selectPickupPoint"
            :key="item.id"
            :item="item"
            :selected="shipping.selected === item.id"
            :button-map-view="false"
            :shipping-item-default="true"
        ></gt-shipping-list-item>
    </div>
</template>

<script>
import GtShippingListItem from "./GtShippingListItem";
export default {
    name: "GtShippingDefault",
    components: {GtShippingListItem},
    computed: {
        shipping() {
            return this.$store.state.shipping.fake;
        },
    },
    methods: {
        async selectedItem(shippingId, pickupPointId, isGroup) {
            this.$emit("shipping-updating", true);
            await this.$store.dispatch("setCurrentShipping", {
                shippingId,
                pickupPointId,
                isGroup,
            });
            this.$emit("shipping-updating", false);
        },
    },
};
</script>

<style lang="less" scoped></style>

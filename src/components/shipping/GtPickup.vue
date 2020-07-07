<template>
    <div class="gt-pickup">
        <p class="gt-pickup__text-do">{{ textPickupAction }}</p>
        <div class="sipping-method__list">
            <gt-shipping-list-item
                v-for="item in shipping.items"
                @item-selected="selectedItem"
                @show-pickup-point="selectPickupPoint"
                :key="item.id"
                :item="item"
                :selected="shipping.selected === item.id"
                :button-map-view="false"
                :shipping-item-default="false"
            ></gt-shipping-list-item>
        </div>
        <gt-modal-window ref="pickupPointWindow">
            <gt-point-on-map :end-points="pickupEndPoints"></gt-point-on-map>
        </gt-modal-window>
    </div>
</template>

<script>
import GtShippingListItem from "./GtShippingListItem";
import GtModalWindow from "../basic/GtModalWindow";
import GtPointOnMap from "../basic/GtPointOnMap";

export default {
    name: "GtPickup",
    components: {GtShippingListItem, GtModalWindow, GtPointOnMap},
    data() {
        return {
            pickupEndPoints: {},
            delivery: "",
        };
    },
    computed: {
        shipping() {
            return this.$store.state.shipping.pickup;
        },
        points() {
            return this.$store.state.endPoints[this.delivery];
        },
        textPickupAction() {
            return this.$store.state.data.messages.pickupAction;
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
        selectPickupPoint(isGroup, shippingId) {
            this.$refs.pickupPointWindow.setTitle(
                this.$store.state.data.blockTitle[isGroup ? "popupPartnerPickupPoint" : "popupPickupPoint"],
            );
            this.updatePickupEndPoints(isGroup, shippingId);
            this.$refs.pickupPointWindow.open();
        },
        updatePickupEndPoints(isGroup, deliveryId) {
            if (isGroup) {
                let points = this.$store.state.endPoints[deliveryId];
                if (!points) {
                    this.pickupEndPoints = {};
                    this.$store
                        .dispatch("getPartnerPickupPoint", {id: deliveryId})
                        .then(response => (this.pickupEndPoints = response));
                } else this.pickupEndPoints = points;
            } else {
                this.pickupEndPoints = {
                    id: "pickup",
                    selected: this.shipping.selected,
                    items: this.shipping.items.filter(function(item) {
                        return !item.group;
                    }),
                };
            }
        },
    },
};
</script>

<style scoped>
.gt-pickup__text-do {
    padding-left: 2em;
    font-size: 0.9em;
}
</style>

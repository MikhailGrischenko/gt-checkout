<template>
    <gt-block :block-name="blockName">
        <p class="gt-shipping__text-do">{{ textShippingAction }}</p>
        <gt-waiting-spinner :visible="stateUpdating">
            <div class="shipping-tabs">
                <div class="shipping-tabs__butons">
                    <div
                        class="shipping-tabs__buton shipping-tabs__buton--left"
                        @click="setActiveShippingType('pickup')"
                        :class="[{'shipping-tabs__buton--active': shipping.selected === 'pickup'}]"
                        v-if="shipping.pickup.items.length"
                    >
                        {{ blockNamePickup }}
                    </div>
                    <div
                        class="shipping-tabs__buton shipping-tabs__buton--center"
                        @click="setActiveShippingType('fake')"
                        :class="[{'shipping-tabs__buton--active': shipping.selected === 'fake'}]"
                        v-if="shipping.fake.items.length"
                    >
                        {{ blockNameFake }}
                    </div>
                    <div
                        class="shipping-tabs__buton shipping-tabs__buton--right"
                        @click="setActiveShippingType('courier')"
                        :class="[{'shipping-tabs__buton--active': shipping.selected === 'courier'}]"
                        v-if="shipping.courier.items.length"
                    >
                        {{ blockNameCourier }}
                    </div>
                </div>
                <div class="shipping-tabs__main">
                    <gt-pickup
                        v-show="shipping.selected === 'pickup'"
                        @shipping-updating="shippingUpdating"
                    ></gt-pickup>
                    <gt-courier
                        v-show="shipping.selected === 'courier'"
                        @shipping-updating="shippingUpdating"
                    ></gt-courier>
                    <gt-shipping-default
                        v-show="shipping.selected === 'fake'"
                        @shipping-updating="shippingUpdating"
                    ></gt-shipping-default>
                </div>
            </div>
        </gt-waiting-spinner>
    </gt-block>
</template>

<script>
import GtBlock from "../basic/GtBlock";
import GtPickup from "./GtPickup";
import GtCourier from "./GtCourier";
import GtShippingDefault from "./GtShippingDefault";
import GtWaitingSpinner from "../basic/GtWaitingSpinner";

export default {
    name: "GtShipping",
    components: {
        GtWaitingSpinner,
        GtShippingDefault,
        GtBlock,
        GtCourier,
        GtPickup,
    },
    data() {
        return {
            stateUpdating: false,
        };
    },
    computed: {
        shipping() {
            return this.$store.state.shipping;
        },
        blockName() {
            return this.$store.state.data.blockTitle.shipping;
        },
        blockNamePickup() {
            return this.$store.state.data.blockTitle.pickup;
        },
        blockNameCourier() {
            return this.$store.state.data.blockTitle.courier;
        },
        blockNameFake() {
            return this.$store.state.data.blockTitle.fake;
        },
        textShippingAction() {
            return this.$store.state.data.messages.shippingAction;
        },
    },
    methods: {
        async setActiveShippingType(method) {
            this.$emit("shipping-updating", true);
            await this.$store.dispatch("setCurrentShipping", {
                shippingId: this.shipping[method].selected,
                shippingType: method,
            });
            this.$emit("shipping-updating", false);
        },
        shippingUpdating(state) {
            this.$emit("shipping-updating", state);
        },
        setStateUpdating(state) {
            this.stateUpdating = state;
        },
    },
};
</script>

<style lang="less" scoped>
.gt-shipping__text-do {
    padding: 0 1em;
    font-size: 0.9em;
}
.shipping-tabs {
    width: 100%;

    &__butons {
        display: flex;
    }

    &__buton {
        flex: 1 1 auto;
        border-radius: 3px 3px 0 0;
        border: @border-light;
        border-bottom: 0 solid;
        background-color: @color-bg-extra-light;
        color: @color-font-black-light;
        padding: 0.5em 1.2em;
        z-index: 1;
        flex-basis: 33.333333%;
        cursor: pointer;

        &--left {
            margin: 0 0.2em -1px 0;
        }

        &--center {
            margin-bottom: -1px;
        }

        &--right {
            margin: 0 0 -1px 0.2em;
        }

        &--active {
            border-color: @color-corporate;
            background-color: @color-bg-checkout;
            color: @color-corporate;
            margin-bottom: -1px;
            z-index: 2;
        }

        &:hover {
            color: @color-corporate;
        }
    }

    &__main {
        border: @border-corporate;
        border-radius: 0 0 3px 3px;
        padding: 1em 0.5em;
        position: relative;
    }
}
</style>

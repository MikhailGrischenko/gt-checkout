<template>
    <div class="gt-summary__sticky-road">
        <gt-block
            class="gt-summary__block"
            :block-name="blockName"
            :class="{
                'gt-summary__block--top-fix': topPositionSummary,
                'gt-summary__block--bottom-fix': bottomPositionSummary,
            }"
        >
            <article class="gt-summary" id="gt-summary">
                <div class="gt-summary__groups">
                    <div class="gt-summary__group gt-summary__group--products">
                        <ul class="gt-summary__list">
                            <li>
                                <gt-summary-list-item
                                    :title="summaryTitles.titleProductsQuantity"
                                    :value="productsAllQuantity"
                                    :unit="summaryTitles.titleProductsQuantityUnits"
                                    :valueUpdating="cartStateUpdating"
                                ></gt-summary-list-item>
                            </li>
                            <li>
                                <gt-summary-list-item
                                    :title="summaryTitles.titleProductsCost"
                                    :value="[formatPrice(productsAllCost)]"
                                    :unit="currency"
                                    :valueUpdating="cartStateUpdating"
                                ></gt-summary-list-item>
                            </li>
                            <!--li>
                                <gt-summary-list-item
                                    :title="summaryTitles.titleTotalWeight"
                                    :item="summary.totalWeightOrder"
                                    :cartStateUpdating="cartStateUpdating"
                                ></gt-summary-list-item>
                            </li-->
                        </ul>
                    </div>
                    <div
                        class="gt-summary__group gt-summary__group--shipping"
                        v-if="$route.name === 'checkout' && cartNoEmpty && isEnableShipping"
                    >
                        <ul class="gt-summary__list">
                            <li>
                                <gt-summary-list-item
                                    :title="summaryTitles.titleShippingMethod"
                                    :value="shippingTypesTitles"
                                    :valueUpdating="sippingStateUpdating"
                                ></gt-summary-list-item>
                            </li>
                            <li>
                                <gt-summary-list-item
                                    :title="summaryTitles.titleShippingCost"
                                    :value="shippingPricesTitles"
                                    :unit="unitForShipping"
                                    :valueUpdating="sippingStateUpdating"
                                ></gt-summary-list-item>
                            </li>
                            <!--li v-if="getShipping.selected === 'pickup'">
                                <gt-summary-list-item
                                    :title="summaryTitles.titlePickupPeriod"
                                    :item="summary.pickupPeriod"
                                    :valueUpdating="sippingStateUpdating"
                                ></gt-summary-list-item>
                            </li>
                            <li v-if="getShipping.selected === 'courier'">
                                <gt-summary-list-item
                                    :title="summaryTitles.titleCourierPeriod"
                                    :item="summary.courierPeriod"
                                    :valueUpdating="sippingStateUpdating"
                                ></gt-summary-list-item>
                            </li-->
                            <li>
                                <gt-summary-list-item
                                    v-show="shippingAddressTitle"
                                    :title="shippingAddressTitle"
                                    :value="shippingAddress"
                                    :selected="true"
                                    :valueUpdating="sippingStateUpdating"
                                ></gt-summary-list-item>
                            </li>
                        </ul>
                    </div>
                    <div
                        class="gt-summary__group gt-summary__group--payment"
                        v-if="$route.name === 'checkout' && cartNoEmpty && isEnablePayment"
                    >
                        <ul class="gt-summary__list">
                            <li>
                                <gt-summary-list-item
                                    :title="summaryTitles.titlePaymentMethod"
                                    :value="paymentMethod"
                                    :valueUpdating="paymentStateUpdating"
                                ></gt-summary-list-item>
                            </li>
                        </ul>
                    </div>
                    <div
                        class="gt-summary__group gt-summary__group--total"
                        v-if="$route.name === 'checkout' && cartNoEmpty"
                    >
                        <ul class="gt-summary__list">
                            <li>
                                <gt-summary-list-item
                                    class="gt-summary__list-item--fullcost"
                                    :title="summaryTitles.titleTotalCost"
                                    :value="[formatPrice(summary.total)]"
                                    :unit="currency"
                                    :valueUpdating="fullCostStateUpdating"
                                ></gt-summary-list-item>
                            </li>
                        </ul>
                    </div>
                    <div class="gt-summary__note">
                        <span class="gt-summary__note-value">{{ summaryTitles.note }}</span>
                    </div>
                </div>
                <div class="gt-summary__action"><slot></slot></div>
                <div class="gt-summary__note gt-summary__note--action" v-show="showNoteOneClick">
                    <slot name="note-action"></slot>
                </div>
            </article>
        </gt-block>
    </div>
</template>

<script>
import GtBlock from "../basic/GtBlock";
import GtSummaryListItem from "./GtSummaryListItem";
import {formatNumber} from "../../lib/format";

export default {
    name: "GtSummary",
    components: {
        GtBlock,
        GtSummaryListItem,
    },
    props: {},
    data() {
        return {
            cartStateUpdating: false,
            sippingStateUpdating: false,
            paymentStateUpdating: false,
            fullCostStateUpdating: false,
            topPositionSummary: false,
            bottomPositionSummary: false,
        };
    },
    //
    mounted() {
        window.addEventListener("scroll", this.isFixedSummary);
    },
    computed: {
        blockName() {
            return this.$store.state.data.blockTitle.summary;
        },
        summaryTitles() {
            return this.$store.state.data.summary;
        },
        shippingTypesTitles() {
            return this.shippingTypes.map(method => this.$store.state.data.blockTitle[method]);
        },
        shippingPricesTitles() {
            let format = (pos, value) => this.$store.state.data.summary[pos] + " " + this.formatPrice(value);
            let freeChargeConvert = value =>
                value === 0 ? this.$store.state.data.shippingListItem.freeCharge : this.formatPrice(value);
            return this.shippingPrices.length === 1
                ? [freeChargeConvert(this.shippingPrices[0])]
                : [format("from", this.shippingPrices[0]), format("to", this.shippingPrices[1])];
        },
        unitForShipping() {
            return this.shippingPricesTitles[0] === this.$store.state.data.shippingListItem.freeCharge
                ? null
                : this.currency;
        },
        shippingAddressTitle() {
            return this.summaryTitles[this.shipping.selected + "AddressTitle"];
        },
        summary() {
            return this.$store.state.summary;
        },
        cart() {
            return this.$store.state.cart;
        },
        currency() {
            return this.summary.currency;
        },
        productsAllQuantity() {
            return [this.cart.reduce((total, product) => total + product.quantity, 0)];
        },
        productsAllCost() {
            return this.cart.reduce((total, product) => total + product.cost, 0);
        },
        shipping() {
            return this.$store.state.shipping;
        },
        shippingTypes() {
            return this.shipping.selected ? [this.shipping.selected] : ["pickup", "courier"];
        },
        shippingPrices() {
            let prices = [];
            let unique = (item, index, array) => array.indexOf(item) === index;
            this.shippingTypes.forEach(type => {
                if (!this.shipping[type] || !this.shipping[type].items) {
                    return;
                }
                this.shipping[type].items.forEach(item => prices.push(item.price));
            });
            prices = prices.filter(unique).sort();
            switch (prices.length) {
                case 0:
                    return ["??"];
                case 1:
                    return prices;
                default:
                    return [prices.shift(), prices.pop()];
            }
        },
        shippingAddress() {
            if (this.shipping.selected === "pickup") {
                if (this.shipping.pickup.selected) {
                    return this.shipping.pickup.items
                        .filter(item => item.id === this.shipping.pickup.selected)
                        .reduce((points, item) => [...points, item.name], []);
                }
                return [];
            } else {
                let address = this.$store.state.summary.address;
                return [address.city, address.address];
            }
        },
        paymentMethod() {
            return this.$store.getters.getPaymentMethod.map(item => item.name);
        },
        indent() {
            let fontSize = window.getComputedStyle(this.getElementHeader).fontSize;
            return parseInt(fontSize, 10);
        },
        getElementSummary() {
            return document.getElementsByClassName("gt-summary__block")[0];
        },
        getElementStickyRoad() {
            return document.getElementsByClassName("gt-summary__sticky-road")[0];
        },

        getElementHeader() {
            return document.getElementsByClassName("header__row--main")[0];
        },
        showNoteOneClick() {
            let state = this.$store.state;
            return (
                state.summary.total &&
                state.shipping.selected === "fake" &&
                (!state.customer.phone && !state.customer.loggedIn)
            );
        },
        cartNoEmpty() {
            return this.$store.state.cart[0];
        },
        isEnablePayment() {
            return this.$store.state.payment !== false;
        },
        isEnableShipping() {
            return this.$store.state.shipping !== false;
        },
    },
    methods: {
        formatPrice(price, digits = 2) {
            return formatNumber(price, digits);
        },
        setCartStateUpdating(state) {
            this.cartStateUpdating = state;
            this.sippingStateUpdating = state;
            this.paymentStateUpdating = state;
            this.fullCostStateUpdating = state;
        },
        setSippingStateUpdating(state) {
            this.sippingStateUpdating = state;
            this.paymentStateUpdating = state;
            this.fullCostStateUpdating = state;
        },
        setPaymentStateUpdating(state) {
            this.paymentStateUpdating = state;
            this.fullCostStateUpdating = state;
        },
        isFixedSummary() {
            let indent = parseInt(window.getComputedStyle(this.getElementHeader).fontSize, 10);
            let headerHeight = this.getElementHeader.clientHeight;
            let summaryHeight = this.getElementSummary.clientHeight;
            let summaryWidth = this.getElementSummary.clientWidth;
            let topStickyRoad = this.getElementStickyRoad.getBoundingClientRect().top;
            let bottomStickyRoad =
                this.getElementStickyRoad.getBoundingClientRect().top + this.getElementStickyRoad.clientHeight;
            let topIndent = headerHeight + indent;
            let bottomIndent = headerHeight + indent + summaryHeight + indent;
            if (topStickyRoad < topIndent && bottomStickyRoad > bottomIndent) {
                this.bottomPositionSummary = false;
                this.getElementSummary.style.top = `${headerHeight + indent}px`;
                this.getElementSummary.style.width = `${summaryWidth}px`;
                this.topPositionSummary = true;
            } else if (topStickyRoad < topIndent && bottomStickyRoad < bottomIndent) {
                this.getElementSummary.style.top = `auto`;
                this.topPositionSummary = false;
                this.bottomPositionSummary = true;
            } else {
                this.topPositionSummary = false;
                this.bottomPositionSummary = false;
            }
        },
    },
};
</script>

<style lang="less">
@media (min-width: @screen__gta-tablet-s) {
    .gt-summary {
        max-width: 392px;
        margin: 0 auto;
    }
}
@media (min-width: @screen__gta-desktop-xs) {
    .gt-summary {
        max-width: none;

        &__block {
            &--top-fix {
                position: fixed;
            }

            &--bottom-fix {
                position: absolute;
                bottom: 0;
            }
        }
    }
}
</style>

<style lang="less" scoped>
.gt-summary {
    padding: 0 1em;

    &__sticky-road {
        height: 100%;
        display: block;
    }

    &__block {
        display: block;
    }

    &__group {
        margin: 1em 0 2.4em 0;
    }

    &__list {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    &__list-item {
        &--fullcost {
            font-size: 1.2em;
            background-color: @color-grey;
            font-weight: 500;
            font-family: @font-family-title;
            padding: 0.5em 0.2em 0.3em;
        }
    }

    &__action {
        padding: 0;
        margin: 1em -1em 1em 0;
    }

    &__note {
        margin: 1em 0 1em 0;
        font-size: 0.9em;
    }

    &__note-value {
        font-weight: lighter;
        font-style: italic;
    }
}
</style>

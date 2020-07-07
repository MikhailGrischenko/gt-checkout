<template>
    <div class="checkout-main container">
        <gt-page-title :title="title"></gt-page-title>
        <gt-action-button />
        <gt-messages></gt-messages>
        <section class="cart-content">
            <section class="cart-content__main">
                <gt-cart-list @cart-updating="setCartUpdatingState"></gt-cart-list>
            </section>
            <section class="cart-content__summary">
                <gt-summary ref="summary">
                    <gt-link-route
                        :label-link="toCheckoutLabel"
                        name="checkout"
                        style-link="primary"
                        :disable="!readyForCheckout"
                    />
                </gt-summary>
            </section>
        </section>
    </div>
</template>

<script>
import GtPageTitle from "./components/GtPageTitle";
import GtActionButton from "./components/GtActionButton";
import GtLinkRoute from "./components/basic/GtLinkRoute";
import GtSummary from "./components/summary/GtSummary";
import GtMessages from "./components/Messages/GtMessages";
import GtCartList from "./components/cart/GtCartList";

export default {
    name: "GtCart",
    components: {GtCartList, GtMessages, GtSummary, GtActionButton, GtPageTitle, GtLinkRoute},
    computed: {
        title() {
            return this.$store.state.data.blockTitle.cart;
        },
        toCheckoutLabel() {
            return this.$store.state.data.labelButtons.toCheckout;
        },
        cartData() {
            return this.$store.state.cart;
        },
        readyForCheckout() {
            return this.$store.state.summary.total;
        },
    },
    methods: {
        setCartUpdatingState(state) {
            this.$refs.summary.setCartStateUpdating(state);
        },
    },
};
</script>

<style lang="less">
.cart-content {
    display: flex;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
    flex-direction: column;

    &__main {
        flex: 0 1 100%;
        max-width: 100%;
        padding: 0 @grid-half-gutter-phone-s;
    }
    &__summary {
        flex: 0 1 100%;
        max-width: 100%;
        padding: 0 @grid-half-gutter-phone-s;
    }
}
@media (min-width: @screen__gta-phone-m) {
    .cart-content {
        &__main {
            padding: 0 @grid-half-gutter-phone-s;
        }
        &__summary {
            flex: 0 1 auto;
            padding: 0 @grid-half-gutter-phone-s;
        }
    }
}

@media (min-width: @screen__gta-tablet-s) {
    .cart-content {
        &__main {
            padding: 0 @grid-half-gutter-tablet-m;
        }
        &__summary {
            padding: 0 @grid-half-gutter-tablet-m;
        }
    }
}

@media (min-width: @screen__gta-desktop-xs) {
    .cart-content {
        flex-direction: row;

        &__main {
            flex: 0 1 66.666667%;
            max-width: 66.666667%;
            padding: 0 @grid-half-gutter-desktop-xs;
        }
        &__summary {
            flex: 0 1 33.333333%;
            max-width: 33.333333%;
            padding: 0 @grid-half-gutter-desktop-xs;
        }
    }
}

@media (min-width: @screen__gta-desktop-s) {
    .cart-content {
        &__main {
            padding: 0 @grid-half-gutter-desktop-s;
        }
        &__summary {
            padding: 0 @grid-half-gutter-desktop-s;
        }
    }
}

@media (min-width: @screen__gta-desktop-m) {
    .cart-content {
        &__main {
            padding: 0 @grid-half-gutter-desktop-m;
        }
        &__summary {
            padding: 0 @grid-half-gutter-desktop-m;
        }
    }
}

@media (min-width: @screen__gta-desktop-l) {
    .cart-content {
        &__main {
            padding: 0 @grid-half-gutter-desktop-l;
        }
        &__summary {
            padding: 0 @grid-half-gutter-desktop-l;
        }
    }
}

@media (min-width: @screen__gta-desktop-xl) {
    .cart-content {
        &__main {
            padding: 0 @grid-half-gutter-desktop-xl;
        }
        &__summary {
            padding: 0 @grid-half-gutter-desktop-xl;
        }
    }
}
</style>

<style scoped lang="less">
.checkout-main {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    position: relative;
}
</style>

<template>
    <div class="checkout-main container">
        <gt-page-title :title="title"></gt-page-title>
        <gt-action-button>
            <gt-link-route
                v-if="$route.name === 'checkout'"
                :label-link="getLabelButtonBackToCart"
                name="cart"
                style-link="tertiary"
            />
        </gt-action-button>
        <gt-messages></gt-messages>
        <section class="cart-content">
            <section class="cart-content__main">
                <gt-welcome v-if="userLogged"></gt-welcome>
                <gt-cart-list ref="cart" @cart-updating="setCartUpdatingState"></gt-cart-list>
                <gt-contact-data v-if="lengthCartData" @contacts-changed="contactDataChanged"></gt-contact-data>
                <div v-if="isEnableShipping">
                    <gt-shipping
                        ref="shipping"
                        v-show="cartNoEmpty"
                        @shipping-updating="setShippingUpdatingState"
                    ></gt-shipping>
                </div>
                <div v-if="isEnablePayment">
                    <gt-payment
                        ref="payment"
                        v-show="cartNoEmpty"
                        @payment-updating="setPaymentUpdatingState"
                    ></gt-payment>
                </div>
                <gt-comment
                    v-if="lengthCartData"
                    @change-comment="changeComment"
                    :value="order.userComment"
                    maxlength="1000"
                ></gt-comment>
            </section>
            <section class="cart-content__summary">
                <gt-summary ref="summary">
                    <gt-link-route
                        :label-link="conversionCheckoutLabel"
                        name="processing"
                        style-link="primary"
                        :disable="!orderReadyToCreate"
                    />
                    <span class="gt-summary__note-value" slot="note-action">{{ summaryBlock.noteOneClick }}</span>
                </gt-summary>
            </section>
        </section>
    </div>
</template>

<script>
import GtActionButton from "./components/GtActionButton";
import GtSummary from "./components/summary/GtSummary";
import GtPageTitle from "./components/GtPageTitle";
import GtShipping from "./components/shipping/GtShipping";
import GtPayment from "./components/payment/GtPayment";
import GtMessages from "./components/Messages/GtMessages";
import GtLinkRoute from "./components/basic/GtLinkRoute";
import GtCartList from "./components/cart/GtCartList";
import GtContactData from "./components/login/GtContactData";
import GtWelcome from "./components/login/GtWelcome";
import GtComment from "./components/basic/GtComment";

export default {
    name: "GtCheckout",
    components: {
        GtComment,
        GtWelcome,
        GtContactData,
        GtMessages,
        GtPayment,
        GtShipping,
        GtPageTitle,
        GtSummary,
        GtActionButton,
        GtLinkRoute,
        GtCartList,
    },
    data() {
        return {
            cartStateUpdating: false,
            sippingStateUpdating: false,
            paymentStateUpdating: false,
            isContactsValid: false,
        };
    },
    computed: {
        order() {
            return this.$store.state.order;
        },
        title() {
            return this.$store.state.data.blockTitle.checkout;
        },
        getLabelButtonBackToCart() {
            return this.$store.state.data.labelButtons.backToCart;
        },
        getTitleBlockCart() {
            return this.$store.state.data.blockTitle.cart;
        },
        conversionCheckoutLabel() {
            let state = this.$store.state;
            if (state.summary.total && state.shipping.selected === "fake") {
                return this.$store.state.data.labelButtons.buyOneClick;
            } else {
                return this.$store.state.data.labelButtons.conversionCheckout;
            }
        },
        orderReadyToCreate() {
            const state = this.$store.state;
            return state.summary.total && this.isContactsValid;
        },
        userLogged() {
            return this.$store.state.customer.loggedIn;
        },
        cartNoEmpty() {
            return this.$store.state.cart[0];
        },
        summaryBlock() {
            return this.$store.state.data.summary;
        },
        isEnableShipping() {
            return this.$store.state.shipping !== false;
        },
        isEnablePayment() {
            return this.$store.state.payment !== false;
        },
        lengthCartData() {
            return this.$store.state.cart.length;
        },
    },
    methods: {
        setCustomerField(customer) {
            this.$store.dispatch("updateCustomer", customer);
        },
        setCartUpdatingState(state) {
            this.$refs.shipping.setStateUpdating(state);
            this.$refs.payment.setStateUpdating(state);
            this.$refs.summary.setCartStateUpdating(state);
        },
        setShippingUpdatingState(state) {
            this.$refs.summary.setSippingStateUpdating(state);
            this.$refs.payment.setStateUpdating(state);
        },
        setPaymentUpdatingState(state) {
            this.$refs.summary.setPaymentStateUpdating(state);
        },
        contactDataChanged(contacts) {
            this.isContactsValid = contacts.isValid();
        },
        changeComment(value) {
            this.order.userComment = value;
        },
    },
};
</script>

<style scoped>
.checkout-main {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    position: relative;
}
.gt-summary__note-value {
    font-weight: lighter;
    font-style: italic;
}
</style>

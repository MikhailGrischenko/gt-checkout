<template>
    <gt-block :block-name="blockName">
        <div class="gt-payment">
            <p class="gt-payment__text-do">{{ textPaymentAction }}</p>
            <gt-waiting-spinner :visible="stateUpdating">
                <div class="payment-methods payment-methods__first">
                    <gt-payment-method
                        v-for="(item, index) in paymentMethods"
                        :key="index"
                        @method-selected="setCurrentPayment"
                        :method="item"
                        :selected="selectedPaymentMethod === item.id"
                        :disable="availablePaymentMethods.indexOf(item.id) === -1"
                    ></gt-payment-method>
                </div>
            </gt-waiting-spinner>
        </div>
    </gt-block>
</template>

<script>
import GtPaymentMethod from "./GtPaymentMethod";
import GtBlock from "../basic/GtBlock";
import GtWaitingSpinner from "../basic/GtWaitingSpinner";

export default {
    name: "GtPayment",
    components: {
        GtWaitingSpinner,
        GtPaymentMethod,
        GtBlock,
    },
    data() {
        return {
            stateUpdating: false,
        };
    },
    computed: {
        blockName() {
            return this.$store.state.data.blockTitle.payment;
        },
        selectedPaymentMethod() {
            return this.$store.state.payment.selected;
        },
        paymentMethods() {
            return this.$store.state.payment.items;
        },
        availablePaymentMethods() {
            if (
                !this.$store.state.shipping.selected ||
                !this.$store.state.shipping[this.$store.state.shipping.selected].selected
            ) {
                return ["fake"];
            }
            let method = this.$store.state.shipping[this.$store.state.shipping.selected];
            let selected = method.selected;
            return method.items
                .filter(item => item.id === selected)
                .reduce((payments, shipping) => [...payments, ...shipping.payment], []);
        },
        textPaymentAction() {
            return this.$store.state.data.messages.paymentAction;
        },
    },
    methods: {
        async setCurrentPayment(id) {
            this.$emit("payment-updating", true);
            await this.$store.dispatch("setCurrentPayment", {
                paymentId: id,
            });
            this.$emit("payment-updating", false);
        },
        setStateUpdating(state) {
            this.stateUpdating = state;
        },
    },
};
</script>

<style lang="less">
.payment-methods {
    margin: 0;
}
@media (min-width: @screen__gta-desktop-xs) {
    .payment-methods {
        margin: 0 -0.25em;
    }
}
</style>

<style lang="less" scoped>
.gt-payment {
    display: flex;
    flex-direction: column;

    &__text-do {
        padding: 1em;
        font-size: 0.9em;
    }
}

.payment-methods {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
</style>

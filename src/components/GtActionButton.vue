<template>
    <section class="action-button">
        <div class="action-button__group action-button__group--left">
            <slot></slot>
            <gt-button
                v-if="0 && cartFilled"
                @click-button="onButtonClick"
                :label-button="labelButtonClearCart"
                :icons-enabled="buttonClearCart.icon"
                :action-button="buttonClearCart.action"
                :style-button="buttonClearCart.style"
            ></gt-button>
            <gt-button
                v-if="0 && !cartFilled"
                @click-button="onButtonClick"
                :label-button="labelButtonReturnCart"
                :icons-enabled="buttonReturnCart.icon"
                :action-button="buttonReturnCart.action"
                :style-button="buttonReturnCart.style"
            ></gt-button>
        </div>
        <div class="action-button__group action-button__group--right" v-if="!userLogged">
            <gt-button
                @click-button="onButtonClick"
                :label-button="labelButtonCheckIn"
                :icons-enabled="buttonCheckIn.icon"
                :action-button="buttonCheckIn.action"
                :style-button="buttonCheckIn.style"
            ></gt-button>
            <gt-button
                @click-button="onButtonClick"
                :label-button="labelButtonSignIn"
                :icons-enabled="buttonSignIn.icon"
                :action-button="buttonSignIn.action"
                :style-button="buttonSignIn.style"
            ></gt-button>
        </div>
    </section>
</template>

<script>
import GtButton from "./basic/GtButton";

export default {
    name: "GtActionButton",
    components: {
        GtButton,
    },
    data() {
        return {
            buttonBackToShopping: {
                style: "primary",
                icon: false,
            },
            buttonClearCart: {
                style: "tertiary",
                action: "clearCart",
                icon: false,
            },
            buttonReturnCart: {
                style: "tertiary",
                action: "returnCart",
                icon: false,
            },
            buttonSignIn: {
                style: "primary",
                action: "signIn",
                icon: false,
            },
            buttonCheckIn: {
                style: "secondary",
                action: "checkIn",
                icon: false,
            },
        };
    },
    computed: {
        cartData() {
            return this.$store.state.cart;
        },
        cartFilled() {
            return this.cartData && this.cartData.length;
        },
        labelButtonClearCart() {
            return this.$store.state.data.labelButtons.clearCart;
        },
        labelButtonReturnCart() {
            return this.$store.state.data.labelButtons.returnCart;
        },
        labelButtonSignIn() {
            return this.$store.state.data.labelButtons.signIn;
        },
        labelButtonCheckIn() {
            return this.$store.state.data.labelButtons.checkIn;
        },
        userLogged() {
            return this.$store.state.customer.loggedIn;
        },
    },
    methods: {
        onButtonClick(action) {
            switch (action) {
                case "clearCart":
                    this.$store.commit("showCart", true);
                    break;
                case "returnCart":
                    this.$store.commit("showCart", false);
                    break;
                case "signIn":
                    this.getSignIn();
                    break;
                case "checkIn":
                    this.getCheckIn();
                    break;
            }
        },
        getSignIn() {
            showSignInPopup(); // eslint-disable-line no-undef
        },
        getCheckIn() {
            showRegistrationPopup(); // eslint-disable-line no-undef
        },
    },
};
</script>

<style lang="less">
.action-button {
    margin: 0 0 1.2em;
    padding: 0 @grid-half-gutter-phone-s;
}
@media (min-width: @screen__gta-tablet-s) {
    .action-button {
        padding: 0 @grid-half-gutter-tablet-m;
    }
}

@media (min-width: @screen__gta-desktop-xs) {
    .action-button {
        padding: 0 @grid-half-gutter-desktop-xs;
    }
}

@media (min-width: @screen__gta-desktop-s) {
    .action-button {
        padding: 0 @grid-half-gutter-desktop-s;
    }
}

@media (min-width: @screen__gta-desktop-m) {
    .action-button {
        padding: 0 @grid-half-gutter-desktop-m;
    }
}

@media (min-width: @screen__gta-desktop-l) {
    .action-button {
        padding: 0 @grid-half-gutter-desktop-l;
    }
}

@media (min-width: @screen__gta-desktop-xl) {
    .action-button {
        padding: 0 @grid-half-gutter-desktop-xl;
    }
}
</style>

<style lang="less" scoped>
.action-button {
    display: flex;
    justify-content: space-between;

    &__group {
        display: flex;

        &--right {
            margin-right: -1em;
        }
    }
}
</style>

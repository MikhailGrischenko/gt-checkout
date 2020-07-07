<template>
    <div
        class="payment-method"
        :class="[{'payment-method--selected': selected}, {'payment-method--disable': disable}]"
        @click="$emit('method-selected', method.id)"
    >
        <div class="payment-method__fog">
            <div class="payment-method__fog-message">{{ paymentDisabledMessage }}</div>
        </div>
        <div class="payment-method__title-icon">
            <div class="payment-method__title-icon--in" :class="imageUrl"></div>
        </div>
        <h3 class="payment-method__title">{{ method.name }}</h3>
        <div class="payment-method__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M23.3567 3.19854C22.4982 2.34007 21.1072 2.34007 20.2488 3.19854L7.17758
                        16.2697L3.70197 13.2841C2.85523 12.4373 1.48254 12.4373 0.635053 13.2841C-0.211684
                        14.1308 -0.211684 15.5042 0.635053 16.351L5.82763 20.8111C6.67437 21.6578 8.04706
                        21.6578 8.89455 20.8111C8.97953 20.7261 9.05058 20.6316 9.1187 20.5371C9.13113 20.5254
                        9.14505 20.5173 9.15752 20.5056L23.3567 6.30569C24.2144 5.44797 24.2144 4.05625
                        23.3567 3.19854Z"
                    fill="#1C6445"
                />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: "GtPaymentMethod",
    props: {
        method: Object,
        selected: Boolean,
        disable: Boolean,
    },
    computed: {
        imageUrl() {
            return "payment-method__icon--" + this.method.types[0];
        },
        paymentDisabledMessage() {
            return this.$store.state.data.messages.paymentDisabled;
        },
    },
};
</script>

<style lang="less">
.payment-method {
    flex: 0 0 calc(50% - @grid-half-gutter-phone-s * 2 - 2px);
    width: calc(50% - @grid-half-gutter-phone-s * 2);
    margin: @grid-half-gutter-phone-s;

    &__title-icon {
        &--in {
            width: calc(50vw - @grid-half-gutter-phone-s * 5 - 2em - 4px);
            height: calc(50vw - @grid-half-gutter-phone-s * 5 - 2em - 4px);
        }
    }
    &__title {
        font-size: 1em;
        font-weight: 500;
        margin: 1em 0 0;
    }
    &__fog-message {
        font-size: 0.9em;
    }
    &__icon {
        top: 0.5em;
        right: 0.5em;
    }
}
@media (min-width: @screen__gta-phone-m) {
    .payment-method {
        &__fog-message {
            font-size: 1em;
        }
        &__fog-message {
            align-items: center;
        }
    }
}

@media (min-width: @screen__gta-tablet-s) {
    .payment-method {
        flex: 0 0 calc(33.333333% - @grid-half-gutter-tablet-s);
        width: calc(33.333333% - @grid-half-gutter-tablet-s);
        margin: calc(@grid-half-gutter-tablet-s / 2);
        &__title-icon {
            &--in {
                width: calc(33.333333vw - @grid-half-gutter-tablet-s * 5 - 2em - 6px);
                height: calc(33.333333vw - @grid-half-gutter-tablet-s * 5 - 2em - 6px);
            }
        }
    }
}

@media (min-width: @screen__gta-tablet-m) {
    .payment-method {
        flex: 0 0 calc(25% - @grid-half-gutter-tablet-m - 2px);
        width: calc(33.333333% - @grid-half-gutter-tablet-m);
        margin: calc(@grid-half-gutter-tablet-m / 2);
        &__title-icon {
            &--in {
                width: calc(25vw - @grid-half-gutter-tablet-m * 5 - 2em - 6px);
                height: calc(25vw - @grid-half-gutter-tablet-m * 5 - 2em - 6px);
            }
        }
    }
}

@media (min-width: @screen__gta-desktop-xs) {
    .payment-method {
        flex: 0 0 calc(25% - 0.5em);
        margin: 0.25em;
        &__title-icon {
            &--in {
                width: 9em;
                height: 9em;
            }
        }
        &__icon {
            top: 1em;
            right: 1em;
        }
    }
}
</style>

<style lang="less" scoped>
.payment-method {
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: @border-extra;
    position: relative;

    &:hover {
        box-shadow: @shadow-corporate;

        & svg path {
            fill: @color-corporate-rgb;
            fill-opacity: 0.9;
        }
    }
    &__fog {
        display: none;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        background-color: @color-border-extra;
        transition: opacity 6s ease-in-out;
    }

    &__fog-message {
        display: flex;
        background-color: @color-bg-fog;
        color: @color-bg-checkout;
        text-align: center;
        padding: 1em;
        margin: 1em;
        height: calc(100% - 2em);
    }

    &--disable {
        pointer-events: none;
        opacity: 0.84;
        filter: grayscale(100%);

        & .payment-method__fog {
            display: flex;
            opacity: 1;
        }

        & .payment-method__title {
            opacity: 0.48;
        }
    }

    &--selected {
        & .payment-method__title-icon {
            border: @border-corporate;
            color: @color-corporate;
        }

        & .payment-method__icon {
            opacity: 1;
        }

        & svg path {
            fill: @color-corporate-rgb;
            fill-opacity: 0.9;
        }
    }

    &__title {
        display: flex;
        align-items: center;
        text-align: center;
        color: @color-font-black-light;
        border-bottom: 4px solid transparent;
    }

    & svg {
        width: 1.6em;
        height: 1.6em;
    }

    &__title-icon {
        border-radius: 50%;
        border: @border-transparent;

        &--in {
            background-size: contain;
            border: 0.5em solid rgba(255, 255, 255, 0.84);
            border-radius: 50%;
        }
    }

    &__icon {
        position: absolute;
        opacity: 0;

        &--prepaid {
            background-image: url(../../../assets/payment-online.jpg);
        }

        &--postpaid {
            background-image: url(../../../assets/postpayment.jpg);
        }

        &--invoice {
            background-image: url(../../../assets/payment-invoice.jpg);
        }

        &--manager {
            background-image: url(../../../assets/payment-voice.jpg);
        }
    }
}
</style>

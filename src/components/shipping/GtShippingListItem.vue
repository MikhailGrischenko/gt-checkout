<template>
    <div
        class="shipping-method__item"
        @click="$emit('item-selected', item.id, null, item.group)"
        :class="{'shipping-method__item--selected': selected}"
    >
        <div class="shipping-method__check-icon" :class="{'shipping-method__check-icon--selected': selected}">
            <div class="shipping-method__checkbox-box"></div>
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
        <div class="shipping-method__title">
            <span class="shipping-method__name">{{ item.name }}</span>
            <span class="shipping-method__description">{{ item.description }}</span>
        </div>
        <div class="shipping-method__available">{{ item.available }}</div>
        <div class="shipping-method__price">
            <div v-if="!shippingItemDefault">
                <div v-if="item.price">
                    {{ formatPrice(item.price) }}
                    <span class="shipping-method__currency">{{ currency }}</span>
                </div>
                <div v-else>{{ freeCharge }}</div>
            </div>
        </div>
        <div class="shipping-method__button" v-if="buttonMapView">
            <button class="shipping-method__button--map" @click.stop="viewPickupPoint">
                {{ item.group ? labelSelectIssuePoint : labelShowOnMap }}
            </button>
        </div>
        <div class="shipping-method__payment-icons">
            <gt-tooltip :message="messageTooltipIconCash">
                <div
                    class="shipping-method__payment-icon shipping-method__payment-icon--cash"
                    :class="{'shipping-method__payment-icon--active': isPaymentAvailable('cash')}"
                >
                    <svg width="576" height="576" viewBox="0 0 576 576" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="576" height="576" fill="white" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M552 305.855C507.54 373.636 406.067 421 288 421C169.933 421 68.4604 373.636 24 305.855V324H24.0191C24.0064 324.666 24 325.333 24 326C24 368.498 49.8391 409.911 97.6661 441.795C145.325 473.568 212.548 494 288 494C363.452 494 430.675 473.568 478.334 441.795C526.161 409.911 552 368.498 552 326C552 325.333 551.994 324.666 551.981 324H552V305.855ZM575.996 230C575.999 229.667 576 229.334 576 229C576 122.961 447.058 37 288 37C128.942 37 0 122.961 0 229C0 229.334 0.00127568 229.667 0.00382397 230H0V324H0.015302C0.00510889 324.666 0 325.333 0 326C0 432.039 128.942 518 288 518C447.058 518 576 432.039 576 326C576 325.333 575.995 324.666 575.985 324H576V230H575.996ZM97.6661 113.205C49.8391 145.089 24 186.502 24 229C24 271.498 49.8391 312.911 97.6661 344.795C145.325 376.568 212.548 397 288 397C363.452 397 430.675 376.568 478.334 344.795C526.161 312.911 552 271.498 552 229C552 186.502 526.161 145.089 478.334 113.205C430.675 81.4319 363.452 61 288 61C212.548 61 145.325 81.4319 97.6661 113.205ZM209.632 238.792H175.072V257.512H209.632V275.656H175.072V294.376H209.632V317.704C203.872 318.472 197.824 319.528 191.488 320.872C185.44 322.216 179.68 323.944 174.208 326.056V337H318.064V326.056C312.016 324.136 305.104 322.504 297.328 321.16C289.84 319.624 282.208 318.472 274.432 317.704V294.376H344.416V275.656H274.432V257.512H300.784C317.488 257.512 333.184 256.36 347.872 254.056C362.56 251.56 375.376 247.816 386.32 242.824C397.552 237.64 406.336 231.112 412.672 223.24C419.296 215.176 422.608 205.48 422.608 194.152C422.608 182.44 419.296 172.648 412.672 164.776C406.048 156.904 397.264 150.664 386.32 146.056C375.376 141.256 362.848 137.896 348.736 135.976C334.624 134.056 319.936 133.096 304.672 133.096C292.288 133.096 279.328 133.48 265.792 134.248C252.544 135.016 240.16 135.4 228.64 135.4H174.208V146.344C179.104 148.264 184.576 149.992 190.624 151.528C196.672 152.872 203.008 153.928 209.632 154.696V238.792ZM282.64 152.392C285.808 152.008 289.984 151.816 295.168 151.816C313.312 151.816 327.136 155.368 336.64 162.472C346.432 169.576 351.328 180.616 351.328 195.592C351.328 203.464 349.888 210.184 347.008 215.752C344.416 221.128 340.528 225.544 335.344 229C330.16 232.456 323.968 234.952 316.768 236.488C309.856 238.024 302.08 238.792 293.44 238.792H274.432V153.544C277.024 152.968 279.76 152.584 282.64 152.392Z"
                            fill="black"
                            fill-opacity="0.24"
                        />
                    </svg>
                </div>
            </gt-tooltip>
            <gt-tooltip :message="messageTooltipIconCard">
                <div
                    class="shipping-method__payment-icon shipping-method__payment-icon--card"
                    :class="{'shipping-method__payment-icon--active': isPaymentAvailable('pos')}"
                >
                    <svg width="576" height="576" viewBox="0 0 576 576" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="576" height="576" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 108C0 101.373 5.37258 96 12 96H564C570.627 96 576 101.373 576 108V192V288V468C576 474.627 570.627 480 564 480H12C5.37258 480 0 474.627 0 468V288V192V108ZM24 288V444C24 450.627 29.3726 456 36 456H540C546.627 456 552 450.627 552 444V288H24ZM552 192H24V132C24 125.373 29.3726 120 36 120H540C546.627 120 552 125.373 552 132V192Z"
                            fill="black"
                            fill-opacity="0.24"
                        />
                    </svg>
                </div>
            </gt-tooltip>
            <gt-tooltip :message="messageTooltipIconOnline">
                <div
                    class="shipping-method__payment-icon shipping-method__payment-icon--online"
                    :class="{'shipping-method__payment-icon--active': isPaymentAvailable('prepaid')}"
                >
                    <svg width="576" height="576" viewBox="0 0 576 576" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="576" height="576" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 60C0 53.3726 5.37258 48 12 48H564C570.627 48 576 53.3726 576 60V420C576 426.627 570.627 432 564 432H12C5.37258 432 0 426.627 0 420V60ZM24 84C24 77.3726 29.3726 72 36 72H540C546.627 72 552 77.3726 552 84V396C552 402.627 546.627 408 540 408H36C29.3726 408 24 402.627 24 396V84ZM288 456C281.373 456 276 461.373 276 468V504H156C149.373 504 144 509.373 144 516C144 522.627 149.373 528 156 528H288H420C426.627 528 432 522.627 432 516C432 509.373 426.627 504 420 504H300V468C300 461.373 294.627 456 288 456ZM148.824 270.668C153.145 261.699 155.305 251.391 155.305 239.742V234.246C155.25 222.762 153.008 212.59 148.578 203.73C144.203 194.816 138.051 187.953 130.121 183.141C122.191 178.328 113.168 175.922 103.051 175.922C92.8242 175.922 83.6914 178.355 75.6523 183.223C67.668 188.09 61.5156 195.008 57.1953 203.977C52.9297 212.891 50.7969 223.199 50.7969 234.902V241.629C51.0156 252.895 53.3125 262.875 57.6875 271.57C62.1172 280.266 68.2695 286.965 76.1445 291.668C84.0195 296.316 93.043 298.641 103.215 298.641C113.387 298.641 122.438 296.234 130.367 291.422C138.352 286.555 144.504 279.637 148.824 270.668ZM120.031 207.75C124.023 213.875 126.02 222.871 126.02 234.738V240.234C125.965 251.828 123.969 260.715 120.031 266.895C116.094 273.074 110.488 276.164 103.215 276.164C95.5586 276.164 89.7891 273.02 85.9062 266.73C82.0234 260.441 80.082 251.445 80.082 239.742L80.1641 230.965C80.9844 209.309 88.6133 198.48 103.051 198.48C110.434 198.48 116.094 201.57 120.031 207.75ZM195.172 218.66L194.27 208.242H168.348V297H195.992V234.328C198.617 230.062 202.637 227.93 208.051 227.93C212.809 227.93 216.09 228.996 217.895 231.129C219.699 233.207 220.602 236.488 220.602 240.973V297H248.328V239.824C248.164 228.723 245.785 220.41 241.191 214.887C236.652 209.363 229.762 206.602 220.52 206.602C209.746 206.602 201.297 210.621 195.172 218.66ZM265.145 297H292.871V171H265.145V297ZM311.41 297H339.137V208.242H311.41V297ZM314.035 175.676C311.191 178.191 309.77 181.418 309.77 185.355C309.77 189.293 311.191 192.52 314.035 195.035C316.879 197.551 320.57 198.809 325.109 198.809C329.648 198.809 333.34 197.551 336.184 195.035C339.027 192.52 340.449 189.293 340.449 185.355C340.449 181.418 339.027 178.191 336.184 175.676C333.34 173.16 329.648 171.902 325.109 171.902C320.57 171.902 316.879 173.16 314.035 175.676ZM382.531 218.66L381.629 208.242H355.707V297H383.352V234.328C385.977 230.062 389.996 227.93 395.41 227.93C400.168 227.93 403.449 228.996 405.254 231.129C407.059 233.207 407.961 236.488 407.961 240.973V297H435.688V239.824C435.523 228.723 433.145 220.41 428.551 214.887C424.012 209.363 417.121 206.602 407.879 206.602C397.105 206.602 388.656 210.621 382.531 218.66ZM460.953 286.5C469.375 294.594 480.395 298.641 494.012 298.641C501.285 298.641 508.066 297.246 514.355 294.457C520.699 291.613 525.594 287.812 529.039 283.055L516.406 268.125C511.484 274.25 504.648 277.312 495.898 277.312C490.594 277.312 486.273 275.891 482.938 273.047C479.602 270.203 477.441 266.293 476.457 261.316H531.418V250.57C531.418 236.734 527.809 225.961 520.59 218.25C513.371 210.484 503.527 206.602 491.059 206.602C482.199 206.602 474.543 208.516 468.09 212.344C461.637 216.117 456.715 221.477 453.324 228.422C449.988 235.367 448.32 243.379 448.32 252.457V254.754C448.32 267.77 452.531 278.352 460.953 286.5ZM476.457 244.008C477.988 233.289 482.801 227.93 490.895 227.93C495.27 227.93 498.633 229.16 500.984 231.621C503.336 234.027 504.457 237.445 504.348 241.875V244.008H476.457Z"
                            fill="black"
                            fill-opacity="0.24"
                        />
                    </svg>
                </div>
            </gt-tooltip>
            <gt-tooltip :message="messageTooltipIconInvoice">
                <div
                    class="shipping-method__payment-icon shipping-method__payment-icon--invoice"
                    :class="{'shipping-method__payment-icon--active': isPaymentAvailable('invoice')}"
                >
                    <svg width="576" height="576" viewBox="0 0 576 576" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="576" height="576" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M333.009 0H84C77.3726 0 72 5.37258 72 12V564C72 570.627 77.3726 576 84 576H491.959C498.587 576 503.959 570.627 503.959 564V175.964L504 176L504 142.066L344.253 0.0553203L333.071 0.0554207L333.009 0ZM332.927 24L332.975 24.0428V139.97C332.975 146.598 338.348 151.97 344.975 151.97H476.955L476.962 151.976V540C476.962 546.627 471.589 552 464.962 552H110.997C104.37 552 98.9975 546.627 98.9975 540V36C98.9975 29.3726 104.37 24 110.997 24H332.927ZM449.943 127.97H371.973C365.345 127.97 359.973 122.598 359.973 115.97V48.0303L449.943 127.97ZM152.992 239C152.992 232.373 158.365 227 164.992 227H410.967C417.594 227 422.967 232.373 422.967 239C422.967 245.627 417.594 251 410.967 251H164.992C158.365 251 152.992 245.627 152.992 239ZM164.992 299C158.365 299 152.992 304.373 152.992 311C152.992 317.627 158.365 323 164.992 323H410.967C417.594 323 422.967 317.627 422.967 311C422.967 304.373 417.594 299 410.967 299H164.992ZM152.992 383C152.992 376.373 158.365 371 164.992 371H410.967C417.594 371 422.967 376.373 422.967 383C422.967 389.627 417.594 395 410.967 395H164.992C158.365 395 152.992 389.627 152.992 383ZM164.992 443C158.365 443 152.992 448.373 152.992 455C152.992 461.627 158.365 467 164.992 467H410.967C417.594 467 422.967 461.627 422.967 455C422.967 448.373 417.594 443 410.967 443H164.992Z"
                            fill="black"
                            fill-opacity="0.24"
                        />
                    </svg>
                </div>
            </gt-tooltip>
        </div>
    </div>
</template>

<script>
import {formatNumber} from "../../lib/format";
import GtTooltip from "../basic/GtTooltip";

export default {
    name: "GtShippingListItem",
    components: {GtTooltip},
    props: {
        item: Object,
        selected: Boolean,
        buttonMapView: Boolean,
        shippingItemDefault: Boolean,
    },
    computed: {
        currency() {
            return this.$store.state.summary.currency;
        },
        labelShowOnMap() {
            return this.$store.state.data.labelButtons.showOnMap;
        },
        labelSelectIssuePoint() {
            return this.$store.state.data.labelButtons.selectIssuePoint;
        },
        freeCharge() {
            return this.$store.state.data.shippingListItem.freeCharge;
        },
        messageTooltipIconCash() {
            if (this.isPaymentAvailable("cash")) {
                return this.$store.state.data.messages.messageTooltipIconCashOpen;
            } else {
                return this.$store.state.data.messages.messageTooltipIconCashClose;
            }
        },
        messageTooltipIconCard() {
            if (this.isPaymentAvailable("pos")) {
                return this.$store.state.data.messages.messageTooltipIconCardOpen;
            } else {
                return this.$store.state.data.messages.messageTooltipIconCardClose;
            }
        },
        messageTooltipIconOnline() {
            if (this.isPaymentAvailable("prepaid")) {
                return this.$store.state.data.messages.messageTooltipIconOnlineOpen;
            } else {
                return this.$store.state.data.messages.messageTooltipIconOnlineClose;
            }
        },
        messageTooltipIconInvoice() {
            if (this.isPaymentAvailable("invoice")) {
                return this.$store.state.data.messages.messageTooltipIconInvoiceOpen;
            } else {
                return this.$store.state.data.messages.messageTooltipIconInvoiceClose;
            }
        },
    },
    methods: {
        isPaymentAvailable($type) {
            return this.item.payment_methods ? this.item.payment_methods.indexOf($type) > -1 : false;
        },
        viewPickupPoint() {
            this.$emit("showPickupPoint", this.item.group, this.item.id);
        },
        formatPrice(price, digits = 2) {
            return formatNumber(price, digits);
        },
    },
};
</script>

<style lang="less">
.shipping-method {
    &__item {
        display: grid;
        align-items: center;
        grid-template-columns: 50% calc(50% - 2.5em) 2.5em;
        grid-template-rows: auto auto auto;
        cursor: pointer;

        padding: @grid-half-gutter-phone-s @grid-half-gutter-phone-s @grid-half-gutter-phone-s
            calc(@grid-half-gutter-phone-s * 2);
    }

    &__check-icon {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;
    }
    &__title {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
        padding: 0.8em 0;
    }
    &__name {
        cursor: text;
    }
    &__available {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;
        justify-self: start;
        padding: 0.2em 0;
        font-size: 0.9em;
    }
    &__price {
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;
        justify-self: end;
        padding: 0.2em 0;
        font-size: 0.9em;
    }
    &__button {
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 3;
        grid-row-end: 4;
        justify-self: end;
    }
    &__payment-icons {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 3;
        grid-row-end: 4;
        justify-self: start;
        padding: 0.2em 0;
    }
}

@media (min-width: @screen__gta-tablet-s) {
    .shipping-method {
        &__item {
            grid-template-columns: auto auto auto 2.5em;
            grid-template-rows: auto auto;
        }

        &__check-icon {
            grid-column-start: 4;
            grid-column-end: 5;
            grid-row-start: 1;
            grid-row-end: 2;
        }
        &__title {
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 2;
        }
        &__available {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 3;
            padding: 0.2em;
            justify-self: end;
        }
        &__price {
            grid-column-start: 3;
            grid-column-end: 4;
            grid-row-start: 2;
            grid-row-end: 3;
            padding: 0.2em;
        }
        &__button {
            grid-column-start: 3;
            grid-column-end: 4;
            grid-row-start: 1;
            grid-row-end: 2;
            padding: 0.2em;
        }
        &__payment-icons {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 2;
            grid-row-end: 3;
            padding: 0.2em;
        }
    }
}

@media (min-width: @screen__gta-tablet-m) {
    .shipping-method {
        &__item {
            grid-template-columns: 2.5em auto 8em 8em 6.4em;
            grid-template-rows: auto auto;
        }

        &__check-icon {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 3;
        }
        &__title {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 3;
        }
        &__available {
            grid-column-start: 4;
            grid-column-end: 5;
            grid-row-start: 1;
            grid-row-end: 2;
            justify-self: center;
        }
        &__price {
            grid-column-start: 4;
            grid-column-end: 5;
            grid-row-start: 2;
            grid-row-end: 3;
            justify-self: center;
        }
        &__button {
            grid-column-start: 3;
            grid-column-end: 4;
            grid-row-start: 1;
            grid-row-end: 3;
            justify-self: center;
        }
        &__payment-icons {
            grid-column-start: 5;
            grid-column-end: 6;
            grid-row-start: 1;
            grid-row-end: 3;
        }
    }
}
</style>

<style lang="less" scoped>
.shipping-method {
    &__item {
        align-items: center;
        position: relative;
        color: @color-font-black-standart;
        border-bottom: @border-extra;

        &:first-child {
            border-top: @border-extra;
        }

        &--selected {
            color: @color-corporate;
        }

        &::before {
            content: "";
            height: 100%;
            width: 4px;
            background-color: transparent;
            position: absolute;
            left: 0;
        }

        &:hover {
            box-shadow: @shadow-corporate-lite;
        }

        &&:hover::before {
            background-color: @color-corporate;
        }
    }

    &__check-icon {
        width: 1.5em;
        height: 1.5em;
        display: flex;
        margin: 0.5em;
        position: relative;

        & svg {
            width: 100%;
            height: 100%;
            opacity: 0;
        }

        &--selected svg {
            opacity: 1;
        }
    }

    &__checkbox-box {
        width: 1.2em;
        height: 1.2em;
        left: 0;
        bottom: 0;
        position: absolute;
        border-radius: 4px;
        border: @border-light;
    }

    &__title {
        flex: 1 1 auto;
    }

    &__description {
        padding-left: 0.5em;
        font-weight: lighter;
        font-size: 0.8em;
    }

    &__button {
        flex: 0 0 13em;
        display: flex;
        justify-content: center;
        align-items: center;

        &--map {
            margin-left: 0.5em;
            font-size: 0.9em;
            font-weight: lighter;
            display: flex;
            justify-content: center;
            background-color: @color-bg-checkout;
            border-radius: 2px;
            border: @border-light;
            color: @color-font-black-light;

            &:hover {
                border: @border-corporate;
                color: @color-corporate;
            }
        }
    }

    &__payment-icons {
        display: flex;
        justify-content: center;
    }

    &__payment-icon {
        width: 1.5em;
        height: 1.5em;
        padding: 0.1em;

        & svg {
            width: 100%;
            height: 100%;
        }

        &--active svg path {
            fill: @color-corporate;
            fill-opacity: 0.87;
        }
    }
}
</style>

<template>
    <gt-waiting-spinner :visible="waitingSpinnerDeleteVisible">
        <article class="gt-product">
            <div class="gt-product__image">
                <div class="gt-product__image--placeholder"><img :src="productData.image" /></div>
            </div>
            <div class="gt-product__description">
                <h4 class="gt-product__title">{{ productData.title }}</h4>
                <div class="gt-product__properties">
                    <div class="product-sku gt-product__property">
                        <span class="gt-product__property--title">Артикул:</span>
                        <span class="gt-product__property--data">{{ productData.sku }}</span>
                    </div>
                    <div class="product-price gt-product__property">
                        <span class="gt-product__property--title">Цена:</span>
                        <span class="gt-product__property--data">
                            {{ formatPrice(productData.price) }}&nbsp;{{ currency }}
                        </span>
                    </div>
                </div>
            </div>
            <gt-waiting-spinner :visible="waitingSpinnerQuantityVisible">
                <div class="gt-product__cost">
                    <button class="gt-product__button--remove" @click="deleteProductItem">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.00128 10.827L12.2441 15.0699L15.0726 12.2414L10.8297 7.99858L15.0718 3.75646L12.2434 0.928037L8.00128 5.17015L3.75886 0.927734L0.930432 3.75616L5.17285 7.99858L0.929688 12.2417L3.75811 15.0702L8.00128 10.827Z"
                                fill="black"
                                fill-opacity="0.24"
                            />
                        </svg>
                    </button>
                    <gt-spinner-quantity
                        :min="1"
                        :max="10000"
                        :integer-only="true"
                        v-model="quantity"
                        @input="throttleUpdateProductItem"
                    ></gt-spinner-quantity>
                    <div class="gt-product__cost--data">{{ formatPrice(productData.cost) }}&nbsp;{{ currency }}</div>
                </div>
            </gt-waiting-spinner>
        </article>
    </gt-waiting-spinner>
</template>

<script>
function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;
    if (null == wait) wait = 100;

    function later() {
        let last = Date.now() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    }

    return function() {
        context = this;
        args = arguments;
        timestamp = Date.now();
        let callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

import GtSpinnerQuantity from "../basic/GtSpinnerQuantity";
import {formatNumber} from "../../lib/format.js";
import GtWaitingSpinner from "../basic/GtWaitingSpinner";

export default {
    name: "GtCartListItem",
    components: {GtWaitingSpinner, GtSpinnerQuantity},
    data() {
        return {
            quantity: this.productData.quantity,
            delay: 1000,
            waitingSpinnerQuantityVisible: false,
            waitingSpinnerDeleteVisible: false,
        };
    },
    props: {
        productData: Object,
    },
    computed: {
        currency() {
            return this.$store.state.summary.currency;
        },
    },
    methods: {
        throttleUpdateProductItem: debounce(function() {
            this.updateProductItem();
        }, 600),
        updateProductItem() {
            if (this.productData.quantity === this.quantity) {
                return;
            }
            this.$emit("product-update", this);
        },
        deleteProductItem() {
            this.$emit("product-delete", this);
        },
        formatPrice(price, digits = 2) {
            return formatNumber(price, digits);
        },
        setQuantityUpdateMode(mode) {
            this.waitingSpinnerQuantityVisible = mode;
        },
        setQuantityDeleteMode(mode) {
            this.waitingSpinnerDeleteVisible = mode;
        },
        getProduct() {
            return this.productData;
        },
    },
};
</script>

<style lang="less">
.gt-product {
    flex-wrap: wrap;
    padding: calc(@grid-half-gutter-phone-s * 2) 0 0 0;
    justify-content: space-between;
    &__image {
        flex: 0 0 50%;
        max-width: 50%;
        order: 1;
        padding: 0 @grid-half-gutter-phone-s;
    }
    &__description {
        flex: 0 0 100%;
        max-width: 100%;
        order: 3;
        padding: 0 @grid-half-gutter-phone-s;
        margin: calc(@grid-half-gutter-phone-s * 2) 0;
    }
    &__title {
        font-size: 1.6rem;
    }
    &__properties {
        flex-direction: column;
        margin: @grid-half-gutter-phone-s 0;
    }
    &__property {
        padding: @grid-half-gutter-phone-s 0;
    }
    & .waiting-spinner {
        flex: 0 0 50%;
        max-width: 50%;
        order: 2;
    }
    &__cost {
        margin: 0 @grid-half-gutter-phone-s;
        justify-content: space-around;

        &--data {
            font-size: 1em;
        }
    }
}

@media (min-width: @screen__gta-tablet-s) {
    .gt-product {
        padding: calc(@grid-half-gutter-tablet-m * 2) 0 0 0;
        &__image {
            padding: 0 @grid-half-gutter-tablet-m;
            flex: 0 0 19rem;
            max-width: 19rem;
        }
        &__description {
            padding: 0 @grid-half-gutter-tablet-m;
            margin: calc(@grid-half-gutter-tablet-m * 2) 0;
        }
        &__title {
            font-size: 1.8rem;
        }
        &__properties {
            flex-direction: row;
            margin: @grid-half-gutter-tablet-m 0;
        }
        &__property {
            padding: @grid-half-gutter-tablet-m 0;
        }
        &__cost {
            margin: 0 @grid-half-gutter-tablet-m;
            max-height: 12em;
            &--data {
                font-size: 1.2em;
            }
        }
    }
}

@media (min-width: @screen__gta-tablet-m) {
    .gt-product {
        padding: @grid-half-gutter-tablet-m 0;
        flex-wrap: nowrap;
        &__image {
            flex: 0 0 20%;
            max-width: 20%;
            order: 0;
        }
        &__description {
            flex: 0 1 60%;
            max-width: 60%;
            order: 0;
            margin: @grid-half-gutter-tablet-m 0;
        }
        & .waiting-spinner {
            flex: 1 0 20%;
            order: 0;
        }
        &__cost {
            max-height: none;
        }
    }
}

@media (min-width: @screen__gta-desktop-xs) {
    .gt-product {
        flex-wrap: wrap;
        padding: @grid-half-gutter-desktop-xs 0;
        &__image {
            flex: 0 0 26%;
            max-width: 20%;
            order: 0;
            padding: 0 @grid-half-gutter-desktop-xs;
        }
        &__description {
            flex: 1 0 54%;
            order: 0;
            padding: 0 @grid-half-gutter-desktop-xs;
            margin: @grid-half-gutter-desktop-xs 0;
        }
        & .waiting-spinner {
            flex: 0 0 20%;
            order: 0;
        }
        &__cost {
            margin: 0 @grid-half-gutter-desktop-xs;
            justify-content: space-around;
        }
    }
}
@media (min-width: @screen__gta-desktop-s) {
    .gt-product {
        padding: @grid-half-gutter-desktop-s 0;
        &__image {
            padding: 0 @grid-half-gutter-desktop-s;
        }
        &__description {
            padding: 0 @grid-half-gutter-desktop-s;
            margin: @grid-half-gutter-desktop-s 0;
        }
        &__cost {
            margin: 0 @grid-half-gutter-desktop-s;
        }
    }
}
@media (min-width: @screen__gta-desktop-m) {
    .gt-product {
        padding: @grid-half-gutter-desktop-m 0;
        &__image {
            padding: 0 @grid-half-gutter-desktop-m;
        }
        &__description {
            padding: 0 @grid-half-gutter-desktop-m;
            margin: @grid-half-gutter-desktop-m 0;
        }
        &__cost {
            margin: 0 @grid-half-gutter-desktop-m;
        }
    }
}

@media (min-width: @screen__gta-desktop-l) {
    .gt-product {
        padding: @grid-half-gutter-desktop-l 0;
        &__image {
            padding: 0 @grid-half-gutter-desktop-l;
        }
        &__description {
            padding: 0 @grid-half-gutter-desktop-l;
            margin: @grid-half-gutter-desktop-l 0;
        }
        &__cost {
            margin: 0 @grid-half-gutter-desktop-l;
        }
    }
}

@media (min-width: @screen__gta-desktop-xl) {
    .gt-product {
        padding: @grid-half-gutter-desktop-xl 0;
        &__image {
            padding: 0 @grid-half-gutter-desktop-xl;
        }
        &__description {
            padding: 0 @grid-half-gutter-desktop-xl;
            margin: @grid-half-gutter-desktop-xl 0;
        }
        &__cost {
            margin: 0 @grid-half-gutter-desktop-xl;
        }
    }
}
</style>

<style scoped lang="less">
.gt-product {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    width: 100%;

    &__image {
        &--placeholder {
            background: url(https://via.placeholder.com/150) center no-repeat;
        }

        & img {
            width: 100%;
            height: 100%;
            border: 1px solid rgba(0, 0, 0, 0.16);
        }
    }

    &__description {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
    }

    &__title {
        margin: 0.6em 0 0.4em;
        font-weight: 600;
    }

    &__properties {
        display: flex;
        justify-content: space-around;
    }

    &__property {
        flex: 0 0 50%;

        &--title {
            color: rgba(0, 0, 0, 0.6);
            font-weight: lighter;
            padding-right: 0.5em;
        }
    }

    &__cost {
        -webkit-box-flex: 0;
        font-weight: bolder;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex: 1 0 20%;
    }

    &__button {
        &--remove {
            width: 2em;
            height: 2em;
            padding: 0.5em;
            margin: 0;
            border: 1px solid rgba(0, 0, 0, 0);
            border-radius: 2px;
            background: rgba(255, 255, 255, 0);
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                border: 1px solid rgba(0, 0, 0, 0.24);
            }

            & svg {
                width: 1em;
                height: 1em;
            }
        }
    }
}
</style>

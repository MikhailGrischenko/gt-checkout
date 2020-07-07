<template>
    <gt-block :block-name="blockName">
        <section class="gt-block-cart">
            <transition-group class="cart-list__list" name="cartlist" tag="ul">
                <li class="cart-list__item" v-for="productData in cartData" :key="productData.id">
                    <gt-cart-list-item
                        :product-data="productData"
                        @product-delete="productDelete"
                        @product-update="productUpdate"
                    ></gt-cart-list-item>
                </li>
            </transition-group>
            <div v-if="!cartData || !cartData.length" class="class-list__empty">
                <div class="cart-list__messages">
                    <div class="cart-list__message cart-list__message--info">{{ messageCartEmpty }}</div>
                    <div class="cart-list__message cart-list__message--action">{{ messageCartAction }}</div>
                </div>
                <gt-link
                    class="cart-list__action-button"
                    :label-link="getLabelButtonBackToShopping"
                    href-link="/"
                    style-link="primary"
                />
            </div>
        </section>
    </gt-block>
</template>

<script>
import GtCartListItem from "./GtCartListItem";
import GtBlock from "../basic/GtBlock";
import GtLink from "../basic/GtLink";

export default {
    name: "GtCartList",
    components: {
        GtBlock,
        GtCartListItem,
        GtLink,
    },
    computed: {
        blockName() {
            return this.$store.state.data.blockTitle.cartBlock;
        },
        cartData() {
            return this.$store.state.cart;
        },
        messageCartEmpty() {
            return this.$store.state.data.messages.cartListMessageEmpty;
        },
        messageCartAction() {
            return this.$store.state.data.messages.cartListMessageAction;
        },
        getLabelButtonBackToShopping() {
            return this.$store.state.data.labelButtons.backToShopping;
        },
    },
    methods: {
        async productDelete(item) {
            item.setQuantityDeleteMode(true);
            await this.updateCart(item.getProduct().id, 0);
            item.setQuantityDeleteMode(false);
        },
        async productUpdate(item) {
            item.setQuantityUpdateMode(true);
            await this.updateCart(item.getProduct().id, item.quantity);
            item.setQuantityUpdateMode(false);
        },
        async updateCart(id, quantity) {
            this.$emit("cart-updating", true);
            await this.$store.dispatch("updateCartAndGetNewCart", {
                productId: id,
                quantity: quantity,
            });
            this.$emit("cart-updating", false);
        },
    },
};
</script>

<style lang="less" scoped>
.class-list__empty {
    display: flex;
    flex-direction: column;
    min-height: 13.7em;
    justify-content: space-around;
    justify-content: space-evenly;
}

.cart-list {
    &__list {
        list-style-type: none;
        padding: 0;
        margin: 0;
        width: 100%;
    }

    &__item {
        margin: 0 4px 0.8em 4px;

        &:hover {
            box-shadow: @shadow-corporate;
        }
    }

    &__messages {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &__message {
        display: block;

        &--info {
        }

        &--action {
            color: @color-corporate;
            text-align: center;
        }
    }
}

.cartlist-enter-active,
.cartlist-leave-active {
    transition: opacity 0.5s;
}

.cartlist-enter,
.cartlist-leave-to {
    opacity: 0;
}
</style>

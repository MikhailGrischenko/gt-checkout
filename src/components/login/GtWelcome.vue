<template>
    <section class="checkout-block checkout-block__welcome">
        <h2 class="checkout-block__header">
            <span class="checkout-block__title">{{ blockName }}</span>
            <span class="checkout-block__subtitle" v-if="customerName">
                <span class="checkout-block__subtitle-prefix">{{ subtitlePrefix }}</span>
                <span class="customers__name">{{ customerName }}</span>
                <span class="customers__company">{{ customerCompany }}</span>
            </span>
        </h2>
    </section>
</template>

<script>
export default {
    name: "GtWelcome",
    computed: {
        blockName() {
            return this.$store.state.data.blockTitle.loginWelcome;
        },
        subtitlePrefix() {
            return this.$store.state.data.blockTitle.welcomeSubtitlePrefix;
        },
        customerName() {
            return this.$store.state.customer.name;
        },
        customerCompany() {
            return this.$store.state.customer.company;
        },
    },
};
</script>

<style lang="less" scoped>
.checkout-block {
    flex: 0 0 100%;
    max-width: 100%;
    margin: 0 0 1em;
    box-shadow: @shadow-corporate-checkout;
    background-color: @color-bg-checkout;

    &__welcome {
        padding-bottom: 0.6em;
    }

    &__header {
        color: @color-corporate-light;
        border-bottom: 4px solid @color-corporate-light;
        font-size: 1.25em;
        padding: 0.8em 1em 0.4em 1em;
        margin: 0 1em;
        font-weight: 600;
        font-family: "Eurostile", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        display: flex;
        justify-content: space-between;
    }

    &__subtitle-prefix {
        color: @color-font-black-light;
        font-weight: lighter;
        font-size: 0.8em;
        padding-right: 0.3em;
    }
}
.customers {
    &__name {
        font-weight: 600;
        font-style: italic;
    }

    &__company {
        font-weight: normal;
        font-style: italic;
    }
}
</style>

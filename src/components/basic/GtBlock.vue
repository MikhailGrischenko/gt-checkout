<template>
    <section class="checkout-block">
        <h2 class="checkout-block__title">{{ blockName }}</h2>
        <article class="checkout-block__main"><slot></slot></article>
    </section>
</template>

<script>
export default {
    name: "GtBlock",
    props: {
        blockName: {
            type: String,
            default: "Block",
        },
    },
};
</script>

<style lang="less">
.checkout-block__main {
    padding: 1em @grid-half-gutter-phone-s;
}
@media (min-width: @screen__gta-tablet-s) {
    .checkout-block__main {
        padding: 1em @grid-half-gutter-tablet-m;
    }
}

@media (min-width: @screen__gta-desktop-xs) {
    .checkout-block__main {
        padding: 1em @grid-half-gutter-desktop-xs;
    }
}

@media (min-width: @screen__gta-desktop-s) {
    .checkout-block__main {
        padding: 1em @grid-half-gutter-desktop-s;
    }
}

@media (min-width: @screen__gta-desktop-m) {
    .checkout-block__main {
        padding: 1em @grid-half-gutter-desktop-m;
    }
}

@media (min-width: @screen__gta-desktop-l) {
    .checkout-block__main {
        padding: 1em @grid-half-gutter-desktop-l;
    }
}

@media (min-width: @screen__gta-desktop-xl) {
    .checkout-block__main {
        padding: 1em @grid-half-gutter-desktop-xl;
    }
}
</style>

<style scoped lang="less">
.checkout-block {
    flex: 0 0 100%;
    max-width: 100%;
    margin: 0 0 1em;
    box-shadow: @shadow-corporate-checkout;
    background-color: @color-bg-checkout;
}
.checkout-block__title {
    color: @color-corporate-light;
    border-bottom: @border-corporate-light-wide;
    font-size: 1.25em;
    padding: 0.8em 1em 0.4em 1em;
    margin: 0 1em;
    font-weight: 600;
    font-family: @font-family-title;
}
</style>

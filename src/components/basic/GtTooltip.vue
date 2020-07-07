<template>
    <div class="gt-tooltip">
        <div class="gt-tooltip__message">{{ message }}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "GtTooltip",
    props: {
        message: {
            type: String,
        },
    },
};
</script>

<style lang="less" scoped>
.gt-tooltip {
    position: relative;

    &__message {
        position: absolute;
        background-color: @color-corporate;
        color: @color-bg-checkout;
        bottom: 2.3em;
        left: -1.3em;
        display: none;
        padding: 1em;
        z-index: 50;
        font-size: 0.8em;
        box-shadow: @shadow-corporate;
        min-width: 14em;
        transition: All @transition-faster 0.3s;

        &::before {
            content: "";
            width: 2em;
            height: 2em;
            transform: rotate(45deg);
            position: absolute;
            left: 1em;
            bottom: -0.5em;
            background-color: @color-corporate;
            z-index: -1;
        }
    }

    &:hover .gt-tooltip__message {
        display: block;
    }
}
</style>

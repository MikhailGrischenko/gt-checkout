<template>
    <div class="button-wrapper">
        <a
            :href="hrefLink"
            :class="['button', 'gtux-interaction', 'button--' + this.styleLink, {'button--disable': disable}]"
        >
            <div class="button__icon" v-if="iconsEnabled">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 14.8301L4.34277
                                18.4863L1.51465 15.6582L5.17188
                                12H0V8H5.17188L1.51465
                                4.34375L4.34277
                                1.51562L8
                                5.17188V0H12V5.17188L15.6572
                                1.51562L18.4854
                                4.34375L14.8281
                                8H20V12H14.8281L18.4854
                                15.6582L15.6572
                                18.4863L12
                                14.8301V20H8V14.8301Z"
                        fill="white"
                        fill-opacity="1"
                    />
                </svg>
            </div>
            <span class="button__label">{{ labelLink }}</span>
        </a>
    </div>
</template>

<script>
export default {
    name: "GtLink",
    props: {
        labelLink: String, //
        iconsEnabled: Boolean, // "true" or "false"
        hrefLink: String, //
        styleLink: String, // "primary", "secondary" or "tertiary"
        disable: Boolean, //
    },
};
</script>

<style lang="less">
.button__label {
    padding: 1em 1em 1.05em 1em;
    font-size: 0.9em;
}
@media (min-width: @screen__gta-tablet-s) {
    .button__label {
        padding: 0.5em 1.5em 0.55em 1.15em;
        font-size: 1em;
    }
}
</style>

<style scoped lang="less">
.button-wrapper {
    padding: 0 1em 0 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button {
    display: flex;
    align-items: center;
    border-radius: 4px;
    margin: 0;
    padding: 0;
    text-decoration: none;
    font-family: @font-family-normal;
}

.button:hover {
    background-color: @color-corporate-light;
    border-color: @color-corporate-light;
    color: @color-bg-checkout;
}

.button__icon {
    padding: 0.5em 0 0.55em 1.5em;
    margin-right: -0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1em;
    width: 1em;
}

.button__label {
    line-height: 1.2;
}

.button--primary {
    background-color: @color-corporate;
    color: @color-bg-checkout;
    border: @border-corporate;
}

.button--secondary {
    background-color: @color-bg-checkout;
    color: @color-corporate;
    border: @border-corporate;
}

.button--secondary:hover {
    color: @color-bg-checkout;
}

.button--tertiary {
    background-color: @color-bg-checkout;
    color: @color-corporate;
    border: 1px solid white;
}

.button--tertiary:hover {
}

.button--disable {
    pointer-events: none;
    background-color: @color-bg-disabled;
    color: @color-font-disabled;
    border-color: @color-border-disabled;
}
</style>

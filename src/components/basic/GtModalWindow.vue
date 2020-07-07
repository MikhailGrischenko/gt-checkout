<template>
    <section class="checkout-modal-window" v-if="isOpen" @click="close">
        <div class="checkout-modal-window__window" @click.stop="">
            <h2 class="checkout-modal-window__title checkout-modal-window__closing">
                <span>{{ windowName }}</span>
                <gt-button-close @click-button-close="close"></gt-button-close>
            </h2>
            <article class="checkout-modal-window__main"><slot></slot></article>
        </div>
    </section>
</template>

<script>
import GtButtonClose from "../basic/GtButtonClose";

export default {
    name: "GtModalWindow",
    components: {GtButtonClose},
    data() {
        return {
            isOpen: false,
            windowName: "",
        };
    },
    methods: {
        setTitle(title) {
            this.windowName = title;
        },
        close() {
            this.isOpen = false;
        },
        open() {
            this.isOpen = true;
        },
    },
};
</script>

<style scoped lang="less">
.checkout-modal-window {
    width: 100vw;
    height: 100vh;
    background-color: @color-border-light;
    position: fixed;
    padding: 5% 10%;
    box-sizing: border-box;
    left: 0;
    top: 0;
    z-index: 555;
}
.checkout-modal-window__window {
    background-color: @color-bg-modal-window;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: @shadow-corporate-lite;
}

.checkout-modal-window__title {
    color: white;
    background: @color-corporate-light;
    font-size: 1.25em;
    padding: 0.625em 1.5em;
    margin: 0;
}

.checkout-modal-window__closing {
    display: flex;
    justify-content: space-between;
    padding: 0.625em 0.625em 0.625em 1.5em;
}

.checkout-modal-window__main {
    padding: 1em;
    flex: 1 1 auto;
    align-self: stretch;
    display: flex;
}
</style>

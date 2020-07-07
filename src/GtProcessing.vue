<template>
    <div class="checkout-main container">
        <gt-page-title :title="title"></gt-page-title>
        <gt-messages></gt-messages>
        <section class="processing-content">
            <div class="processing-messages">
                <p class="processing-message processing-message--result">{{ messageResult }}</p>
                <p class="processing-message processing-message--state">{{ messageState }}</p>
                <p class="processing-message processing-message--action">{{ messageAction }}</p>
                <div class="processing-spinner">
                    <gt-waiting-spinner :visible="true">
                        <div class="processing-spinner__empty-content"></div>
                    </gt-waiting-spinner>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import GtPageTitle from "./components/GtPageTitle";
import GtMessages from "./components/Messages/GtMessages";
import GtWaitingSpinner from "./components/basic/GtWaitingSpinner";

export default {
    name: "GtProcessing",
    components: {
        GtMessages,
        GtPageTitle,
        GtWaitingSpinner,
    },
    mounted: function() {
        this.$store.commit("setOrder");
        this.$store.dispatch("placeOrder");
        window.scrollTo({top: 0});
    },
    computed: {
        title() {
            return this.$store.state.data.blockTitle.gtProcessing;
        },
        messageResult() {
            return this.$store.state.data.messages.gtProcessingMessageResult;
        },
        messageState() {
            return this.$store.state.data.messages.gtProcessingMessageState;
        },
        messageAction() {
            return this.$store.state.data.messages.gtProcessingMessageAction;
        },
    },
};
</script>

<style scoped lang="less">
.checkout-main {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    position: relative;
}
.processing {
    &-content {
        min-height: 50vh;
        padding-bottom: 2em;
    }
    &-message {
        text-align: center;
        &--result,
        &--state {
            display: none;
        }
    }
    &-spinner {
        width: 15em;
        height: 15em;
        margin: 2em auto;

        &__empty-content {
            width: 15em;
            height: 15em;
        }
    }
}
</style>

<template>
    <li
        class="gtux-interaction messages__item messages__item--active message"
        :class="{'message--error': message.type === 'error'}"
    >
        <div class="message__icon" :class="{'message__icon--error': message.type === 'error'}"></div>
        <div class="message__text">
            <div class="message__title">{{ message.title }}</div>
            <p class="message__description">{{ message.description }}</p>
        </div>
        <div class="message__button"><gt-button-close @click-button-close="deleteMessage"></gt-button-close></div>
    </li>
</template>

<script>
import GtButtonClose from "../basic/GtButtonClose";

export default {
    name: "GtMessageItem",
    components: {GtButtonClose},
    props: {
        id: {
            type: [String, Number],
            default: "default",
        },
        message: Object,
    },
    methods: {
        deleteMessage() {
            this.$store.commit("deleteMessage", this.id);
        },
    },
};
</script>
<style lang="less">
.message {
    &__title {
        font-weight: 500;
        font-family: @font-family-title;
        font-size: 1.1em;
    }
    &__description {
    }
}
</style>

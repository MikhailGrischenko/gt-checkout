<template>
    <section class="messages-vue">
        <ul class="messages messages-vue__list">
            <gt-message-item
                v-for="(message, index) in messages"
                :key="index"
                :id="index"
                :message="message"
            ></gt-message-item>
        </ul>
    </section>
</template>

<script>
import GtMessageItem from "./GtMessageItem";

export default {
    name: "GtMessages",
    components: {GtMessageItem},
    computed: {
        messages() {
            return this.$store.state.messages;
        },
    },
};
</script>

<style scoped>
.messages-vue {
    margin: 0.5em 1em;
    padding: 0;
    border-radius: 3px;
}

.messages-vue__list {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
</style>

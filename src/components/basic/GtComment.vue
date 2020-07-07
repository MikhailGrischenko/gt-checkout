<template>
    <gt-block :block-name="blockName">
        <div class="gt-comment">
            <div class="gt-comment__intro">
                <p class="gt-comment__intro-message" v-if="commentIntroMessage">{{ commentIntroMessage }}</p>
                <p :class="['gt-comment__counter', {'gt-comment__counter--max-limit': maxLimitCounter}]">
                    {{ counter }}/{{ maxlength }}
                </p>
            </div>
            <textarea
                class="gt-comment__text-area"
                :placeholder="commentPlaceholder"
                rows="4"
                v-model.trim="value"
                @input="$emit('change-comment', value)"
                @paste="$emit('change-comment', value)"
                :maxlength="maxlength"
            ></textarea>
        </div>
    </gt-block>
</template>

<script>
import GtBlock from "./GtBlock";

export default {
    name: "GtComment",
    components: {
        GtBlock,
    },
    props: {
        value: String,
        maxlength: {
            type: Number,
            default: 1000,
        },
    },
    computed: {
        blockName() {
            return this.$store.state.data.blockTitle.comment;
        },
        commentIntroMessage() {
            return this.$store.state.data.orderComment.introMessage;
        },
        commentPlaceholder() {
            return this.$store.state.data.orderComment.placeholder;
        },
        maxLimitCounter() {
            return this.value.length === this.maxlength;
        },
        counter() {
            if (this.value) {
                return this.value.length;
            }
            return 0;
        },
    },
};
</script>

<style scoped lang="less">
.gt-comment {
    &__intro {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__intro-message {
        padding: 0 1em;
        font-size: 0.9em;
    }

    &__counter {
        font-size: 0.8em;
        padding: 0 0.5em;
        color: @color-font-black-light;

        &--max-limit {
            color: @color-error;
        }
    }

    &__text-area {
        color: @color-font-black-standart;
        border: @border-extra;
        padding: 1em;

        &:focus,
        &:hover {
            border: @border-corporate-light;
        }
    }
}
</style>

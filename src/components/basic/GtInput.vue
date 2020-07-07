<template>
    <div class="gt-input">
        <label class="gt-input__label" :for="id">
            <div class="gt-input__header">
                <div class="gt-input__title">
                    <span class="gt-input__title-text">{{ label }}</span>
                    <sup class="gt-input__label--mandatory" v-if="mandatory">*</sup>
                </div>
                <div class="gt-input__counter" v-if="intMaxLength">
                    <span
                        :class="[
                            'gt-input__counter-value',
                            {'gt-input__counter--max-limit': maxLimitCounter},
                            {'gt-input__counter--min-limit': minLimitCounter},
                            {'gt-input__counter--verify': verify},
                        ]"
                    >
                        {{ counter }}/{{ textMaxLength }}
                    </span>
                </div>
            </div>
            <div class="gt-input__group">
                <input
                    @change="onChange"
                    @input="onInput"
                    v-if="!mask"
                    ref="clear"
                    class="gt-input__input"
                    v-model="value"
                    :name="id"
                    :type="type"
                    :placeholder="placeholder"
                    :pattern="pattern"
                    :required="mandatory"
                    :maxlength="maxlength"
                />
                <input
                    @change="onChange"
                    @input="onInput"
                    v-if="mask"
                    v-mask="mask"
                    ref="mask"
                    class="gt-input__input masked-input__input"
                    v-model="value"
                    :name="id"
                    :type="type"
                    :pattern="pattern"
                    :placeholder="placeholder"
                    :required="mandatory"
                />
                <div class="gt-input__verified" v-if="verify">
                    <div class="gt-input__verified-checkbox-box"></div>
                    <div class="gt-input__verified-check" :class="{'gt-input__verified-check--checked': valid}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M23.3567 3.19854C22.4982 2.34007 21.1072 2.34007 20.2488 3.19854L7.17758
            16.2697L3.70197 13.2841C2.85523 12.4373 1.48254 12.4373 0.635053 13.2841C-0.211684
            14.1308 -0.211684 15.5042 0.635053 16.351L5.82763 20.8111C6.67437 21.6578 8.04706
            21.6578 8.89455 20.8111C8.97953 20.7261 9.05058 20.6316 9.1187 20.5371C9.13113 20.5254
            9.14505 20.5173 9.15752 20.5056L23.3567 6.30569C24.2144 5.44797 24.2144 4.05625
            23.3567 3.19854Z"
                                fill="#1C6445"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </label>
    </div>
</template>

<script>
import {mask} from "vue-the-mask";

export default {
    name: "GtInput",
    directives: {mask},
    props: {
        id: String,
        type: String,
        label: String,
        mandatory: Boolean,
        placeholder: String,
        value: {
            type: String,
            default: "",
        },
        valid: {
            type: Boolean,
            default: false,
        },
        name: String,
        mask: String,
        verify: {
            type: Boolean,
            default: false,
        },
        maxlength: {
            type: Number,
        },
        pattern: String,
    },
    computed: {
        intMaxLength() {
            return parseInt(this.maxlength);
        },
        maxLimitCounter() {
            if (this.value && this.type !== "tel") {
                return this.value.length === this.intMaxLength;
            }
            return false;
        },
        minLimitCounter() {
            return this.type === "tel" && this.textMaxLength === this.clearValue.length;
        },
        counter() {
            return this.clearValue.length;
        },
        textMaxLength() {
            if (this.mask) {
                return this.mask.replace(/[^#ANX]/g, "").length;
            }
            return this.intMaxLength;
        },
        clearValue() {
            return this.value || "";
        },
    },
    methods: {
        isValid() {
            if (this.pattern) {
                return this.$refs[this.mask ? "mask" : "clear"].checkValidity();
            }
            return true;
        },
        onInput() {
            this.valid = this.isValid() && this.value;
            this.$emit("input", this);
        },
        onChange() {
            this.$emit("change", this);
        },
    },
    mounted() {
        this.valid = this.isValid() && this.value;
    },
};
</script>

<style lang="less" scoped>
.gt-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0.8em 0;

    &__label {
        font-size: 0.8em;

        &--mandatory {
            color: @color-mandatory;
            margin-left: 0.3em;
        }
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__counter {
        color: @color-font-black-light;
        font-size: 0.8em;
        padding: 0.5em 0.5em 0 0.5em;

        &--max-limit {
            color: @color-error;
        }

        &--min-limit {
            color: @color-corporate;
        }
        &--verify {
            margin-right: 3.5em;
        }
    }

    &__title {
        padding: 0.5em 0.5em 0 2em;
    }

    &__group {
        display: flex;
    }

    &__input {
        margin: 0;
        padding: 0.4em 1em 0.3em;
        font-size: 1.25em;
        border-radius: 3px;
        border: @border-extra;
        background-color: @color-bg-extra-light;
        color: @color-font-black-standart;
        width: 100%;
        height: auto;
        box-sizing: border-box;

        &:focus {
            outline: none;
            border: @border-corporate;
            background-color: rgba(0, 0, 0, 0);
        }

        &:hover {
            border: @border-corporate;
        }

        &--value {
            border: @border-corporate-light;
            background-color: @color-bg-checkout;
        }

        &::-webkit-input-placeholder,
        &::-moz-placeholder,
        &:-moz-placeholder,
        &:-ms-input-placeholder {
            color: rgb(0, 0, 0);
            opacity: 0.6;
        }
    }

    &__verified {
        width: 2.5em;
        height: 2.5em;
        display: flex;
        margin-left: 0.5em;
        position: relative;
    }

    &__verified-checkbox-box {
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        position: absolute;
        border-radius: 3px;
    }

    &__verified-check {
        width: 100%;
        height: 100%;
        opacity: 0;
        display: flex;
        transition: opacity @transition-fast;
        padding: 0.2em;

        &--checked {
            opacity: 1;
        }

        & svg {
            width: 100%;
            height: 100%;
        }
    }

    &__response {
        font-size: 0.6em;
        font-weight: lighter;
        color: @color-font-black-extra;
        background-color: @color-corporate-opacity;
        margin: 0.3em 0;
        padding: 0.2em 1em 0.3em;
        border-radius: 3px;
    }
}
</style>

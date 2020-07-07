<template>
    <div class="spinner-quantity">
        <button
            class="spinner-quantity__button spinner-quantity__button--up"
            :class="{disable: numericValue >= max}"
            @click="increaseNumber"
            @mousedown="whileMouseDown(increaseNumber)"
            @mouseup="clearTimer"
            @mouseout="clearTimer"
        >
            <svg width="576" height="576" viewBox="0 0 576 576" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M216 552C216 565.255 226.745 576 240 576H336C349.255 576 360 565.255 360 552V360H552C565.255 360 576 349.255 576 336V240C576 226.745 565.255 216 552 216H360V24C360 10.7452 349.255 0 336 0H240C226.745 0 216 10.7452 216 24V216H24C10.7452 216 0 226.745 0 240V336C0 349.255 10.7452 360 24 360H216V552Z"
                    fill="black"
                    fill-opacity="0.24"
                />
            </svg>
        </button>
        <input
            class="spinner-quantity__value"
            type="number"
            :value="numericValue"
            @input="inputValue"
            :min="min"
            :max="max"
        />
        <button
            class="spinner-quantity__button spinner-quantity__button--down"
            :class="{disable: numericValue <= min}"
            @click="decreaseNumber"
            @mousedown="whileMouseDown(decreaseNumber)"
            @mouseup="clearTimer"
            @mouseout="clearTimer"
        >
            <svg width="576" height="144" viewBox="0 0 576 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 24C0 10.7452 10.7452 0 24 0H552C565.255 0 576 10.7452 576 24V120C576 133.255 565.255 144 552 144H24C10.7452 144 0 133.255 0 120V24Z"
                    fill="black"
                    fill-opacity="0.24"
                />
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: "GtSpinnerQuantity",
    data() {
        return {
            numericValue: this.value,
            timer: null,
        };
    },
    props: {
        value: {
            type: Number,
            default: 0,
        },
        min: {
            default: 0,
            type: Number,
        },
        max: {
            default: 10,
            type: Number,
        },
        step: {
            default: 1,
            type: Number,
        },
        mouseDownSpeed: {
            default: 100,
            type: Number,
        },
        integerOnly: {
            default: false,
            type: Boolean,
        },
    },
    computed: {
        validator() {
            return this.integerOnly ? parseInt : parseFloat;
        },
    },
    methods: {
        clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        whileMouseDown(callback) {
            if (this.timer === null) {
                this.timer = setInterval(callback, 200);
            }
        },
        increaseNumber() {
            this.numericValue += this.step;
        },
        decreaseNumber() {
            this.numericValue -= this.step;
        },
        inputValue(evt) {
            let value = evt.target.value;
            let numeric = this.validator(value);
            let allow = numeric.toString() === value;
            if (allow) {
                this.numericValue = numeric;
            } else {
                // fix numericValue reactive updating if value === NaN
                let oldValue = this.numericValue;
                this.numericValue = 0;
                this.numericValue = oldValue;
            }
        },
    },
    watch: {
        numericValue(val, oldVal) {
            if (val <= this.min) {
                this.numericValue = this.min;
            }
            if (val >= this.max) {
                this.numericValue = this.max;
            }
            if (val <= this.max && val >= this.min) {
                this.$emit("input", val, oldVal);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.spinner-quantity {
    border-radius: 2px;
    border: @border-light;
    display: flex;
    flex-direction: row-reverse;
    align-items: stretch;

    &__button {
        padding: 0.5em;
        display: flex;
        justify-content: center;
        align-items: stretch;
        background-color: @color-bg-checkout;
        border: 0;

        &:hover {
            background-color: @color-corporate-light;

            & svg path {
                fill: @color-bg-checkout;
                fill-opacity: 1;
            }
        }

        & svg {
            width: 1.2em;
            height: 1.2em;
        }
    }

    &__value {
        text-align: center;
        padding: 0;
        width: 4em;
        color: @color-font-black-standart;
        font-weight: bolder;
        border-left: @border-light;
        border-right: @border-light;
        border-top: 0;
        border-bottom: 0;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            -moz-appearance: textfield;
        }
    }

    &__disable {
        background-color: @color-border-light;
        border: 0;

        &:hover {
            background-color: @color-border-light;
            border: 0;

            & svg path {
                fill: rgb(0, 0, 0);
                fill-opacity: 0.24;
            }
        }
    }
}

.disable {
    background-color: @color-border-extra;
    pointer-events: none;
    cursor: default;
}
.disable:hover {
    background-color: @color-border-extra;
}
.disable:hover svg path {
    fill: rgb(0, 0, 0);
    fill-opacity: 0.24;
}
</style>

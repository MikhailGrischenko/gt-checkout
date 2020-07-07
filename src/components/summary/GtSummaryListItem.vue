<template>
    <div class="gt-summary-item">
        <div class="gt-summary-item__title">{{ title }}</div>
        <ul class="gt-summary-item__value">
            <li
                class="gt-summary-item__value-item"
                v-for="(subvalue, index) in value"
                :key="index"
                :class="{'gt-summary-item__value-item--ok': isSelected}"
            >
                <gt-waiting-spinner :visible="valueUpdating">
                    <span class="gt-summary-item__value-item-name">{{ subvalue }}</span>
                </gt-waiting-spinner>
                <span class="gt-summary-item__value-item-unit" v-if="unit">{{ unit }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import GtWaitingSpinner from "../basic/GtWaitingSpinner";

export default {
    name: "GtSummaryListItem",
    components: {GtWaitingSpinner},
    props: {
        title: String,
        value: String,
        unit: String,
        selected: {
            type: Boolean,
            default: false,
        },
        valueUpdating: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isSelected() {
            return this.selected || this.value.length === 1;
        },
    },
};
</script>

<style lang="less">
.gt-summary-item {
    font-size: 0.9em;
}
@media (min-width: @screen__gta-tablet-s) {
    .gt-summary-item {
        font-size: 1em;
    }
}
</style>

<style lang="less" scoped>
.gt-summary-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 0 0 0.6em;
    position: relative;
    background-color: @color-bg-checkout;

    &:after {
        content: "";
        width: 100%;
        height: 1px;
        background-color: @color-border-extra;
        position: absolute;
        left: 0;
        bottom: 0.2em;
    }

    &__title {
        z-index: 2;
        position: relative;
        background-color: @color-bg-checkout;
    }

    &__value {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        z-index: 2;
        position: relative;
        background-color: @color-bg-checkout;
    }

    &__value-item {
        align-items: flex-end;
        font-weight: lighter;
        font-style: italic;
        margin: 0;
        display: none;

        &--ok {
            color: @color-corporate;
            font-weight: inherit;
            font-style: inherit;
            display: flex;
        }
    }

    &__value-item-name {
        padding-right: 0.2em;
        text-align: right;
    }

    &__value-item-unit {
    }
}
.gt-summary__group--total .gt-summary-item:after {
    bottom: 0;
}
.gt-summary__list-item--fullcost .gt-summary-item__title,
.gt-summary__list-item--fullcost .gt-summary-item__value {
    background-color: inherit;
}
</style>

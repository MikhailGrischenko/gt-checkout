<template>
    <button class="button-close gtux-interaction" @click="$emit('click-button-close')">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.00128
                      10.827L12.2441
                      15.0699L15.0726
                      12.2414L10.8297
                      7.99858L15.0718
                      3.75646L12.2434
                      0.928037L8.00128
                      5.17015L3.75886
                      0.927734L0.930432
                      3.75616L5.17285
                      7.99858L0.929688
                      12.2417L3.75811
                      15.0702L8.00128
                      10.827Z"
            />
        </svg>
    </button>
</template>

<script>
export default {
    name: "GtButtonClose",
};
</script>

<style scoped lang="less">
.button-close {
    background-color: transparent;
    padding: 0;
    width: 100%;
    height: 100%;
    border: none;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        border-width: 0;
        background-color: transparent;
    }
}
</style>

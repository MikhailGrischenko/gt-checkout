<template>
    <svg xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
    >
        <slot></slot>
    </svg>
</template>

<script>
    export default {
        name: "GtBasicIcon",
        props: {
            width: {
                type: [String, Number],
                default: 24
            },
            height: {
                type: [String, Number],
                default: 24
            },
            viewBox: {
                type: [String],
                default: '0 0 24 24'
            }
        }
    };
</script>

<style scoped>

</style>

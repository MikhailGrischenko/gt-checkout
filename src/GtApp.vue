<template>
    <main><router-view v-if="checkoutLoaded"></router-view></main>
</template>

<script>
export default {
    name: "GtApp",
    computed: {
        checkoutLoaded() {
            return this.$store.state.load;
        },
    },
    created() {
        this.$store.dispatch("getInfo");
    },
};
</script>

<style lang="less"></style>

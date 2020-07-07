<template>
    <article class="customer-addresses">
        <div class="previous-addresses">
            <gt-previous-address
                v-for="address in previousAddresses"
                :key="address.id"
                :address="address"
            ></gt-previous-address>
        </div>
        <gt-customer-address></gt-customer-address>
    </article>
</template>

<script>
import GtPreviousAddress from "./GtPreviousAddress";
import GtCustomerAddress from "./GtCustomerAddress";

export default {
    name: "GtCustomerAddresses",
    components: {GtCustomerAddress, GtPreviousAddress},
    computed: {
        previousAddresses() {
            return (
                this.$store.state.customer &&
                this.$store.state.customer.addresses &&
                this.$store.state.customer.addresses.items
            );
        },
    },
};
</script>

<style scoped>
.previous-addresses {
    display: flex;
    flex-wrap: wrap;
}
</style>

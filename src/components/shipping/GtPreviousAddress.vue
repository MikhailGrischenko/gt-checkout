<template>
    <div class="previous-address" @click="setSelectedAddressId" :class="{'previous-address__selected': showSelected}">
        <span class="previous-address__country">{{ address.country }}</span>
        <span class="previous-address__region">{{ address.region }}</span>
        <span class="previous-address__city">{{ address.city }}</span>
        <span class="previous-address__address">{{ address.address }}</span>
        <div class="previous-address__marker-primary" v-show="showLabelPrimary">{{ getLabelPrimary }}</div>

        <div class="previous-address__icon-selected" v-show="showSelected">
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
</template>

<script>
export default {
    name: "GtPreviousAddress",
    components: {},
    props: {
        address: Object,
    },
    computed: {
        getLabelPrimary() {
            return this.$store.state.data.previousAddress.labelPrimary;
        },
        showLabelPrimary() {
            return (
                this.$store.state.customer &&
                this.$store.state.customer.addresses &&
                this.$store.state.customer.addresses.primary === this.address.id
            );
        },
        showSelected() {
            return (
                this.$store.state.customer &&
                this.$store.state.customer.addresses &&
                this.$store.state.customer.addresses.selected === this.address.id
            );
        },
    },
    methods: {
        setSelectedAddressId() {
            this.$store.dispatch("setCurrentAddress", {
                address: this.address,
                sync: true,
            });
        },
    },
};
</script>

<style scoped lang="less">
.previous-address {
    display: flex;
    flex-direction: column;
    margin: 4px;
    padding: 1em;
    border-radius: 3px;
    position: relative;
    flex: 0 0 calc(25% - 3em);
    font-size: 0.9em;
    border: @border-extra;
}

.previous-address:hover {
    box-shadow: @shadow-corporate-lite;
}

.previous-address__icon-selected {
    position: absolute;
    right: 1em;
    top: 1em;
}

.previous-address__selected {
    border: @border-corporate;
}

.previous-address__marker-primary {
    font-size: 0.7em;
    color: @color-corporate;
    position: absolute;
    right: 0.5em;
    bottom: 0.5em;
}
</style>

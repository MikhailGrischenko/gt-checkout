<template>
    <div class="customer-address">
        <div class="customer-address__enter">
            <gt-input
                @input="onInputAddress"
                id="recipient-address"
                type="text"
                :label="getLabels.labelInputAddress"
                :mandatory="false"
                :placeholder="getLabels.placeholderInputAddress"
                :value="orderAddress"
                :maxlength="500"
            />
            <p class="customer-address__message" v-if="!validAddress">{{ messageNoAddress }}</p>
        </div>
        <div class="consignee-info">
            <div class="consignee-info__contacts">
                <gt-input
                    @change="onChange"
                    @input="onInput"
                    id="recipient-name"
                    name="name"
                    type="text"
                    :label="getLabels.labelInputCustomerName"
                    :mandatory="false"
                    :placeholder="getLabels.placeholderInputCustomerName"
                    :value="recipientName"
                    :maxlength="100"
                />
                <gt-input
                    @change="onChange"
                    @input="onInput"
                    id="recipient-phone"
                    name="phone"
                    type="tel"
                    :label="getLabels.labelInputCustomerPhone"
                    :mandatory="false"
                    :placeholder="getLabels.placeholderInputCustomerPhone"
                    :value="recipientPhone"
                    :verify="false"
                    mask="+# (###) ###-##-##"
                    pattern="\+\d\s\(?\d\d\d\)?\s?\d\d\d-?\d\d-?\d\d"
                />
            </div>
            <!--<gt-map class="consignee-info__map"-->
            <!--:one-address="getAddress"-->
            <!--:geo-markers="getGeoMarkers"-->
            <!--:geo-location="getGeoLocation"-->
            <!--&gt;</gt-map>-->
        </div>
    </div>
</template>

<script>
import GtInput from "../basic/GtInput";
import AddressLib from "../../lib/address";

export default {
    name: "GtCustomerAddress",
    components: {GtInput},
    mounted() {
        let self = this;
        // eslint-disable-next-line
        $("[name='recipient-address']").suggestions({
            token: window.DADATA_TOKEN,
            type: "ADDRESS",
            count: 5,
            constraints: {
                locations: {country: "*"},
            },

            onSelect(suggestion) {
                self.checkAddress(suggestion);
            },
        });
    },
    data() {
        return {
            localOrderAddress: null,
        };
    },
    computed: {
        messageNoAddress() {
            return this.$store.state.data.messages.messageNoAddress;
        },
        validAddress() {
            let isCourier = this.$store.state.shipping.selected === "courier";
            let address = this.$store.state.summary.address;
            return !isCourier || address.address;
        },
        getLabels() {
            return this.$store.state.data.customerAddress;
        },
        getAllCustomerAddress() {
            return (
                this.$store.state.customer &&
                this.$store.state.customer.addresses &&
                this.$store.state.customer.addresses.items
            );
        },
        recipientName() {
            return this.$store.state.summary.recipient.name === null
                ? this.$store.state.customer.name
                : this.$store.state.summary.recipient.name;
        },
        recipientPhone() {
            return this.$store.state.summary.recipient.phone === null
                ? this.$store.state.customer.phone
                : this.$store.state.summary.recipient.phone;
        },
        orderAddress() {
            return this.localOrderAddress === null
                ? AddressLib.getFullAddress(this.$store.state.summary.address)
                : this.localOrderAddress;
        },
    },
    methods: {
        checkAddress({data}) {
            let address = AddressLib.getObjectDadataAddress(data);
            let sync = !!address.address;
            if (AddressLib.getFullAddress(address) === this.orderAddress) {
                return;
            }
            if (this.getAllCustomerAddress) {
                let id = this.getAllCustomerAddress
                    .filter(item => AddressLib.getFullAddress(item) === AddressLib.getFullAddress(address))
                    .reduce((id, item) => id || item.id, null);
                if (id) {
                    address.id = id;
                }
            }
            this.$store.dispatch("setCurrentAddress", {address, sync});
        },
        onChange(input) {
            this.$store.dispatch("setCurrentRecipient", {
                [input.name]: input.value,
            });
        },
        onInput(input) {
            this.$store.commit("setCurrentRecipient", {
                [input.name]: input.value,
            });
        },
        onInputAddress(input) {
            this.localOrderAddress = input.value;
        },
    },
};
</script>

<style scoped>
.customer-address {
    display: flex;
    flex-direction: column;
}

.customer-address__enter {
    height: auto;
}

.consignee-info {
    display: flex;
    padding: 1em 0 0 0;
}

.consignee-info__contacts {
    flex: 1 1 40%;
}

.consignee-info__map {
    flex: 1 1 60%;
    padding-left: 0.5em;
}

.customer-address__message {
    font-size: 0.8em;
    margin: 0.2em 1em 0.5em;
}
</style>

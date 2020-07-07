<template>
    <gt-block :block-name="blockName">
        <div class="contact-data__main">
            <p class="contact-data__welcome-text">{{ welcomeTextBuyOneClickForm }}</p>
            <gt-input
                ref="name"
                name="name"
                @change="changeInput"
                id="customer-name"
                type="text"
                :label="labels.labelInputCustomerName"
                :mandatory="false"
                :placeholder="labels.placeholderInputCustomerName"
                :value="customerName"
                maxlength="100"
            />
            <gt-input
                ref="phone"
                name="phone"
                @change="changeInput"
                id="customer-phone"
                type="tel"
                :label="labels.labelInputCustomerPhone"
                :mandatory="true"
                :placeholder="labels.placeholderInputCustomerPhone"
                :value="customerPhone"
                :verify="true"
                mask="+# (###) ###-##-##"
                pattern="\+\d\s\(?\d\d\d\)?\s?\d\d\d-?\d\d-?\d\d"
            />
            <gt-input
                ref="email"
                name="email"
                @change="changeInput"
                id="email"
                type="email"
                :label="labels.labelInputEmail"
                :mandatory="false"
                :placeholder="labels.placeholderInputEmail"
                :value="customerEmail"
                :verify="true"
                maxlength="100"
                pattern=".+@.+\..+"
            />
        </div>
    </gt-block>
</template>

<script>
import GtInput from "../basic/GtInput";
import GtBlock from "../basic/GtBlock";

export default {
    name: "GtContactData",
    components: {
        GtInput,
        GtBlock,
    },
    computed: {
        blockName() {
            return this.$store.state.data.blockTitle.contactData;
        },
        welcomeTextBuyOneClickForm() {
            return this.$store.state.data.messages.contactData;
        },
        labels() {
            return this.$store.state.data.byeOneClick;
        },
        customerName() {
            return this.$store.state.customer.name;
        },
        customerPhone() {
            return this.$store.state.customer.phone;
        },
        customerEmail() {
            return this.$store.state.customer.email;
        },
    },
    methods: {
        isValid() {
            return this.$refs.phone.isValid() && this.$refs.email.isValid();
        },
        changeInput(input) {
            this.$store.dispatch("updateCustomer", {
                [input.name]: input.clearValue,
            });
            this.$emit("contacts-changed", this);
        },
    },
    mounted() {
        this.$emit("contacts-changed", this);
    },
};
</script>

<style scoped lang="less">
.contact-data {
    &__main {
        margin: 0 auto;
        max-width: 36em;
    }

    &__welcome-text {
        font-size: 0.9em;
        margin: 0.4rem 0;
        padding: 0 1em;
        color: @color-font-black-standart;
    }
}
</style>

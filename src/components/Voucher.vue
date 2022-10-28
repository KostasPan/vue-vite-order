<template>
    <h1>Voucher</h1>
    <input v-model="voucher" @focus="error = false" @keydown.enter="applyVoucher()" type="text" name="voucher"
        placeholder="Insert your voucher code" />
    <div v-if="hasVoucherError">Voucher code does not exist</div>
    <button @click="applyVoucher()" class="btn-light">Apply</button>
</template>

<script>
export default {
    name: 'voucher',
    data() {
        return {
            voucher: '',
            error: false,
        };
    },
    computed: {
        hasVoucherError() {
            return this.error && this.voucher;
        },
    },
    methods: {
        applyVoucher() {
            switch (this.voucher) {
                case 'HAPPYBIRTHDAY':
                    this.$store.commit('setTotalDiscount', 20);
                    break;
                case '50OFF':
                    this.$store.commit('setTotalDiscount', 50);
                    break;
                case '100OFF':
                    this.$store.commit('setTotalDiscount', 100);
                    break;
                case 'ILIKEAPPLES':
                    this.$store.commit('setDiscountedProduct', { id: '6feb4d0e-97d3-4502-ba98-15b72d638ce2', discount: 60 });
                    break;
                default:
                    this.error = true;
            }
        },
    },
};
</script>

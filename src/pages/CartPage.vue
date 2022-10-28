<script setup>
import Catalogue from '@/components/Catalogue.vue'
import { defineAsyncComponent } from 'vue'
</script>

<template>
    <h1 class="t-center">Cart</h1>
    <div v-if="(Products.length && Products) == false" class="empty">
        Your cart is Empty
    </div>
    <div v-else>
        <Catalogue :products=Products :cartMode="true"></Catalogue>
        <div class="cart-btns">
            <button v-if="CartPrice.isDiscounted == false" @click="enableVoucher()" class="btn-white">Enable
                Voucher</button>
            <button v-else @click="disableVoucher()" class="btn-white">Disable Voucher</button>
            <button @click="payment()" class="btn-light">Continue</button>
        </div>
    </div>

    <div v-if="isModalShown" id="myModal" class="modal" @click="closeModal()">
        <div class="modal-content" @click.stop="">
            <Voucher v-if="isVoucherShown" />
            <Payment v-if="isPaymentShown" />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        Voucher: defineAsyncComponent(() => import(/* webpackChunkName: "voucher" */ "../components/Voucher.vue")),
        Payment: defineAsyncComponent(() => import(/* webpackChunkName: "payment" */ "../components/Payment.vue")),
    },
    data() {
        return {
            isModalShown: false,
            isVoucherShown: false,
            isPaymentShown: false,
        }
    },
    computed: {
        Products() {
            return this.$store.getters.getCartProducts
        },
        CartPrice() {
            return this.$store.getters.getPrice
        }
    },
    methods: {
        enableVoucher() {
            this.isModalShown = true
            this.isVoucherShown = true
        },
        payment() {
            this.isModalShown = true
            this.isPaymentShown = true
        },
        disableVoucher() {
            this.$store.commit('removeDiscount')
        },
        closeModal() {
            this.isModalShown = false
            this.isVoucherShown = false
            this.isPaymentShown = false
        }
    },
}
</script>

<style>
.cart-btns {
    display: flex;
    gap: 20px;
    margin: 20px;
    flex-direction: row;
    justify-content: center;
}

.empty {
    text-align: center;
    font-weight: bold;
}

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    width: 65%;
}
</style>
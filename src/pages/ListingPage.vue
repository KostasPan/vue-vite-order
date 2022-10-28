<script setup>
import Catalogue from '@/components/Catalogue.vue';
</script>

<template>
    <h1 class="t-center">Listing</h1>
    <Catalogue :products=products :cartMode="false"></Catalogue>
    <div>
        <button @click="toCart" :disabled="!hasCartProducts" class="btn-light next">Next</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [],
        };
    },
    computed: {
        hasCartProducts() {
            return this.$store.getters.getPrice.totalPrice > 0
        }
    },
    methods: {
        toCart() {
            this.$router.push({ path: '/cart' })
        },
        async getProducts() {
            let data = await fetch(`${import.meta.env.VITE_API_BASEURL}/products`)
                .then(res => res.json())
                .then((data) => {
                    data.products.map(el => el.quantity = 0)
                    console.log(data.products)
                    return data.products
                }).catch((error) => {
                    console.log('Error fetching products: \n', error);
                });
            return data
        }
    },
    async beforeMount() {
        this.products = await this.getProducts()
    }
}
</script>

<style scoped>
.next {
    margin: 0 auto;
    display: block;
}

hr {
    display: none;
}
</style>
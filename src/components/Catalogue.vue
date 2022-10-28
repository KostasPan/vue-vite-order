<script setup>
defineProps({
    products: {
        type: Array,
        required: true
    },
    cartMode: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <div v-if="products.length && products">
        <ul>
            <li v-for="p in products" :key="p.id">
                <div class="label">
                    <button v-if="cartMode" @click="removeProduct(p.id)">Remove</button>
                    <div>{{ p.name }}</div>
                    <div v-if="cartMode">{{ $filters.currencyUSD(+(p.price * p.quantity)) }}</div>
                    <div v-if="!cartMode">{{ $filters.currencyUSD(+p.price) }}</div>
                </div>
                <input v-if="!cartMode" v-model.number=p.quantity type="number" name="kilos" min="0">
            </li>
        </ul>
        <div class="catalogue-btns">
            <button v-if="!cartMode" @click="addProducts" class="btn-primary">Add order to cart</button>
            <button @click="emptyCart" :disabled="!hasCartProducts" class="btn-warn">Empty Cart</button>
        </div>
        <div class="price">
            <div :class="{ 'del': cartPrice.isDiscounted }"><b>Total Price:</b> {{
                    $filters.currencyUSD(cartPrice.totalPrice)
            }}</div>
            <div v-if="cartPrice.isDiscounted"><b>Discount:</b> {{ $filters.currencyUSD(cartPrice.discount) }}</div>
            <div v-if="cartPrice.isDiscounted"><b>Discounted Price:</b>
                {{ $filters.currencyUSD(cartPrice.discountedPrice) }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'John',
        };
    },
    computed: {
        cartPrice() {
            return this.$store.getters.getPrice
        },
        hasCartProducts() {
            return this.cartPrice.totalPrice > 0
        }
    },
    methods: {
        addProducts() {
            const filteredProducts = this.products.filter(el => el.quantity != 0)
            filteredProducts.forEach(p => {
                let { ...product } = p;
                this.$store.commit('removeProduct', product.id)
                this.$store.commit('addProduct', product)
            });
        },
        emptyCart() {
            this.$store.commit('initProducts')
            this.$store.commit('removeDiscount')
        },
        removeProduct(productId) {
            this.$store.commit('removeProduct', productId)
            if (!this.hasCartProducts)
                this.$store.commit('removeDiscount')
        },
        toCart() {
            this.$router.push({ path: '/cart' })
        }
    }
}
</script>

<style scoped>
ul {
    max-width: 85%;
    margin: 0 auto;
}

li {
    margin-bottom: 10px;
}

.label {
    display: flex;
    padding: 10px 0;
    align-items: center;
    gap: 20px;
}

.price {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin: 20px;
}

.catalogue-btns {
    display: flex;
    gap: 20px;
    margin: 20px;
    flex-direction: row;
    justify-content: center;
}

.del {
    text-decoration: line-through;
}
</style>
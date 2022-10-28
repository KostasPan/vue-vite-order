import { createStore } from 'vuex';

const cart = createStore({
  state() {
    return {
      products: [],
      total_discount: 0,
      discounted_product: {
        id: '',
        discount: 0,
      },
    };
  },
  getters: {
    getCartProducts: (state) => {
      return state.products.filter((el) => el.quantity != 0);
    },
    getTotalPrice: (state) => {
      const callback = (previous, current) => previous + +current.price * +current.quantity;
      const totalPrice = state.products.reduce(callback, 0);
      return totalPrice;
    },
    getDiscountedPrice: (state) => {
      const callback = (previous, current) => previous + +current.price * +current.quantity;
      const totalPrice = state.products.reduce(callback, 0);
      const discount = state.total_discount;
      const dproduct = state.discounted_product;

      if (discount) {
        return totalPrice - totalPrice * (discount / 100);
      } else if (dproduct.id) {
        const i = state.products.findIndex((p) => p.id == dproduct.id);
        if (i > -1) {
          let temp = {
            ...state.products[i],
            price: state.products[i].price - state.products[i].price * (dproduct.discount / 100),
          };
          const tempProducts = [...state.products.slice(0, i), temp, ...state.products.slice(i + 1)];
          return tempProducts.reduce(callback, 0);
        }
      }
      return totalPrice;
    },
    getPrice(state, getters) {
      return {
        isDiscounted: !!state.total_discount || !!state.discounted_product.discount,
        discountedPrice: getters.getDiscountedPrice,
        discount: getters.getTotalPrice - getters.getDiscountedPrice,
        totalPrice: getters.getTotalPrice,
      };
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    removeProduct(state, id) {
      const i = state.products.findIndex((el) => el.id == id);
      if (i > -1) {
        state.products.splice(i, 1);
      }
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    initProducts(state) {
      if (window.confirm('You are going to empty your cart')) {
        state.products = [];
      }
    },
    setTotalDiscount(state, discount) {
      state.discounted_product = {};
      state.total_discount = discount;
    },
    setDiscountedProduct(state, productDiscount) {
      state.total_discount = 0;
      state.discounted_product = productDiscount;
    },
    removeDiscount(state) {
      state.total_discount = 0;
      state.discounted_product = { id: '', discount: 0 };
    },
  },
});

export default cart;

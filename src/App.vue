<template>
  <div class="app">
    <div class="container">
      <div class="navigation">
        <router-link v-if="this.$route.path != '/'" to="/" v-slot="{ href, route, navigate }" class="text-dec-none">
          <button :href="href" @click="navigate" class="nav-btn btn-primary">Home</button>
        </router-link>
        <router-link v-if="this.$route.path != '/cart'" to="/cart" v-slot="{ href, route, navigate }"
          class="text-dec-none">
          <button :href="href" @click="navigate" class="btn-light">Cart</button>
        </router-link>
      </div>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  justify-content: center;
}

.app .container {
  width: 80%;
  margin: 50px;
}

.navigation {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>

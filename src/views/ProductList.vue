<template>
  <div class="wrapper">
    <div>List of products</div>
    <ProductCard
      v-for="(product, id) in products"
      :key="id"
      :product="product"
      class="product-card-listing"
    />
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard';

export default {
  components: {
    ProductCard
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  background: #0e1822;
  flex: 1;
}

.wrapper div {
  margin: 30px 0 15px 0;
}
</style>

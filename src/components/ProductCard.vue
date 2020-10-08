<template>
  <router-link :to="{ name: 'product-edit', params: { id: product.id } }">
    <div class="product-listing">
      <p>
        Product:
        <strong>{{ product.name }}</strong>
      </p>
      <p>
        Width:
        <strong>{{ product.width }}</strong> mm
      </p>
      <p>
        Height:
        <strong>{{ product.height }}</strong> mm
      </p>
      <p>
        Image:
        <box-icon v-if="product.image" color="#28a745" name="check"></box-icon>
        <box-icon v-else name="x" color="tomato"></box-icon>
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    product: {
      type: Object
    }
  }
};
</script>

<style scoped>
.product-listing {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
}

.product-listing p {
  display: flex;
  align-items: center;
}

.product-card-listing > .product-listing:hover {
  background-color: #5e6872;
}

.product-card-listing:nth-child(odd) .product-listing {
  background-color: #24292e;
}

.product-card-listing:nth-child(even) .product-listing {
  background-color: #161e26;
}

.product-card-listing:nth-child(odd) .product-listing:hover,
.product-card-listing:nth-child(even) .product-listing:hover {
  background-color: #424b54;
}
</style>

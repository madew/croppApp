<template>
  <div>
    <form @submit.prevent="searchProduct" class="search-bar">
      <div>
        <input class="input-search" type="text" v-model="inputSearch" />
        <button class="search-btn" type="submit">Search</button>
      </div>

      <div class="radio-container">
        <p>Search by</p>
        <div>
          <input type="radio" value="name" id="radioName" v-model="searchBy" />
          <label for="radioName">Name</label>
        </div>
        <div>
          <input type="radio" value="id" id="radioId" v-model="searchBy" />
          <label for="radioId">Id</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Nprogress from 'nprogress';

export default {
  data() {
    return {
      inputSearch: '',
      searchBy: 'name'
    };
  },
  methods: {
    searchProduct() {
      this.$store
        .dispatch('fetchProducts', {
          searchBy: this.searchBy,
          inputSearch: this.inputSearch
        })
        .catch(error => {
          let notification;
          if (error.response && error.response.status == 404) {
            notification = {
              type: 'warning',
              message: 'Product not found'
            };
          } else {
            notification = {
              type: 'error',
              message: 'There was a problem fetching product: ' + error.message
            };
          }
          this.$store.dispatch('addNotification', notification);
          Nprogress.done();
        });

      this.inputSearch = '';

      if (this.$router.history.current.path !== '/') {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.input-search {
  padding: 5px 10px;

  font-size: 1.5rem;
  font-weight: 300;
  border: none;
}

.radio-container {
  margin: 0 0 0 60px;
}

.radio-container p {
  margin: 0 10px;
}

.search-bar,
.search-bar > div {
  display: flex;
  align-items: center;
}

.search-bar input[type='radio'] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.search-bar label {
  display: inline-block;
  background-color: #5e6872;
  padding: 8px 20px;
  font-size: 14px;

  cursor: pointer;
}

.search-bar label:hover {
  background-color: #ccc;
}

.search-bar input[type='radio']:focus + label {
  border: 1px solid #444;
}

.search-bar input[type='radio']:checked + label {
  background-color: #424b54;
}

.search-btn {
  background-color: #424b54;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
}
</style>

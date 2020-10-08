<template>
  <div id="app">
    <div class="top-bar">
      <router-link class="header-search" to="/">
        <h1>Search</h1>
      </router-link>
      <SearchProduct />
    </div>
    <router-view :key="$route.fullPath" />
    <NotificationContainer />
  </div>
</template>

<script>
import SearchProduct from '@/components/SearchProduct';
import NotificationContainer from '@/components/NotificationContainer';

export default {
  components: {
    SearchProduct,
    NotificationContainer
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ddd;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

a {
  text-decoration: none;
  color: #ddd;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #24292e;
}
.header-search {
  margin-right: 30px;
}

.header-search > h1 {
  margin: 10px;
}

.tooltip {
  display: block !important;
  z-index: 10000;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.tooltip-info {
  background: #aaa;
  color: white;
  padding: 4px 8px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
  max-width: 250px;
}
</style>

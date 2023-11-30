<template>
  <nav id="nav" v-if="$store.state.user">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <button type="button" @click="$store.dispatch('logout')">Logout</button>
  </nav>
  <router-view/>
</template>

<script>
  import { onBeforeMount } from 'vue';
  import { useStore } from 'vuex';

  export default {
    setup() {
      const store = useStore();
      onBeforeMount(() => {
        store.dispatch('fetchUser');
      });
    }
  }
</script>
<style>
#app {
  height: 100vh;
  width: 100%;
}
</style>
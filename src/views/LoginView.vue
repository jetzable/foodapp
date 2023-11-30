<!-- eslint-disable no-unused-vars -->
<template>
  <main class="login">
    <section class="forms">
      <form class="register" @submit.prevent="register">
        <h2>Register</h2>
        <input type="email" placeholder="email" v-model="register_form.email">
        <input type="password" placeholder="Password" v-model="register_form.password">
        <button type="submit">Register</button>
      </form>
      <form class="login" @submit.prevent="login">
        <h2>Login</h2>
        <input type="email" placeholder="email" v-model="login_form.email">
        <input type="password" placeholder="Password" v-model="login_form.password">
        <button type="submit">Login</button>
      </form>
    </section>
  </main>
</template>

<script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const login_form = ref({
        email: '',
        password: ''
      });
      const register_form = ref({
        email: '',
        password: ''
      });
      const login = () => {
        store.dispatch('login', login_form.value);
      };
      const register = () => {
        store.dispatch('register', register_form.value);
      };
      return {
        login_form,
        register_form,
        login,
        register
      };
    }
  }
</script>

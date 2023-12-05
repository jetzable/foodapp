<!-- eslint-disable no-unused-vars -->
<template>
  <div class="flex h-screen text-black bg-white">
    <div
      class="flex flex-col items-center justify-center"
      :class="{
        'w-1/2': openForm !== null,
        'w-full': openForm === null
      }"
    >
      <img src="../assets/JuanitasLunchLogo.png" alt="Juanita's Lunch" class=""/>
      <ButtonComponent
        type="button"
        label="Login"
        variant="primary"
        class="w-40 mb-4"
        @click="openForm = 'login'"
      />
      <ButtonComponent
        type="button"
        label="Register"
        variant="secondary"
        class="w-40"
        @click="openForm = 'register'"
      />
    </div>
    <form
      v-if="openForm === 'register'"
      class="flex items-center justify-center w-1/2"
      @submit.prevent="register"
      >
      <CardComponent class="flex flex-col">
        <h2 class="mb-6 text-xl font-bold">Register</h2>
        <InputComponent
          id="register_email"
          v-model="register_form.email"
          placeholder="email"
          label="Email"
          type="email"
        />
        <InputComponent
          id="register_password"
          v-model="register_form.password"
          placeholder="Password"
          label="Password"
          type="password"
        />
        <ButtonComponent
          type="submit"
          label="Register"
          variant="primary"
          class="mt-4"
        />
      </CardComponent>
    </form>
    <form
      v-if="openForm === 'login'"
      class="flex items-center justify-center w-1/2"
      @submit.prevent="login"
      >
      <CardComponent class="flex flex-col">
        <h2 class="mb-6 text-xl font-bold">Login</h2>
        <InputComponent
          id="login_email"
          v-model="login_form.email"
          placeholder="email"
          label="Email"
          type="email"
        />
        <InputComponent
          id="login_password"
          v-model="login_form.password"
          placeholder="Password"
          label="Password"
          type="password"
        />
        <ButtonComponent
          type="submit"
          label="Login"
          variant="primary"
          class="mt-4"
        />
      </CardComponent>
    </form>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';

  import CardComponent from '@/components/CardComponent.vue';
  import InputComponent from '@/components/InputComponent.vue';
  import ButtonComponent from '@/components/ButtonComponent.vue';
  
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
        const openForm = ref(null);
        return {
            login_form,
            register_form,
            login,
            register,
            openForm
        };
    },
    components: { CardComponent, InputComponent, ButtonComponent }
  }
</script>

<!-- eslint-disable no-unused-vars -->
<template>
  <div class="flex items-center justify-center h-screen p-8 text-black bg-primary">
    <CardComponent class="flex flex-col h-2/3">
      <form
        class="flex flex-col"
        @submit.prevent="login"
        >
        <img src="../assets/JuanitasLunchLogo.png" alt="Juanita's Lunch" class="object-cover object-center w-20 h-20"/>
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
      </form>
    </CardComponent>
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
        const login = () => {
            store.dispatch('login', login_form.value);
        };
        return {
            login_form,
            login,
        };
    },
    components: { CardComponent, InputComponent, ButtonComponent }
  }
</script>

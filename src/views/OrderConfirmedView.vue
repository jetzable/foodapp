<template>
  <div class="flex flex-col items-center justify-center h-screen p-8 overflow-y-auto bg-primary">
    <CardComponent class="flex flex-col items-center justify-center h-1/2">
      <h1 class="flex flex-col mb-8 text-xl font-bold text-center text-primary">
        <span>Your Order</span>
        <span class="mx-1 text-2xl text-secondary">
          #{{ orderId }}
        </span>
        <span>has been Confirmed!</span>
      </h1>
      <p class="mb-4 text-xl text-center text-primary">
        You'll receive a Whatsapp message whenever your order is ready.
      </p>
      <ButtonComponent
        class="w-full"
        type="button"
        variant="secondary"
        label="Back to Menu"
        @click="goToHome"
      />
    </CardComponent>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  import CardComponent from '@/components/CardComponent.vue';
  import ButtonComponent from '@/components/ButtonComponent.vue';
  export default {
    name: 'OrderConfirmedView',
    components: {
      ButtonComponent,
      CardComponent,
    },
    computed: {
      ...mapState(['orderId']),
    },
    methods: {
      goToHome() {
        this.$store.commit('SET_ORDER_ID', null);
        this.$router.push({ name: 'home' });
      },
    },
  };
</script>
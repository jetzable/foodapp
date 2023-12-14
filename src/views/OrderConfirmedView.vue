<template>
  <div class="flex h-screen px-6 py-8 overflow-y-auto bg-primary">
    <CardComponent class="flex flex-col">
      <ul class="relative flex-grow pb-8 mb-4 overflow-y-scroll border-2 rounded-lg border-primary max-h-2/3 min-h-1/2">
        <h1 class="sticky top-0 left-0 z-10 w-full p-4 mb-2 text-xl bg-white">
          Order: <span class="text-secondary"># {{ orderId }}</span>
        </h1>
        <li
          v-for="item in orderDetail.items"
          :key="item.id"
          class="flex px-6"
          >
          <div class="mr-2">{{ item.quantity }}</div>
          <div>{{ item.name }}</div>
        </li>
        
      </ul>
      <section class="flex-grow p-4 mb-6 border-2 rounded-lg border-primary max-h-1/4">
        <h2 class="text-lg text-primary">Additional Comments:</h2>
        <p class="max-w-full break-all">{{ orderDetail.comments.length > 0 ? orderDetail.comments : 'No comments added.' }}</p>
      </section>
      <section class="flex flex-col items-end w-full p-4 border-2 rounded-lg border-primary">
        <p class="text-xl">
          Total:
          <span class="underline text-red">
            ${{ orderDetail.total }}
          </span>
        </p>
      </section>
      <section>
        <h2 class="my-4 text-2xl text-center text-primary">
          <span class="capitalize text-secondary">
            {{ orderDetail.buyersName }}
          </span>
          <span>
            your order has been confirmed!
          </span>
        </h2>
        <p class="my-4 text-xl text-center text-primary">
          You'll receive a Whatsapp message to pick up your order.
        </p>
        <ButtonComponent
          class="w-full"
          type="button"
          variant="secondary"
          label="Back to Menu"
          @click="goToHome"
        />
      </section>
    </CardComponent>
  </div>
</template>
<script>
  import { mapState, mapGetters } from 'vuex';

  import CardComponent from '@/components/CardComponent.vue';
  import ButtonComponent from '@/components/ButtonComponent.vue';
  export default {
    name: 'OrderConfirmedView',
    components: {
      ButtonComponent,
      CardComponent,
    },
    created() {
      if (!this.orderId) {
        this.$router.push({ name: 'home' });
      } else {
        this.$store.dispatch('getOrderDetail', this.orderId);}
    },
    computed: {
      ...mapState(['orderId']),
      ...mapGetters(['orderDetail']),
    },
    methods: {
      goToHome() {
        this.$store.commit('SET_ORDER_ID', null);
        this.$router.push({ name: 'home' });
      },
    },
  };
</script>
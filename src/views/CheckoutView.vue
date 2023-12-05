<template>
  <div class="relative w-full h-screen p-8 overflow-scroll text-accent">
    <form>
      <h2 class="mb-4 text-xl text-primary">Deliver to:</h2>
      <InputComponent
        id="order-buyers-name"
        v-model="order.buyersName"
        placeholder="Your name here (nickname is fine)."
        label="Name"
        type="text"
        required
        @update:modelValue="this.$store.commit('SET_BUYER_NAME', $event)"
      />
      <InputComponent
        id="order-buyers-phone"
        v-model="order.buyersPhone"
        placeholder="5540982039"
        label="Phone"
        type="tel"
        required
        @update:modelValue="this.$store.commit('SET_BUYER_PHONE', $event)"
      />
      <InputComponent
        textArea
        id="order-comments"
        v-model="order.comments"
        placeholder="No onions please! I'm allergic. Thanks!..."
        label="Additional comments"
        type="text"
        @update:modelValue="this.$store.commit('SET_ORDER_COMMENTS', $event)"
      />
    </form>
    <ul class="pb-24 mt-6">
      <h1 class="flex items-center justify-between mb-4 text-xl">
        <span class="text-primary">Order Details</span>
        <span>{{ $filters.formatDate(Date.now()) }}</span>
      </h1>
      <li
        v-for="item in orderItems"
        :key="item.id"
        class="border-b border-primary"
        >
        <CardComponent class="grid grid-cols-12" noShadow>
          <div class="col-span-2">{{ item.quantity }}</div>
          <div class="col-span-8">
            <h3 class="mb-2 text-xl font-bold">{{ item.name }}</h3>
            <p class="mb-2 text-lg">{{ item.description }}</p>
            <p class="mb-2 text-lg font-bold">${{ item.price }}</p>
          </div>
          <div class="col-span-2">
            <p>${{ item.quantity * item.price }}</p>
          </div>
        </CardComponent>
      </li>
    </ul>
    <div class="fixed bottom-0 left-0 z-10 flex items-center justify-between w-full px-8 py-4 text-xl bg-white">
      <ButtonComponent
        class="w-full"
        :disabled="!order.buyersName || !order.buyersPhone"
        type="button"
        label="Confirm order"
        @click="confirmOrder"
        />
        <p class="flex items-center ml-8">
          <span class="font-semibold">Total:</span>
          <span class="ml-4 font-bold border-b-4 border-double text-primary border-primary">
            ${{ order.total }}
          </span>
        </p>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters } from 'vuex';

  import CardComponent from '@/components/CardComponent.vue';
  import InputComponent from '@/components/InputComponent.vue';
  import ButtonComponent from '@/components/ButtonComponent.vue';

  export default {
    name: 'CheckoutView',
    computed: {
      ...mapState(['order']),
      ...mapGetters(['orderItems']),
    },
    methods: {
      async confirmOrder() {
        try {
          await this.$store.dispatch('confirmOrder');
          this.$router.push({ name: 'orderconfirmation' });
        } catch (error) {
          console.log(error);
        }
      },
    },
    components: {
      CardComponent,
      InputComponent,
      ButtonComponent,
    },
  };
</script>
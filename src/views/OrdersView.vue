<template>
  <div class="h-screen px-6 py-8">
    <h1 class="mb-2 text-2xl text-primary">Today's Orders</h1>
    <p class="pb-2 border-b text-accent border-primary">{{ today }}</p>
    <TransitionGroup name="flip-list" tag="ul" class="py-4 mb-4">
      <li v-for="order in orders" :key="order.id">
        <CardComponent
          class="mb-4 border-b-2 cursor-pointer hover:opacity-50"
          :class="{
            'bg-green text-white border-green': order.delivered,
            'bg-white border-primary': !order.delivered,
          }"
          noShadow
          @click="updateDelivery(order.id)"
          >
          <section class="grid grid-cols-6 mb-4">
            <div class="col-span-4">
              <h2 class="text-primary">{{ order.buyersName }}</h2>
              <p class="text-accent">{{ order.id }}</p>
            </div>
            <div class="flex justify-end col-span-2">
              <p class="text-accent">
                <fa
                  class="w-6 h-6 mr-2"
                  :icon="['fas', 'circle-check']"
                  :class="{
                    'text-primary': order.delivered,
                    'text-accent': !order.delivered,
                  }"
                  />
              </p>
            </div>
          </section>
          <ul>
            <li v-for="item in order.items" :key="item.id" class="mb-4">
              <div class="grid grid-cols-6">
                <p class="col-span-2 text-accent">{{ item.quantity }}</p>
                <p class="col-span-4 text-primary">{{ item.name }}</p>
              </div>
            </li>
            <p class="flex items-center justify-end w-full text-red">
              ${{ order.total }}
            </p>
          </ul>
        </CardComponent>
      </li>
    </TransitionGroup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

import CardComponent from "@/components/CardComponent.vue";

export default {
  name: "OrdersView",
  components: {
    CardComponent,
  },
  computed: {
    ...mapGetters(["orders"]),
    today() {
      return moment().format("MMM Do YY");
    },
  },
  created() {
    this.$store.dispatch("getOrders");
  },
  methods: {
    updateDelivery(id) {
      this.$store.dispatch("updateDelivery", id);
    },
  },
};
</script>

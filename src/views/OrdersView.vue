<template>
  <div>
    <h1>Today's Orders</h1>
    <ul>
      <li v-for="order in orders" :key="order.id">
          {{ order.buyersName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'OrdersView',
  computed: {
    ...mapGetters(['orders']),
  },
  created() {
    this.$store.dispatch('getOrders');
  },
};
</script>
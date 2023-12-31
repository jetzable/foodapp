<template>
  <div class="h-screen px-6 pt-8 pb-32 overflow-scroll text-accent">
    <section class="mb-8 border-2 rounded-lg shadow-lg border-primary">
      <h1 class="flex items-center justify-center h-36">
        <img :src="require('../assets/JuanitasLunchLogo.png')" class="rounded-t-lg h-36"/>
      </h1>
      <p class="p-2 text-lg text-center text-white bg-primary">We are a family owned and operated business. Come in and enjoy our delicious food!</p>
    </section>
    <section>
      <h2
        class="p-2 mb-4 text-2xl font-bold text-center rounded-lg text-accent bg-gradient-to-r from-primary to-yellow"
        >
        Menu
      </h2>
      <TransitionGroup name="list" tag="ul">
        <li
          v-for="item in menuItems"
          :key="item.id"
          class="w-full border-b border-dashed md:w-1/2 lg:w-1/3 border-primary"
        >
        <CardComponent class="flex my-4" noShadow noPadding>
          <section class="w-1/3 mr-2">
            <img :src="item.image" class="object-cover object-center rounded-full aspect-square"/> 
          </section>
          <section class="flex-grow w-2/3">
            <div>
              <h3 class="mb-2 text-xl font-bold">{{ item.name }}</h3>
              <p class="mb-2 text-md">{{ item.description }}</p>
              <p class="mb-2 font-bold text-md">${{ item.price }}</p>
            </div>
            <div class="flex flex-col items-end">
              <InputComponent
                :id="item.id"
                :modelValue="item.quantity"
                class="w-1/2"
                type="number"
                label="Quantity"
                placeholder=0
                @blur="updateQuantity($event, item)"
              />
              <div class="flex items-center" :class="{'justify-end': item.quantity === 0}">
                <IconButton
                  v-if="item.quantity > 0"
                  class="w-12 h-12 mr-2"
                  variant="primary"
                  @click="deleteItem(item)"
                >
                  <fa icon="trash-can" />
                </IconButton>
                <IconButton
                  v-if="item.quantity > 0"
                  class="w-12 h-12 mr-2"
                  variant="primary"
                  @click="removeFromCart(item)"
                >
                  <fa icon="minus" />
                </IconButton>
                <IconButton
                  class="w-12 h-12"
                  variant="primary"
                  @click="addToCart(item)"
                >
                  <fa icon="plus" />
                </IconButton>
              </div>
            </div>
          </section>
        </CardComponent>
        </li>
      </TransitionGroup>
    </section>
    <section class="absolute bottom-0 right-0 z-20 w-full h-24 shadow-xl bg-gradient-to-l from-primary to-secondary">
      <div class="flex items-center justify-between h-full px-4 mx-auto max-w-7xl">
        <p class="text-xl font-bold text-center text-white">Total: ${{ total }}</p>
        <ButtonComponent
          class="w-1/2"
          variant="secondary"
          @click="checkout"
          label="Checkout"
          :disabled="total === 0"
        />
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import InputComponent from '@/components/InputComponent.vue';
  import IconButton from '@/components/IconButton.vue';
  import ButtonComponent from '@/components/ButtonComponent.vue';
  import CardComponent from '@/components/CardComponent.vue';

  export default {
    name: 'HomeView',
    created() {
      this.$store.dispatch('getMenuItems');
    },
    computed: {
      ...mapGetters(['total', 'menuItems', 'menu']),
    },
    methods: {
      addToCart(item) {
        if (item.quantity === 0) {
          this.$store.commit('ADD_ITEM', item);
        } else {
          this.$store.commit('UPDATE_ITEM_PLUS', item);
        }
      },
      removeFromCart(item) {
        this.$store.commit('UPDATE_ITEM_MINUS', item);
      },
      deleteItem(item) {
        this.$store.commit('DELETE_ITEM', item);
      },
      updateQuantity(event, item) {
        this.$store.commit('UPDATE_QUANTITY', { item, quantity: event.target.value });
      },
      checkout() {
        this.$router.push('/checkout');
      },
    },
    components: {
      InputComponent,
      IconButton,
      ButtonComponent,
      CardComponent,
    },
  }
</script>
<style scoped>
  .list-enter-active,
.list-leave-active {
  transition: all 3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(60px);
}
</style>
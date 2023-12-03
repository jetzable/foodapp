<template>
  <div class="h-screen p-8 pb-32 overflow-scroll text-accent">
    <section class="mb-8 border-2 rounded-lg shadow-lg border-primary">
      <h1 class="flex items-center justify-center">
        <img :src="require('../assets/JuanitasLunchLogo.png')"/>
      </h1>
      <p class="p-2 text-lg text-center text-white bg-primary">We are a family owned and operated business. Come in and enjoy our delicious food!</p>
    </section>
    <section>
      <h2 class="p-2 mb-4 text-2xl font-bold text-center border-2 rounded-lg border-primary">Menu</h2>
      <ul class="flex flex-wrap">
        <li
          v-for="item in menuList"
          :key="item.id"
          class="w-full p-4 border-b border-dashed md:w-1/2 lg:w-1/3 border-primary"
        >
        <CardComponent class="grid grid-cols-8">
          <div class="col-span-5">
            <h3 class="mb-2 text-xl font-bold">{{ item.name }}</h3>
            <p class="mb-2 text-lg">{{ item.description }}</p>
            <p class="mb-2 text-lg font-bold">${{ item.price }}</p>
          </div>
          <div class="flex flex-col justify-center col-span-3">
            <InputComponent
              :id="item.id"
              :modelValue="item.quantity"
              type="number"
              label="Quantity"
              placeholder="0"
              @update:modelValue="updateQuantity(item.id, $event)"
            />
            <div class="flex items-center justify-center">
              <IconButton
                class="w-1/2 mr-2"
                variant="primary"
                @click="addToCart(item)"
              >
                <fa icon="minus" />
              </IconButton>
              <IconButton
                class="w-1/2"
                variant="primary"
                @click="addToCart(item)"
              >
                <fa icon="plus" />
              </IconButton>
            </div>
          </div>
        </CardComponent>
        </li>
      </ul>
    </section>
    <section class="absolute bottom-0 right-0 z-20 w-full h-24 shadow-lg bg-primary">
      <div class="flex items-center justify-between h-full px-4 mx-auto max-w-7xl">
        <p class="text-xl font-bold text-center text-white">Total: ${{ total }}</p>
        <ButtonComponent
          class="w-1/2"
          variant="secondary"
          @click="checkout"
          label="Checkout"
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

  export default {
    computed: {
      ...mapGetters(['menuList', 'total'])
    },
    components: {
      InputComponent,
      IconButton,
      ButtonComponent,
    },
  }
</script>

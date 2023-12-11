<template>
  <div class="relative h-screen px-6 py-8 overflow-y-scroll">
    <h1 class="mb-6 text-2xl text-secondary">Build your menu</h1>
    <ul class="flex-grow mb-24 md:grid md:grid-cols-9 md:gap-4 md:">
      <li v-for="item in menu" :key="item.id" class="md:col-span-3">
        <CardComponent class="grid grid-cols-8 mb-4 md:mb-0 md:h-64">
          <div class="col-span-3 mr-2">
            <img :src="item.image" class="object-cover object-center rounded-full h-28 md:h-24 aspect-square"/> 
          </div>
          <div class="col-span-5">
            <h3 class="mb-2 text-xl font-bold">{{ item.name }}</h3>
            <p class="mb-2 text-md">{{ item.description }}</p>
            <p class="mb-2 font-bold text-md">${{ item.price }}</p>
          </div>
          <div class="flex items-center justify-end col-span-12">
            <IconButton
              class="h-10 mr-2 aspect-square"
              variant="secondary"
              @click="deleteItem(item)"
            >
              <fa icon="trash-can" />
            </IconButton>
            <IconButton
              class="h-10 mr-2 aspect-square"
              variant="primary"
              @click="$store.commit('SET_ITEM_TO_UPDATE', item); $router.push({ name: 'edit' })"
            >
              <fa icon="pencil" />
            </IconButton>
          </div>
        </CardComponent>
      </li>
    </ul>
      <IconButton
        class="fixed w-16 h-16 shadow-xl bottom-8 right-8"
        variant="primary"
        @click="$router.push('/menu-builder')"
      >
        <fa icon="plus" />
      </IconButton>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import IconButton from "@/components/IconButton.vue";
import CardComponent from "@/components/CardComponent.vue";

export default {
  name: "MenuBuilderView",
  created() {
    this.$store.dispatch("getMenuItems");
  },
  computed: {
    ...mapGetters(["total", "menuItems", "menu"]),
  },
  methods: {
    deleteItem(item) {
      this.$store.dispatch("deleteMenuItem", item);
    },
  },
  components: {
    IconButton,
    CardComponent
},
};
</script>

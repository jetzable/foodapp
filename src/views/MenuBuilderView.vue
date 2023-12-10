<template>
  <form class="relative px-6 py-8" @submit.prevent="createNewMenuItem">
    <h2 class="mb-6 text-xl text-secondary">Add a new menu item</h2>
    <InputComponent
      id="name"
      class="w-full"
      label="Name"
      placeholder="Torta de Milanesa"
      v-model="newMenuItem.name"
      type="text"
    />
    <InputComponent
      id="description"
      class="w-full"
      label="Description"
      placeholder="Torta de Milanesa con quesillo y tomate fresco."
      v-model="newMenuItem.description"
      type="text"
    />
    <InputComponent
      id="price"
      class="w-full"
      label="Price"
      placeholder="100"
      v-model="newMenuItem.price"
      type="number"
    />
    <InputComponent
      id="image"
      class="w-full"
      label="Image URL"
      placeholder="https://images.pexels.com/photos/3646103/pexels-photo-3646103.jpeg"
      v-model="newMenuItem.image"
      type="text"
    />
    <div class="flex items-center justify-end">
      <ButtonComponent
        type="submit"
        variant="primary"
        label="Add"
        :disabled="!newMenuItem.name || !newMenuItem.description || !newMenuItem.price || !newMenuItem.image"
      />
    </div>
  </form>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import router from "@/router";

export default {
  name: "MenuBuilderView",
  components: {
    InputComponent,
    ButtonComponent,
},
  setup() {
    const store = useStore();
    const newMenuItem = ref({
      name: "",
      description: "",
      price: 0,
      active: true,
      image: "https://picsum.photos/200/300",
    });

    const createNewMenuItem = () => {
      store.dispatch("createNewMenuItem", newMenuItem.value);
      newMenuItem.value = {
        name: "",
        description: "",
        price: 0,
        active: true,
        image: "https://picsum.photos/200/300",
      };
      router.push("/menu");
    };

    return {
      newMenuItem,
      createNewMenuItem,
    };
  },
};
</script>
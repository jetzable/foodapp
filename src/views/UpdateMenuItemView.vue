<template>
  <form class="relative px-6 py-8" @submit.prevent="updateMenuItem">
    <h2 class="mb-6 text-xl text-secondary">Edit this item</h2>
    <InputComponent
      id="name"
      class="w-full"
      label="Name"
      placeholder="Torta de Milanesa"
      v-model="itemToUpdate.name"
      type="text"
    />
    <InputComponent
      id="description"
      class="w-full"
      label="Description"
      placeholder="Torta de Milanesa con quesillo y tomate fresco."
      v-model="itemToUpdate.description"
      type="text"
    />
    <InputComponent
      id="price"
      class="w-full"
      label="Price"
      placeholder="100"
      v-model="itemToUpdate.price"
      type="number"
    />
    <InputComponent
      id="image"
      class="w-full"
      label="Image URL"
      placeholder="https://images.pexels.com/photos/3646103/pexels-photo-3646103.jpeg"
      v-model="itemToUpdate.image"
      type="text"
    />
    <div class="flex items-center justify-end">
      <ButtonComponent
        type="submit"
        variant="primary"
        label="Edit"
        :disabled="!itemToUpdate.name || !itemToUpdate.description || !itemToUpdate.price || !itemToUpdate.image"
      />
    </div>
  </form>
</template>
<script>
import { useStore } from "vuex";
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { mapState } from "vuex";

export default {
  name: "UpdateMenuItemView",
  components: {
    InputComponent,
    ButtonComponent,
  },
  computed: {
    ...mapState(["itemToUpdate"]),
  },
  setup() {
    const store = useStore();

    const updateMenuItem = async () => {
      await store.dispatch("updateMenuItem");
    };

    return {
      updateMenuItem,
    };
  },
};
</script>
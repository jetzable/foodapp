<!-- InputComponent.vue -->

<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="{'border-red-500': isError}"
      @input="handleInput"
      class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition duration-150 ease-in-out"
    />
    <p v-if="isError" class="mt-2 text-sm text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: 'Error message goes here.',
    },
  },
  setup(props, { emit }) {
    const handleInput = (event) => {
      emit('update:modelValue', event.target.value);
    };

    return {
      handleInput,
    };
  },
};
</script>

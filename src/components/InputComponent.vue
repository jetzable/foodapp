<!-- InputComponent.vue -->

<template>
  <div v-if="textArea">
    <label v-if="label" :for="id" class="block text-sm font-medium text-secondary">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="{'border-red': isError}"
      @input="handleInput"
      class="block w-full p-2 mt-1 transition duration-150 ease-in-out border rounded-md border-primary focus:outline-none focus:border-accent focus:ring focus:ring-accent"
    ></textarea>
    <p v-if="isError" class="mt-2 text-sm text-red">{{ errorMessage }}</p>
  </div>
  <div class="mb-4" v-else>
    <div class="flex items-center">
      <label v-if="label" :for="id" class="block text-sm font-medium text-secondary">{{ label }}</label>
      <fa :icon="['fas', 'asterisk']" v-if="required" class="ml-1 text-red" />
    </div>
    <input      
      :type="type"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="{'border-red': isError}"
      @input="handleInput"
      class="block w-full p-2 mt-1 transition duration-150 ease-in-out border rounded-md border-primary focus:outline-none focus:border-accent focus:ring focus:ring-accent"
    />
    <p v-if="isError" class="mt-2 text-sm text-red">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    textArea: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
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

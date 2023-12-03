<!-- ButtonComponent.vue -->

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
    label: {
      type: String,
      default: 'Click me',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md', // Possible values: 'sm', 'md', 'lg'
    },
    variant: {
      type: String,
      default: 'primary', // Possible values: 'primary', 'secondary', 'success', 'danger', 'warning', 'info'
    },
  },
  computed: {
    buttonClasses() {
      return [
        'px-4',
        'py-2',
        'border',
        'rounded-lg',
        'uppercase',
        {
          'text-white': this.variant !== 'white',
          'bg-primary text-white': this.variant === 'primary',
          'bg-secondary': this.variant === 'secondary',
          'bg-green-500': this.variant === 'success',
          'bg-red-500': this.variant === 'danger',
          'bg-yellow-500': this.variant === 'warning',
          'bg-teal-500': this.variant === 'info',
          'cursor-not-allowed opacity-50': this.disabled,
          'text-sm': this.size === 'sm',
          'text-lg': this.size === 'lg',
          'hover:bg-opacity-75 font-semibold': !this.disabled,
          'active:bg-opacity-90 font-bold': !this.disabled,
        },
      ];
    },
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('click');
      }
    },
  },
};
</script>

<style scoped>
/* You can add additional styling or override Tailwind CSS classes here */
</style>

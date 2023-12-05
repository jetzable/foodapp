<template>
  <button :class="buttonClasses">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger'].includes(value),
    },
  },
  computed: {
    buttonClasses() {
      return [
        'flex',
        'items-center',
        'justify-center',
        'p-2',
        'text-white',
        'rounded-full',
        'shadow-lg',
        {
          'bg-primary': this.variant === 'primary',
          'bg-secondary': this.variant === 'secondary',
          'bg-danger': this.variant === 'danger',
        },
        'hover:opacity-75',
        'focus:outline-none',
      ];
    },
  },
}
</script>

<style scoped>
/* Add any additional styles here */
</style>

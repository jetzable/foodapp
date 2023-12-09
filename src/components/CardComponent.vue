<template>
  <div class="rounded-lg" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CardComponent',
  computed: {
    classes() {
      return {
        'shadow-xl': !this.noShadow,
        'bg-white': !this.primary,
        'bg-primary': this.primary,
        'p-4': !this.noPadding
      };
    },
  },
  props: {
    noShadow: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
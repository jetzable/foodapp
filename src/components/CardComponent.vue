<template>
  <div class="p-4 bg-white rounded-lg" :class="classes">
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
      };
    },
  },
  props: {
    noShadow: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
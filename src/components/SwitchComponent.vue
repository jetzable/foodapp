<template>
  <div class="inline-block">
    <input
      type="checkbox"
      :id="id"
      :checked="value"
      @change="toggleSwitch"
      class="hidden"
    />
    <label :for="id" class="flex items-center cursor-pointer select-none">
      <span class="switch-inner"></span>
      <span class="switch-switch"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleSwitch() {
      this.$emit('input', !this.value);
    },
  },
};
</script>

<style scoped>

.switch-inner {
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  transition: background-color 0.3s;
}

.switch-switch {
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.switch-checkbox:checked + .switch-label .switch-inner {
  background-color: #69d1ab;
}

.switch-checkbox:checked + .switch-label .switch-switch {
  transform: translateX(20px);
}
</style>

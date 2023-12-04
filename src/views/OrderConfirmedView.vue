<template>
  <div class="h-screen overflow-y-auto">
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="mb-4 text-4xl font-bold text-center text-primary">
        Order Confirmed!
      </h1>
      <p class="mb-4 text-xl text-center text-primary">
        Your order has been confirmed.
      </p>
      <ButtonComponent
        class="w-full"
        type="button"
        variant="secondary"
        label="Back to Menu"
        @click="$router.push({ name: 'home' })"
      />
    </div>
  </div>
</template>
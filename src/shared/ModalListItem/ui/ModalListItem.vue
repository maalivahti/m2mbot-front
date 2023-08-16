<template>
  <div class="col row">
    <span class="base-modal__label col-4">{{ label }} </span>
    <span class="base-modal__descr text-body2 col-8">{{ descr ? descr : 'Не указан' }}</span>
  </div>
</template>

<script setup>

// eslint-disable-next-line
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  descr: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>

</style>

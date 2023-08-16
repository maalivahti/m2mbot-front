<template>
  <q-btn outline dense :color="color" :label="label" />
</template>

<script setup>
import { isNotEmptyStringValidate } from 'src/app/helpers/validate';

defineProps({
  label: {
    type: String,
    default: 'add',
    validator: isNotEmptyStringValidate,
  },

  color: {
    type: String,
    default: 'indigo',
    validator: isNotEmptyStringValidate,
  },
});
</script>

<style scoped>

</style>

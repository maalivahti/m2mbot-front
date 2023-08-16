<template>
  <q-btn class="main-table__icon-btn q-mr-sm" square :color="iconColor" :icon="icon">
      <q-tooltip v-if="tooltipText">{{ tooltipText }}</q-tooltip>
  </q-btn>

</template>

<script setup>
import { isNotEmptyStringValidate } from 'src/app/helpers/validate';

defineProps({
  icon: {
    type: String,
    default: 'add',
    validator: isNotEmptyStringValidate,
  },

  iconColor: {
    type: String,
    default: 'indigo',
    validator: isNotEmptyStringValidate,
  },

  tooltipText: {
    type: String,
    required: false,
  },
});
</script>

<style scoped>

</style>

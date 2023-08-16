<template>
<q-btn flat round :color="iconColor" :icon="icon">
  <q-tooltip v-if="tooltip"> {{ tooltip }}</q-tooltip>
</q-btn>
</template>

<script setup>
defineProps({
  tooltip: { type: String, required: false },
  icon: { type: String, required: false },
  iconColor: { type: String, required: false },
});
</script>

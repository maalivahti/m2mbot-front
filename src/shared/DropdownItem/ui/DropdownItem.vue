<template>
  <q-item clickable v-close-popup>
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
});
</script>

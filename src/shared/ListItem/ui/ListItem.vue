<template>
  <q-item>
    <q-item-section>
      <q-item-label overline>{{ label }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <slot/>
    </q-item-section>
  </q-item>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps({
  label: { type: String, require: true },
});

</script>

<style scoped>
  .q-item__label {
    font-family: SFPro, Roboto, sans-serif;
    letter-spacing: normal;
    font-weight: 700;
    font-size: .8rem;
  }
</style>

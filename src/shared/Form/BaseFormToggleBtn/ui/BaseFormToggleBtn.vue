<template>
    <q-btn-toggle
      v-model="dataValue"
      toggle-color="primary"
      :options="options"
      class="toggle-btn"
      spread
      no-wrap
      no-caps
    />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  options: { type: Array, required: true },
  modelValue: { type: String, required: false },
});
const emit = defineEmits(['change', 'delete', 'update:modelValue']);

const dataValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

</script>

<style lang="scss">
  .toggle-btn {
    width: 100%;

    .q-btn {
      min-height: 30px;
      font-size: 12px;
    }
  }
</style>

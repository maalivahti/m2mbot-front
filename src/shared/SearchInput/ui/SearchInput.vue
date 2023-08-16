<template>
  <q-input v-model="dataValue"
           outlined
           dense
           debounce="300"
           placeholder="Поиск"
  >
    <template v-slot:append>
      <q-icon name="search"/>
    </template>
  </q-input>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
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

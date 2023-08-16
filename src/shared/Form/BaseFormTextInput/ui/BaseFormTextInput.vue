<template>
  <q-input outlined
           dense
           debounce="500"
           v-model="dataValue"
           :rules="validRules"
           class="base-modal__input col-7"
  />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
  },
  validRules: {
    type: Array,
    required: false,
  },
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

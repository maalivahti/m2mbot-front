<template>
<label class="base-modal__row col justify-between items-center no-wrap">
  <span class="base-modal__label text-subtitle2 row">{{ title }} </span>
  <q-input v-model="dataValue"
           class="base-modal__input"
           outlined
           autogrow
  />
</label>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
  },
  title: {
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

<style scoped lang="scss">
.base-modal__input {
  max-height: 300px;
}
</style>

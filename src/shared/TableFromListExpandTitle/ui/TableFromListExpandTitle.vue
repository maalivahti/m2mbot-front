<template>
<p class="list-table__row-name q-pa-sm cursor-pointer bg-primary text-white"
   @click="dataValue.expand = !dataValue.expand"
>
  <q-icon size="sm" color="white" round dense :name="dataValue.expand ? 'remove' : 'add'" />
  {{ dataValue[labelField] }}
</p>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: { type: Object, required: true },
  labelField: { type: String, required: true },
});

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
.list-table__row-name {
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid var(--color-light);
}
</style>

<template>
  <div class="q-gutter-sm">
    <base-form-checkbox v-for="field in formOptions.servicesCheckList"
                        :key="field.field"
                        :title="field.label" v-model="dataValue[field.field]" class="col-8"/>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { BaseFormCheckbox } from 'src/shared/Form/BaseFormCheckbox';
import formOptions from '../module/formOptions';

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const emit = defineEmits(['update:modelValue']);

const dataValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

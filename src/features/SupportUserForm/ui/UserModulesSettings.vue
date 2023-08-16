<template>
  <div class="q-gutter-sm">
    <base-form-checkbox v-for="field in formOptions.modulesCheckList"
                        :key="field.field"
                        :title="field.label" v-model="dataValue[field.field]"
    />

    <base-form-field title="Шаблон путевого:">
      <base-form-select v-model="dataValue.template_travel" :options="templateList"/>
    </base-form-field>

    <base-form-field title="Регион:">
      <base-form-select v-model="dataValue.location" :options="formOptions.regionOptions"/>
    </base-form-field>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { BaseFormField } from 'src/shared/Form/BaseFormField';
import { BaseFormSelect } from 'src/shared/Form/BaseFormSelect';
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

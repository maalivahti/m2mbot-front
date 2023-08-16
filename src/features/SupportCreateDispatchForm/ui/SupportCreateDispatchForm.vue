<template>
  <q-card-section class="base-modal__body scroll" style="max-height: 50vh">
    <div class="q-gutter-sm">
      <base-form-field title="Уч.запись/Компания:">
        <base-form-toggle-btn :options="formOptions.dispatchTypeOptions" v-model="dataValue.dispType"/>
      </base-form-field>
      <base-form-field :title="dispTypeTitle">
        <base-form-select v-if="dataValue.dispType === 'acc'" v-model="dataValue.status" :options="formOptions.dispatchStatusOptions"/>
        <base-form-select v-else v-model="dataValue.status" :options="formOptions.dispatchStatusOptions"/>
      </base-form-field>
      <base-form-field title="Начало">
        <base-form-date-picker v-model:date="dataValue.dateStart" date-picker-type="days"/>
      </base-form-field>
      <base-form-field title="Конец">
        <base-form-date-picker v-model:date="dataValue.dateEnd" date-picker-type="days"/>
      </base-form-field>
      <base-form-field title="Статус:">
        <base-form-select v-model="dataValue.status" :options="formOptions.dispatchStatusOptions"/>
      </base-form-field>
    </div>
  </q-card-section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { BaseFormField } from 'src/shared/Form/BaseFormField';
import { BaseFormSelect } from 'src/shared/Form/BaseFormSelect';
import { BaseFormToggleBtn } from 'src/shared/Form/BaseFormToggleBtn';
import { BaseFormDatePicker } from 'src/shared/Form/BaseFormDatePicker';
import formOptions from '../module/formOptions';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
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

const dispTypeTitle = ref(dataValue.value.dispType === 'acc' ? 'Учетная запись' : 'Компания');
</script>

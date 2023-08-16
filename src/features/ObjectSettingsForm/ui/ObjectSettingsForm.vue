<template>
  <q-card-section class="base-modal__body scroll" style="max-height: 50vh">
    <div class="q-gutter-sm">
      <base-form-field title="Компания">
        <base-form-text-input v-model="dataValue.owner" readonly/>
      </base-form-field>
      <base-form-field title="Объект">
        <base-form-text-input v-model="dataValue.name" readonly/>
      </base-form-field>
      <base-form-field title="Марка">
        <base-form-text-input v-model="dataValue.brand"/>
      </base-form-field>
      <base-form-field title="Модель">
        <base-form-text-input v-model="dataValue.model"/>
      </base-form-field>
      <base-form-field title="Гос. номер">
        <base-form-text-input v-model="dataValue.gos_number"/>
      </base-form-field>
      <base-form-field title="Тип ТС">
        <base-form-select v-model="dataValue.type_v" :options="selectOptions.typeObjectOptions"/>
      </base-form-field>
      <base-form-field title="Категория">
        <base-form-select v-model="dataValue.category_v" :options="selectOptions.categoryObjectOptions"/>
      </base-form-field>
      <base-form-field title="Тип топлива">
        <base-form-select v-model="dataValue.type_fuel" :options="selectOptions.fuelTypeOptions"/>
      </base-form-field>
      <base-form-field title="Основание расхода">
        <base-form-select v-model="dataValue.status_consum_n" :options="selectOptions.consumObjectOptions"/>
      </base-form-field>
      <base-form-field title="Объем бака">
        <base-form-text-input v-model="dataValue.fuel_tank"/>
      </base-form-field>
      <base-form-field title="Допустимый % погрешности">
        <base-form-text-input v-model="dataValue.perms_fault"/>
      </base-form-field>
      <base-form-field title="Норма расхода (100км)">
        <base-form-text-input v-model="dataValue.norm_consum"/>
      </base-form-field>
      <base-form-field title="Норма расхода (ч)">
        <base-form-text-input v-model="dataValue.norm_consum_mh"/>
      </base-form-field>
      <base-form-field title="Норма расхода на холостом">
        <base-form-text-input v-model="dataValue.norm_consum_mh_hh"/>
      </base-form-field>
      <base-form-field title="Уровень топлива">
        <base-form-text-input v-model="dataValue.fuel_now"/>
      </base-form-field>
      <base-form-field title="Текущий пробег">
        <base-form-text-input v-model="dataValue.odometer"/>
      </base-form-field>
      <base-form-field title="Категория"></base-form-field>
      <div>
        <q-checkbox left-label size="30px"
                    v-model="dataValue.ignore_fd"
                    class="text-subtitle2 col-4"
                    label="Игнорировать сливы"/>
      </div>
      <div>
        <q-checkbox left-label size="30px"
                    v-model="dataValue.get_gazprom_fu"
                    class="text-subtitle2 col-4"
                    label="Брать заправки из транзакций"/>
      </div>
    </div>
  </q-card-section>
</template>

<script setup>
import { BaseFormField } from 'src/shared/Form/BaseFormField';
import { BaseFormTextInput } from 'src/shared/Form/BaseFormTextInput';
import { BaseFormSelect } from 'src/shared/Form/BaseFormSelect';
import postData from 'src/app/api/postData';
import { computed, onUnmounted, watch } from 'vue';
import selectOptions from '../module/selectOptions';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  submitForm: {
    type: Boolean,
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

watch(
  () => props.submitForm,
  () => {
    postData('/home/edit_object_settings/', dataValue.value)
      .then((response) => {
        emit('updateObjectTable', JSON.parse(response.data.obj_data));
      })
      .catch((error) => { if (error) throw error; })
      .finally(() => { emit('formSending'); });
  },
);

onUnmounted(() => {
  dataValue.value = {};
});

</script>

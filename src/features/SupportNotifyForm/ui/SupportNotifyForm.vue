<template>
  <q-card-section class="base-modal__body scroll" style="max-height: 50vh">
    <div class="q-gutter-sm">
      <base-form-field title="Название уведомления:">
        <base-form-text-input v-model="dataValue.name" placeholder="Название уведомления"/>
      </base-form-field>

      <base-form-field title="Тип события:">
        <base-form-select v-model="dataValue.event" :options="formOptions.typeEventList"/>
      </base-form-field>

      <base-form-field title="Вид отправки:">
        <base-form-select v-model="dataValue.type_notif" :options="formOptions.typeSending"/>
      </base-form-field>

      <base-form-field title="ID Telegram:" v-if="dataValue.type_notif === 'telegram'">
        <base-form-text-input v-model="dataValue.telegram_id" placeholder="ID Telegram канала"/>
      </base-form-field>

      <base-form-field title="E-mail:" v-if="dataValue.type_notif === 'email'">
        <base-form-text-input v-model="dataValue.email" placeholder="E-mail для уведомлений"/>
      </base-form-field>

      <base-form-field title="Тип объекта:">
        <base-form-select v-model="dataValue.type_object" :options="formOptions.typeObject"/>
      </base-form-field>

      <base-form-field title="Объект:" v-if="dataValue.type_object === 'object'">
        <base-form-select v-model="dataValue.object" :options="objectList"/>
      </base-form-field>

      <base-form-field title="Компания:" v-if="dataValue.type_object === 'company'">
        <base-form-select v-model="dataValue.company" :options="companyList"/>
      </base-form-field>
    </div>
  </q-card-section>
</template>

<script setup>
import {
  computed,
  onBeforeMount, onUnmounted,
  ref,
  watch,
} from 'vue';
import { BaseFormField } from 'src/shared/Form/BaseFormField';
import { BaseFormTextInput } from 'src/shared/Form/BaseFormTextInput';
import { BaseFormSelect } from 'src/shared/Form/BaseFormSelect';
import getData from 'src/app/api/getData';
import sendData from 'src/app/api/sendData';
import convertObjectsToArray from 'src/app/helpers/convertObjectsToArray';
import formOptions from '../module/formOptions';

const props = defineProps({
  modelValue: { type: Object, required: true },
  submitForm: { type: Boolean, required: true },
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

const formState = computed({
  get() {
    return props.submitForm;
  },
  set(value) {
    emit('update:submitForm', value);
  },
});

const isUpdate = !!dataValue.value.notifId;
const notifyFormUrl = '/lk_techsupp/create_notify/';
const companyList = ref([]);
const objectList = ref([]);

onBeforeMount(() => {
  const { notifId } = dataValue.value;
  getData('/lk_techsupp/create_notify/', { notifId })
    .then((data) => {
      if (notifId) dataValue.value = JSON.parse(data.notify_data)[0];
      return data;
    })
    .then((data) => {
      companyList.value = convertObjectsToArray(data.comp_list, 'company_name', 'id');
      objectList.value = convertObjectsToArray(data.obj_list, 'name', 'id');
    })
    .then(() => {
      dataValue.value.event = dataValue.value.event ?? formOptions.typeEventList[0].value;
      dataValue.value.type_notif = dataValue.value.type_notif ?? formOptions.typeSending[0].value;
      dataValue.value.type_object = dataValue.value.type_object ?? formOptions.typeObject[0].value;
      dataValue.value.company = dataValue.value.company ?? companyList.value[0].value;
      dataValue.value.object = dataValue.value.object ?? objectList.value[0].value;
    });
});

watch(
  () => props.submitForm,
  () => {
    const method = isUpdate ? 'put' : 'post';

    sendData(notifyFormUrl, dataValue.value, method)
      .then((response) => {
        emit('updateNotifyTable', JSON.parse(response.data.update_data), isUpdate);
      })
      .catch((error) => { if (error) throw error; })
      .finally(() => { emit('formSending'); });
  },
);

onUnmounted(() => {
  dataValue.value = {};
  formState.value = false;
});

</script>

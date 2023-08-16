<template>
  <q-card-section class="base-modal__body scroll" style="max-height: 50vh">
    <div class="q-gutter-sm">
      <base-form-field title="Учетная запись:">
        <base-form-select v-model="dataValue.main_acc" :options="accList"/>
      </base-form-field>

      <base-form-field title="Код 1С:">
        <base-form-text-input v-model="dataValue.one_c_code"
                              :placeholder="!dataValue.one_c_code === null ? 'Не указан' : ''"/>
      </base-form-field>

      <base-form-field title="Bitrix ID:">
        <base-form-text-input v-model="dataValue.bitrix_id" :placeholder="!dataValue.bitrix_id ? 'Не указан' : ''"/>
      </base-form-field>

      <base-form-field title="E-mail для уведомлений:">
        <base-form-text-input v-model="dataValue.e_mail" :placeholder="!dataValue.e_mail ? 'Не указан' : ''"/>
      </base-form-field>

      <base-form-field title="Аб.договор СМТ:">
        <base-form-select v-model="dataValue.subscribe_contract_id" :options="contractList"/>
      </base-form-field>

      <base-form-field title="Кредитный лимит:">
        <base-form-text-input v-model="dataValue.credit_limit"
                              :placeholder="!dataValue.credit_limit ? 'Не задан' : ''"/>
      </base-form-field>

      <base-form-field title="Диспетчеризация:">
        <base-form-toggle-btn :options="formOptions.dispatchOptions" v-model="dataValue.disp"/>
      </base-form-field>

      <div>
        <q-checkbox left-label size="30px"
                    v-model="dataValue.notif_to"
                    class="text-subtitle2 col-4"
                    label="Уведомления с ТО:"/>
      </div>

      <div>
        <q-checkbox left-label size="30px"
                    v-model="dataValue.notif_tp"
                    class="text-subtitle2 col-4"
                    label="Уведомления с ТП:"/>
      </div>

      <base-form-field title="Доступ к путевым:">
        <base-form-toggle-btn :options="formOptions.moduleOption" v-model="dataValue.travel_acc"/>
      </base-form-field>

      <base-form-field title="Доступ к транзакциям:">
        <base-form-toggle-btn :options="formOptions.moduleOption" v-model="dataValue.trans_acc"/>
      </base-form-field>

      <base-form-field title="Доступ к сливам:">
        <base-form-toggle-btn :options="formOptions.moduleOption" v-model="dataValue.fd_acc"/>
      </base-form-field>

      <base-form-field title="Доступ к диагностике:">
        <base-form-toggle-btn :options="formOptions.moduleOption" v-model="dataValue.diagn_acc"/>
      </base-form-field>
    </div>
  </q-card-section>
</template>

<script setup>
import postData from 'src/app/api/postData';
import {
  computed,
  onBeforeMount,
  onUnmounted, ref,
  watch,
} from 'vue';
import { BaseFormField } from 'src/shared/Form/BaseFormField';
import { BaseFormTextInput } from 'src/shared/Form/BaseFormTextInput';
import { BaseFormSelect } from 'src/shared/Form/BaseFormSelect';
import { BaseFormToggleBtn } from 'src/shared/Form/BaseFormToggleBtn';
import getData from 'src/app/api/getData';
import convertObjectsToArray from 'src/app/helpers/convertObjectsToArray';
import formOptions from '../module/formOptions';

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

const formState = computed({
  get() {
    return props.submitForm;
  },
  set(value) {
    emit('update:submitForm', value);
  },
});

const accList = ref(null);
const contractList = ref(null);

onBeforeMount(() => {
  dataValue.value.subscribe_contract_id = dataValue.value.subscribe_contract_id || 'Не указан';
  getData('/lk_manager/edit_company_settings/', { compId: dataValue.value.compId })
    .then((data) => {
      accList.value = convertObjectsToArray(data.accList, 'name', 'id');
      contractList.value = convertObjectsToArray(data.contractList, 'number', 'id');
      dataValue.value = JSON.parse(data.company_data)[0];
    });
});

watch(
  () => props.submitForm,
  () => {
    postData('/lk_manager/edit_company_settings/', dataValue.value)
      .then((response) => {
        emit('updateManagerTable', response.data.update_comp);
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

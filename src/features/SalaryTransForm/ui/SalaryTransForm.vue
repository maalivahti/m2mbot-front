<template>
  <q-card-section class="base-modal__body scroll" style="max-height: 50vh">
    <div class="q-gutter-sm">
      <base-form-field title="Дата:">
        <base-form-date-picker v-model:date="dataValue.date"
                               model-msk="YYYY-MM-DDTHH:mm:ss.SSSZ"
                               readonly :disabled="true"
                               date-picker-type="days"
        />
      </base-form-field>
      <base-form-field title="Сотрудник:">
        <base-form-select v-model="dataValue.new_staff" :options="staffSelectOptions"/>
      </base-form-field>
      <base-form-field title="Период:">
        <base-form-date-picker v-model:date="dataValue.year_and_month" model-msk="YYYY-MM-DD" date-picker-type="months"/>
      </base-form-field>
      <base-form-field title="Сумма:">
        <base-form-text-input v-model="dataValue.sum" type="number"/>
      </base-form-field>
      <base-form-field title="Основание:">
        <base-form-select v-model="dataValue.reason" :options="reasonSelectOptions"/>
      </base-form-field>
      <base-form-text-field title="Комментарий:" v-model="dataValue.commentary" />
    </div>
  </q-card-section>
</template>

<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  watch,
  ref,
} from 'vue';
import { date } from 'quasar';
import { useUserStore } from 'src/app/store/user-store';
import postData from 'src/app/api/postData';
import getData from 'src/app/api/getData';
import convertObjectsToArray from 'src/app/helpers/convertObjectsToArray';
import { BaseFormField } from 'src/shared/Form/BaseFormField';
import { BaseFormSelect } from 'src/shared/Form/BaseFormSelect';
import { BaseFormDatePicker } from 'src/shared/Form/BaseFormDatePicker';
import { BaseFormTextInput } from 'src/shared/Form/BaseFormTextInput';
import { BaseFormTextField } from 'src/shared/Form/BaseFormTextField';
import { convertReasonArrayToOptionsList } from '../helpers/convertReasonArrayToOptionsList';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  submitForm: {
    type: Boolean,
    required: false,
    default: false,
  },
  staffList: {
    type: Array,
    required: true,
  },
});

const { user } = useUserStore();

const emit = defineEmits(['formServerError', 'update:modelValue']);

const dataValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const staffSelectOptions = convertObjectsToArray(props.staffList, 'full_name', 'id').reverse();
const reasonSelectOptions = ref([]);

watch(
  () => props.submitForm,
  () => {
    postData('/salary/salary_trans_form/', dataValue.value)
      .then((response) => {
        emit('updateSalaryTable', JSON.parse(response.data.trans_serialize));
      })
      .catch((error) => {
        if (error.response.status === 500) emit('formServerError');
        throw error;
      })
      .finally(() => { emit('formSending'); });
  },
);

onMounted(() => {
  getData('/salary/get_reason_list/').then((data) => {
    reasonSelectOptions.value = convertReasonArrayToOptionsList(data.reason_list);
  });
  dataValue.value.date = date.formatDate(new Date(), 'YYYY-MM-DDTHH:mm:ss.SSSZ');
  dataValue.value.responsible = user.fio;
  dataValue.value.new_resp = user.staff_id;
});

onUnmounted(() => {
  dataValue.value = {};
});
</script>

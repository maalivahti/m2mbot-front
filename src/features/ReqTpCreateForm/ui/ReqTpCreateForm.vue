<template>
  <q-card-section class="base-modal__body scroll" style="max-height: 50vh">
    <div class="q-gutter-sm">
      <base-form-field title="Компания:">
        <base-form-select v-model="dataValue.company" :options="companyList"/>
      </base-form-field>
      <base-form-field title="Объект:">
        <base-form-select v-model="dataValue.object" :options="objectList"/>
      </base-form-field>
      <base-form-field title="Инициатор:">
        <base-form-text-input v-model="dataValue.author"/>
      </base-form-field>
      <base-form-field title="Контактный номер:">
        <base-form-text-input v-model="dataValue.authorNumber"/>
      </base-form-field>
      <base-form-text-field title="Комментарий:" v-model="dataValue.comment" />
    </div>
  </q-card-section>
</template>

<script setup>
import {
  computed, onUnmounted,
  ref,
  watch,
} from 'vue';
import { useUserStore } from 'src/app/store/user-store';
import companyListForSelect from 'src/app/helpers/companyListForSelect';
import convertObjectsJSONToArray from 'src/app/helpers/convertObjectsJSONToArray';
import { BaseFormField } from 'src/shared/Form/BaseFormField';
import { BaseFormSelect } from 'src/shared/Form/BaseFormSelect';
import { BaseFormTextInput } from 'src/shared/Form/BaseFormTextInput';
import { BaseFormTextField } from 'src/shared/Form/BaseFormTextField';
import { getData } from 'src/app/helpers/getData';
import postData from 'src/app/api/postData';

const userStore = useUserStore();
const companyList = ref(companyListForSelect(userStore.companyList));
const objectList = ref([]);

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
  () => dataValue.value.company,
  (state) => {
    dataValue.value.object = '';
    getData('/home/get_company_obj', { compId: state })
      .then((data) => {
        objectList.value = convertObjectsJSONToArray(data.req_data, 'name', 'id');
      });
  },
  { deep: true },
);

watch(
  () => props.submitForm,
  () => {
    postData('/home/create_req_tp/', dataValue.value)
      .then((response) => {
        emit('updateReqTpTable', JSON.parse(response.data.req_data));
      })
      .catch((error) => { if (error) throw error; })
      .finally(() => { emit('formSending'); });
  },
);

onUnmounted(() => {
  dataValue.value = {};
});

</script>

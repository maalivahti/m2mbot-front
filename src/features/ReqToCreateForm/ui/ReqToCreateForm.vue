<template>
  <q-card-section class="base-modal__body scroll" style="max-height: 50vh">
    <div class="q-gutter-sm">
      <base-form-field title="Компания:">
        <base-form-select v-model="dataValue.company" :options="selectItems"/>
      </base-form-field>

      <base-form-field title="Объект:">
        <div class="flex" style="width: 100%;">
          <q-checkbox left-label size="30px"
                      v-if="dataValue.obj === 'objNotWialon'"
                      v-model="dataValue.objNewCheck"
                      class="text-subtitle2"
                      label="Новый"/>
          <base-form-toggle-btn :options="formOptions.objToggleOptions" v-model="dataValue.obj"/>
        </div>
      </base-form-field>

      <base-form-field title="Объект заявки:">
        <div class="row no-wrap flex-end q-gutter-sm"
             v-if="dataValue.objNewCheck && dataValue.obj === 'objNotWialon'">
          <q-input outlined
                   dense
                   debounce="500"
                   v-model="dataValue.objNewBrand"
                   label="Марка"
                   class="base-modal__input"/>
          <q-input outlined
                   dense
                   debounce="500"
                   v-model="dataValue.objNewModel"
                   label="Модель"
                   class="base-modal__input"/>
          <q-input outlined
                   dense
                   debounce="500"
                   v-model="dataValue.objNewNum"
                   label="Гос.номер"
                   class="base-modal__input"/>
        </div>
        <base-form-select v-model="dataValue.object" :options="objectList" v-if="dataValue.obj === 'objIsWialon'"/>
        <base-form-select v-model="dataValue.objNotWialon"
                          :options="clientObjectList"
                          v-if="dataValue.obj === 'objNotWialon' && !dataValue.objNewCheck"/>
      </base-form-field>

      <base-form-field title="Вид заявки:">
        <base-form-select v-model="dataValue.type" :options="formOptions.reqTypeOptions"/>
      </base-form-field>

      <base-form-field title="Планируемая дата:">
        <base-form-date-picker v-model:date="dataValue.datePlan"
                               date-picker-type="days"
                               :rules="[val => validation.validationPatterns.notEmpty(val)]"
        />
      </base-form-field>

      <base-form-field title="Место проведения работ:">
        <base-form-toggle-btn :options="formOptions.reqPlaceOption" v-model="dataValue.placeSwitch"/>
      </base-form-field>

      <base-form-field title="Адрес:">
        <base-form-select v-model="dataValue.placeBox"
                          :options="boxAddressList"
                          v-if="dataValue.placeSwitch === 'boxM2M'"/>
        <div class="col-2" v-if="dataValue.placeSwitch === 'depart'">
          <q-checkbox left-label size="30px"
                      v-model="dataValue.placeCheck"
                      class="text-subtitle2"
                      label="Новый"/>
        </div>
        <div class="col-5" v-if="dataValue.placeSwitch === 'depart'">
          <base-form-select v-model="dataValue.place"
                            :options="clientAddressList"
                            v-if="!dataValue.placeCheck"
                            class="q-mb-sm"
          />
          <q-input outlined
                   dense
                   debounce="500"
                   v-model="dataValue.clientAddressName"
                   label="Название адреса"
                   v-else
                   class="base-modal__input q-mb-sm"
          />
          <q-input outlined
                   dense
                   debounce="500"
                   v-model="dataValue.clientAddress"
                   placeholder="Адрес"
                   class="base-modal__input q-mb-sm"
          />
          <q-checkbox left-label size="30px"
                      v-model="dataValue.placeBoxWram"
                      class="text-subtitle2"
                      label="Теплый бокс"/>
          <q-checkbox left-label size="30px"
                      v-model="dataValue.placeBoxElectric"
                      class="text-subtitle2"
                      label="Электричество"/>
        </div>
      </base-form-field>

      <label class="base-modal__row row justify-between items-center no-wrap">
        <span class="base-modal__label text-subtitle2 col-4"></span>
        <span class="base-modal__label text-subtitle2 col-7">Ответственные: </span>
      </label>

      <base-form-field title="за согласование даты:">
        <div class="col-2">
          <q-checkbox left-label size="30px"
                      v-model="dataValue.agrNewCheck"
                      class="text-subtitle2"
                      label="Новый"/>
        </div>
        <div class="col-5">
          <q-input outlined
                   v-if="dataValue.agrNewCheck"
                   dense
                   debounce="500"
                   v-model="dataValue.agrName"
                   :rules="[val => validation.validationPatterns.notEmpty(val)]"
                   placeholder="Укажите ответственного"
                   class="base-modal__input q-mb-sm"/>
          <base-form-select v-model="dataValue.agrId" :options="clientStaffList" class="q-mb-sm" v-else/>
          <q-input outlined
                   dense
                   debounce="500"
                   v-model="dataValue.agrPhone"
                   placeholder="Телефон"
                   class="base-modal__input"
                   :rules="[val => validation.validationPatterns.notEmpty(val)]"
          />
        </div>
      </base-form-field>

      <base-form-field title="за предоставление ТС:">
        <div class="col-2">
          <q-checkbox left-label size="30px"
                      v-model="dataValue.providNewCheck"
                      class="text-subtitle2"
                      label="Новый"/>
        </div>
        <div class="col-5">
          <q-input outlined
                   v-if="dataValue.providNewCheck"
                   dense
                   debounce="500"
                   v-model="dataValue.providName"
                   :rules="[val => validation.validationPatterns.notEmpty(val)]"
                   placeholder="Укажите ответственного"
                   class="base-modal__input q-mb-sm"/>
          <base-form-select v-model="dataValue.providId" :options="clientStaffList" class="q-mb-sm" v-else/>
          <q-input outlined
                   dense
                   debounce="500"
                   v-model="dataValue.providPhone"
                   placeholder="Телефон"
                   class="base-modal__input"
                   :rules="[val => validation.validationPatterns.notEmpty(val)]"
          />
        </div>
      </base-form-field>

      <base-form-field title="за принятие работ:">
        <div class="col-2">
          <q-checkbox left-label size="30px"
                      v-model="dataValue.acceptNewCheck"
                      class="text-subtitle2"
                      label="Новый"/>
        </div>
        <div class="col-5">
          <q-input outlined
                   dense
                   v-if="dataValue.acceptNewCheck"
                   debounce="500"
                   v-model="dataValue.acceptName"
                   :rules="[val => validation.validationPatterns.notEmpty(val)]"
                   placeholder="Укажите ответственного"
                   class="base-modal__input q-mb-sm"/>
          <base-form-select v-model="dataValue.acceptId" :options="clientStaffList" class="q-mb-sm" v-else/>
          <q-input outlined
                   dense
                   debounce="500"
                   v-model="dataValue.acceptPhone"
                   placeholder="Телефон"
                   class="base-modal__input"
                   :rules="[val => validation.validationPatterns.notEmpty(val)]"
          />
        </div>
      </base-form-field>
      <base-form-text-field title="Комментарий:" v-model="dataValue.comment" />
    </div>
  </q-card-section>
</template>

<script setup>
import {
  computed,
  onBeforeMount,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import { useUserStore } from 'src/app/store/user-store';
import { getData } from 'src/app/helpers/getData';
import postData from 'src/app/api/postData';
import validation from 'src/app/helpers/InputValidations';
import companyListForSelect from 'src/app/helpers/companyListForSelect';
import convertObjectsToArray from 'src/app/helpers/convertObjectsToArray';
import { BaseFormField } from 'src/shared/Form/BaseFormField';
import { BaseFormSelect } from 'src/shared/Form/BaseFormSelect';
import { BaseFormToggleBtn } from 'src/shared/Form/BaseFormToggleBtn';
import { BaseFormDatePicker } from 'src/shared/Form/BaseFormDatePicker';
import { BaseFormTextField } from 'src/shared/Form/BaseFormTextField';
import formOptions from '../module/formOptions';
import setClientAddressInfo from '../helpers/setClientAddressInfo';
import setClientStaffNumber from '../helpers/setClientStaffNumber';

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

const userStore = useUserStore();
const selectItems = ref(companyListForSelect(userStore.companyList));
const objectList = ref([]);
const clientObjectList = ref([]);
const clientAddress = ref([]); // Для выведения параметров адреса
const clientAddressList = ref([]); // Для селекта
const clientStaff = ref([]); // Для выведения параметров ответственного
const clientStaffList = ref([]); // Для селекта
const boxAddressList = ref([]);

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
    getData('/home/get_company_obj/', { compId: state })
      .then((data) => {
        objectList.value = convertObjectsToArray(data.obj_data, 'object_name', 'id');
        clientObjectList.value = convertObjectsToArray(data.client_obj_data, 'name', 'id');

        dataValue.value.object = objectList.value[0].value;
        dataValue.value.objNotWialon = clientObjectList.value[0].value;
      });
  },
  { deep: true },
);

// Слежение за изменением адреса заявки
watch(
  () => dataValue.value.place,
  () => setClientAddressInfo(dataValue.value.place, clientAddress.value, dataValue.value),
  { deep: true },
);

watch(
  () => dataValue.value.placeCheck,
  () => {
    if (dataValue.value.placeCheck) {
      dataValue.value.clientAddress = '';
      dataValue.value.placeBoxWram = false;
      dataValue.value.placeBoxElectric = false;
    } else setClientAddressInfo(dataValue.value.place, clientAddress.value, dataValue.value);
  },
  { deep: true },
);

// Слежение за изменением ответственного за согласование
watch(
  () => dataValue.value.agrId,
  (state) => setClientStaffNumber(state, clientStaff.value, dataValue.value, 'agrPhone'),
  { deep: true },
);

watch(
  () => dataValue.value.agrNewCheck,
  (state) => {
    if (dataValue.value.agrNewCheck) {
      dataValue.value.agrPhone = '';
      dataValue.value.agrId = '';
    } else setClientStaffNumber(state, clientStaff.value, dataValue.value, 'agrPhone');
  },
  { deep: true },
);

// Слежение за изменением ответственного за предоставление
watch(
  () => dataValue.value.providId,
  (state) => setClientStaffNumber(state, clientStaff.value, dataValue.value, 'providPhone'),
  { deep: true },
);

watch(
  () => dataValue.value.providNewCheck,
  (state) => {
    if (dataValue.value.providNewCheck) {
      dataValue.value.providPhone = '';
      dataValue.value.providId = '';
    } else setClientStaffNumber(state, clientStaff.value, dataValue.value, 'providPhone');
  },
  { deep: true },
);

// Слежение за изменением ответственного за принятие
watch(
  () => dataValue.value.acceptId,
  (state) => setClientStaffNumber(state, clientStaff.value, dataValue.value, 'acceptPhone'),
  { deep: true },
);

watch(
  () => dataValue.value.acceptNewCheck,
  (state) => {
    if (dataValue.value.acceptNewCheck) {
      dataValue.value.acceptPhone = '';
      dataValue.value.acceptId = '';
    } else setClientStaffNumber(state, clientStaff.value, dataValue.value, 'acceptPhone');
  },
  { deep: true },
);

// Слежение за отправкой формы
watch(
  () => props.submitForm,
  () => {
    postData('/home/create_req_to/', dataValue.value)
      .then((response) => { console.log(response); })
      .catch((error) => { if (error) throw error; })
      .finally(() => { emit('formSending'); });
  },
);

onBeforeMount(() => {
  getData('/home/get_client_data/')
    .then((data) => {
      clientAddress.value = data.address_list;
      clientStaff.value = data.staff_list;
      boxAddressList.value = convertObjectsToArray(data.box_address_list, 'address', 'id');
      dataValue.value.placeBox = boxAddressList.value[0].value;
    })
    .then(() => {
      clientAddressList.value = convertObjectsToArray(clientAddress.value, 'name', 'id');
      dataValue.value.place = clientAddressList.value[0].value;
      setClientAddressInfo(dataValue.value.place, clientAddress.value, dataValue.value);
    })
    .then(() => {
      clientStaffList.value = convertObjectsToArray(clientStaff.value, 'name', 'id');
    });

  dataValue.value.company = selectItems.value[0].value;
  dataValue.value.obj = 'objIsWialon';
  dataValue.value.type = formOptions.reqTypeOptions[0].value;
  dataValue.value.placeSwitch = 'boxM2M';

  dataValue.value.agrNewCheck = false;
  dataValue.value.providNewCheck = false;
  dataValue.value.acceptNewCheck = false;
  dataValue.value.objNewCheck = false;
  dataValue.value.placeCheck = false;
});

onUnmounted(() => {
  dataValue.value = {};
});

</script>

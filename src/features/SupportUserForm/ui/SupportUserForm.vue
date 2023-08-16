<template>
  <q-bar class="bg-white text-indigo">
    <q-tabs v-model="tab"
            dense class="text-light"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
    >
      <q-tab v-for="{name, label} in formOptions.mainTabsItems"
             :name="name"
             :label="label"
             :key="name"
      />
    </q-tabs>
  </q-bar>

  <q-card-section class="base-modal__body scroll" style="max-height: 50vh">
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="general">
        <user-general-settings v-model="dataValue" :allCompList="allCompList" :staffList="staffList"/>
      </q-tab-panel>

      <q-tab-panel name="modules">
        <user-modules-settings v-model="dataValue" />
      </q-tab-panel>

      <q-tab-panel name="accesses">
        <user-accesses-settings :comp-list="compList"
                                :all-comp-list="allCompList"
                                :acc-list="accList"
                                :all-acc-list="allAccList"
                                :report-list="reportList"
                                :all-report-list="allReportList"
                                v-model="dataValue"
        />
      </q-tab-panel>

      <q-tab-panel name="services">
        <user-services-settings v-model="dataValue"/>
      </q-tab-panel>

    </q-tab-panels>
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
import getData from 'src/app/api/getData';
import sendData from 'src/app/api/sendData';
import convertObjectsToArray from 'src/app/helpers/convertObjectsToArray';
import UserGeneralSettings from './UserGeneralSettings.vue';
import UserModulesSettings from './UserModulesSettings.vue';
import UserAccessesSettings from './UserAccessesSettings.vue';
import UserServicesSettings from './UserServicesSettings.vue';
import formOptions from '../module/formOptions';
import setFormDefaultValue from '../helpers/setFormDefaultValue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  submitForm: {
    type: Boolean,
    required: true,
  },
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

const formState = computed({
  get() {
    return props.submitForm;
  },
  set(value) {
    emit('update:submitForm', value);
  },
});

const userFormURL = '/lk_techsupp/user_form/';
const isUpdate = !!dataValue.value.id;
const tab = ref('general');
const staffList = ref([]);
const allCompList = ref([]);
const allAccList = ref([]);
const allReportList = ref([]);
const compList = ref([]);
const accList = ref([]);
const reportList = ref([]);
const templateList = ref([]);

watch(
  () => props.submitForm,
  () => {
    const method = isUpdate ? 'put' : 'post';

    sendData(userFormURL, dataValue.value, method)
      .then((response) => {
        emit('updateUserTable', JSON.parse(response.data.user_data), isUpdate);
      })
      .catch((error) => { if (error) throw error; })
      .finally(() => { emit('formSending'); });
  },
);

onBeforeMount(() => {
  const params = {};
  if (isUpdate) {
    params.id = dataValue.value.id;
  }
  setFormDefaultValue(dataValue);
  getData(userFormURL, params)
    .then((data) => {
      if (isUpdate) {
        dataValue.value = JSON.parse(data.user_data)[0];
        reportList.value = convertObjectsToArray(data.report_list, 'name', 'id');
        accList.value = convertObjectsToArray(data.acc_list, 'name', 'id');
        compList.value = convertObjectsToArray(data.comp_list, 'company_name', 'id');
      }
      staffList.value = convertObjectsToArray(JSON.parse(data.staff_list), 'full_name', 'id');
      allCompList.value = convertObjectsToArray(data.all_comp_list, 'company_name', 'id');
      templateList.value = convertObjectsToArray(data.template_list, 'name', 'id');
      allAccList.value = convertObjectsToArray(data.all_acc_list, 'name', 'id');
      allReportList.value = convertObjectsToArray(data.all_report_list, 'name', 'id');
    });
});

onUnmounted(() => {
  dataValue.value = {};
  formState.value = false;
});

</script>

<style lang="scss" scoped>
.q-card__section--vert {
  padding: 0;
}
</style>

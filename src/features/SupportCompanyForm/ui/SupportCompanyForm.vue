<template>
  <q-bar class="bg-white text-indigo">
    <q-tabs v-model="tab"
            dense class="text-light"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
    >
      <q-tab name="general" label="Основные"/>
      <q-tab name="modules" label="Модули"/>
      <q-tab name="fuelTrans" label="Транзакции"/>
      <q-tab name="wialon" label="Wialon"/>
    </q-tabs>
  </q-bar>

  <q-card-section class="base-modal__body scroll" style="max-height: 50vh">
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="general">
        <div class="q-gutter-sm">
          <base-form-field title="Название:">
            <base-form-text-input v-model="dataValue.company_name"
                                  placeholder="Название компании"
                                  :valid-rules="requiredRules"/>
          </base-form-field>

          <base-form-field title="Код в 1С:">
            <base-form-text-input v-model="dataValue.one_c_code" placeholder="Код компании в 1С"/>
          </base-form-field>

          <base-form-field title="E-mail:">
            <base-form-text-input v-model="dataValue.e_mail"
                                  placeholder="Е-mail для уведомлений"
                                  type="email"/>
          </base-form-field>

          <base-form-field title="Основной менеджер:">
            <base-form-select v-model="dataValue.m_manager" :options="staffList"/>
          </base-form-field>
          <base-form-field title="Сервисный менеджер:">
            <base-form-select v-model="dataValue.s_manager" :options="staffList"/>
          </base-form-field>
          <base-form-field title="Сотрудник тех.поддержки:">
            <base-form-select v-model="dataValue.techsup" :options="staffList"/>
          </base-form-field>
        </div>
      </q-tab-panel>

      <q-tab-panel name="modules">
        <div class="q-gutter-sm">
          <base-form-field title="Доступ к путевым:">
            <base-form-select v-model="dataValue.travel_acc" :options="formOptions.accessOptions"/>
          </base-form-field>
          <base-form-field title="Доступ к транзакциям:">
            <base-form-select v-model="dataValue.trans_acc" :options="formOptions.accessOptions"/>
          </base-form-field>
          <base-form-field title="Доступ к сливам:">
            <base-form-select v-model="dataValue.fd_acc" :options="formOptions.accessOptions"/>
          </base-form-field>
          <base-form-field title="Доступ к диагностике:">
            <base-form-select v-model="dataValue.diagn_acc" :options="formOptions.accessOptions"/>
          </base-form-field>
          <base-form-checkbox title="Доступ к ЛК клиента:" v-model="dataValue.lk_client_acc"/>
        </div>
      </q-tab-panel>

      <q-tab-panel name="fuelTrans">
        <div class="q-gutter-sm">
          <base-form-field title="Выбор партнера:">
            <base-form-select v-model="fuelTransVendor" :options="formOptions.fuelTransVendorList"/>
          </base-form-field>

          <div class="card-wrapper q-gutter-sm" v-show="fuelTransVendor === 'gazprom'">
            <base-form-field title="API ключ Газпром:">
              <base-form-text-input v-model="dataValue.company_token_g" placeholder="API ключ Газпром"/>
            </base-form-field>
            <base-form-field title="Пользователь Газпром:">
              <base-form-text-input v-model="dataValue.gazprom_login" placeholder="Пользователь Газпром"/>
            </base-form-field>
            <base-form-field title="Пароль Газпром:">
              <base-form-text-input v-model="dataValue.gazprom_password" placeholder="Пароль Газпром"/>
            </base-form-field>
            <base-form-field title="ID договора:">
              <base-form-text-input v-model="dataValue.gazprom_contract_number" placeholder="ID договора"/>
            </base-form-field>
            <base-form-field title="Период выгрузки Газпром:">
              <base-form-select v-model="dataValue.gazprom_period_down" :options="formOptions.downloadPeriod"/>
            </base-form-field>
          </div>

          <div class="card-wrapper q-gutter-sm" v-show="fuelTransVendor === 'rosneft'">
            <base-form-field title="ID договора Роснефть:">
              <base-form-text-input v-model="dataValue.rn_contract" placeholder="ID договора Роснефть"/>
            </base-form-field>
            <base-form-field title="Пользователь Роснефть:">
              <base-form-text-input v-model="dataValue.rn_user" placeholder="Пользователь Роснефть"/>
            </base-form-field>
            <base-form-field title="Пароль Роснефть:">
              <base-form-text-input v-model="dataValue.rn_passw" placeholder="Пароль Роснефть"/>
            </base-form-field>
          </div>

          <div class="card-wrapper q-gutter-sm" v-show="fuelTransVendor === 'knp'">
            <base-form-field title="API ключ КНП:">
              <base-form-text-input v-model="dataValue.knp_token" placeholder="API ключ КНП"/>
            </base-form-field>
            <base-form-field title="Срок действия ключа КНП:">
              <base-form-text-input v-model="dataValue.knp_token_date" placeholder="Срок действия ключа КНП"/>
            </base-form-field>
          </div>

          <div class="card-wrapper q-gutter-sm" v-show="fuelTransVendor === 'ppr'">
            <base-form-field title="API ключ ППР:">
              <base-form-text-input v-model="dataValue.ppr_token" placeholder="API ключ ППР"/>
            </base-form-field>
          </div>

          <div class="card-wrapper q-gutter-sm" v-show="fuelTransVendor === 'autocard'">
            <base-form-field title="Пользователь АВТОКАРД:">
              <base-form-text-input v-model="dataValue.auc_user" placeholder="Пользователь АВТОКАРД"/>
            </base-form-field>
            <base-form-field title="Пароль АВТОКАРД:">
              <base-form-text-input v-model="dataValue.auc_passw" placeholder="Пароль АВТОКАРД"/>
            </base-form-field>
          </div>

          <div class="card-wrapper q-gutter-sm" v-show="fuelTransVendor === 'mc'">
            <base-form-field title="API ключ MastersCard:">
              <base-form-text-input v-model="dataValue.mc_token" placeholder="API ключ MastersCard"/>
            </base-form-field>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="wialon">
        <div class="q-gutter-sm">
          <base-form-field title="Token Wialon:">
            <base-form-text-input v-model="dataValue.company_token" placeholder="Token Wialon"/>
          </base-form-field>

          <base-form-field title="Сессия:">
            <base-form-text-input v-model="dataValue.wialon_session" placeholder="Сессия"/>
          </base-form-field>

          <base-form-field title="Номер ресурса для отчета:">
            <base-form-text-input v-model="dataValue.resourse_template" placeholder="Номер ресурса для отчета"/>
          </base-form-field>

          <base-form-field title="Регион:">
            <base-form-select v-model="dataValue.location" :options="formOptions.regionOptions"/>
          </base-form-field>
          <base-form-checkbox title="Проверять сливы:" v-model="dataValue.check_fd"/>
          <base-form-checkbox title="Обновлять список объектов:" v-model="dataValue.update_objects"/>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-card-section>
</template>

<script setup>
import {
  computed,
  onUnmounted,
  ref,
  watch,
  onBeforeMount,
} from 'vue';
import getData from 'src/app/api/getData';
import convertObjectsToArray from 'src/app/helpers/convertObjectsToArray';
import sendData from 'src/app/api/sendData';
import { BaseFormField } from 'src/shared/Form/BaseFormField';
import { BaseFormTextInput } from 'src/shared/Form/BaseFormTextInput';
import { BaseFormSelect } from 'src/shared/Form/BaseFormSelect';
import { BaseFormCheckbox } from 'src/shared/Form/BaseFormCheckbox';
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

const companyFormURL = '/lk_techsupp/company_form/';
const isUpdate = !!dataValue.value.companyId;
const tab = ref('general');
const staffList = ref([]);
const fuelTransVendor = ref('gazprom');

const requiredRules = [(val) => !!val || 'Поле обязательно для заполнения'];

watch(
  () => props.submitForm,
  () => {
    const method = isUpdate ? 'put' : 'post';
    sendData(companyFormURL, dataValue.value, method)
      .then((response) => {
        emit('updateCompanyTable', JSON.parse(response.data.company_data), isUpdate);
      })
      .catch((error) => { if (error) throw error; })
      .finally(() => { emit('formSending'); });
  },
);

onBeforeMount(() => {
  const params = {};
  if (isUpdate) {
    params.compId = dataValue.value.companyId;
  }
  setFormDefaultValue(dataValue);
  getData(companyFormURL, params)
    .then((data) => {
      if (isUpdate) dataValue.value = JSON.parse(data.company_data)[0];
      staffList.value = convertObjectsToArray(JSON.parse(data.staff_list), 'full_name', 'id');
    });
});

onUnmounted(() => {
  dataValue.value = {};
  formState.value = false;
});

</script>

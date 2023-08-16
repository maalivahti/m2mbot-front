<template>
  <section class="section req-tp">
    <main-table :loading="loading" :columns="columns" :rows="rows" @row-click="openDetailModal">
      <!-- Тулбар таблицы (левая) -->
      <template #tableTopLeft>
        <icon-button icon="add" icon-color="green" @click="displayModalForm = true;" tooltip-text="Создать заявку на тех.поддержку"/>
      </template>

      <!-- Тулбар таблицы (правый) -->
      <template #tableTopRight>
        <table-setting-select :selectItems="selectItems"
                              :selectLabel="selectLabel"
                              @changeCompany="changeCompany"
        />
        <q-btn flat round color="grey-10" icon="refresh"
               :disable="onecCodeCompany"
               @click="updateReqTable('/home/update_req_tp/')"
        />
        <q-btn flat round color="grey-10"
               icon="mdi-filter-outline"
               @click="showFilter"
        />
      </template>
    </main-table>

    <!-- Блок фильтра таблицы -->
    <div class="q-pa-md q-gutter-sm">
      <table-filter v-model="displayFilter" @submit-filter="submitFilter">
        <template #filterInputs>
          <filter-date-picker dateLabel="Дата от" v-model:date="filterDateFrom"/>
          <filter-date-picker dateLabel="Дата до" v-model:date="filterDateTo"/>
          <filter-select :selectItems="companySelectItems"
                         :selectLabel="selectLabel"
                         v-model="company"
                         @change-filter-select="(value) => company = value"/>
          <filter-select :selectItems="statusSelectItems"
                         selectLabel="Статус"
                         v-model="reqStatus"
                         @change-filter-select="(value) => reqStatus = value"/>
        </template>
      </table-filter>
    </div>

    <!-- Форма создания заявки на ТО -->
    <base-modal-form modal-title="Новая заявка на тех.поддержку"
                     v-model="displayModalForm"
                     @submit-form="submitForm=true"
    >
      <req-tp-create-form v-model="createReqFormData"
                          v-model:submitForm="submitForm"
                          @form-sending="formSending"
                          @update-req-tp-table="updateReqTpTable"
      />
    </base-modal-form>

    <!-- Блок детализации заявки на ТП -->
    <div class="q-pa-md q-gutter-sm">
      <req-tp-detail v-model="displayDetailModal" v-model:reqData="reqDetailData"/>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { date } from 'quasar';
import getReqsList from 'pages/ReqsToPage/api/getReqsList';
import { useUserStore } from 'src/app/store/user-store';
import { MainTable } from 'src/entities/MainTable/index';
import { TableSettingSelect } from 'src/shared/TableSettingSelect';
import { TableFilter } from 'src/features/TableFilter';
import { FilterSelect } from 'src/shared/Form/FilterSelect';
import { FilterDatePicker } from 'src/shared/Form/FilterDatePicker';
import { ReqTpCreateForm } from 'src/features/ReqTpCreateForm';
import { ReqTpDetail } from 'src/widgets/reqTp/ReqTpDetail';
import { BaseModalForm } from 'src/widgets/BaseModalForm';
import { IconButton } from 'src/shared/buttons/IconButton';
import getDateMonthEarlier from 'src/app/helpers/getDateMonthEarlier';
import companyListForSelect from 'src/app/helpers/companyListForSelect';
import tableSetting from '../module/reqTpTableSettings';
import filterSettings from '../module/reqTpFilterSettings';

const userStore = useUserStore();
const loading = ref(true);
const displayDetailModal = ref(false);
const displayModalForm = ref(false);
const displayFilter = ref(false);

const columns = ref(tableSetting.reqsTableHead);
const rows = ref([]);

const company = ref('all');
const filterDateFrom = ref(date.formatDate(getDateMonthEarlier(), 'YYYY/MM/DD'));
const filterDateTo = ref(date.formatDate(new Date(), 'YYYY/MM/DD'));
const reqStatus = ref('all');
const onecCodeCompany = ref(true);

const selectLabel = ref('Компания');
const selectItems = ref(companyListForSelect(userStore.companyList, true));
const companySelectItems = ref(companyListForSelect(userStore.companyList, true));
const statusSelectItems = ref(filterSettings.reqStatus);

const reqDetailData = ref({});
const createReqFormData = ref({});
const submitForm = ref(false);

getReqsList('/home/get_req_tp/', {
  companyId: company.value,
  dateFrom: filterDateFrom.value,
  dateTo: filterDateTo.value,
  status: reqStatus.value,
})
  .then((data) => {
    rows.value = data;
  })
  .catch((error) => { if (error) throw error; })
  .finally(() => { loading.value = false; });

function showFilter() {
  displayFilter.value = !displayFilter.value;
  company.value = 'all';
}

function updateReqTable(url) {
  displayDetailModal.value = false;
  loading.value = true;

  getReqsList(url, {
    companyId: company.value,
    dateFrom: filterDateFrom.value,
    dateTo: filterDateTo.value,
    status: reqStatus.value,
  })
    .then((data) => {
      rows.value = data;
    })
    .catch((error) => {
      if (error) throw error;
    })
    .finally(() => {
      loading.value = false;
    });
}

function changeCompany(companyID) {
  loading.value = true;
  company.value = companyID;

  const useCompanyStore = userStore.companyList.find((comp) => comp.id === companyID);

  if (useCompanyStore && useCompanyStore.one_c_code) onecCodeCompany.value = false;
  else onecCodeCompany.value = true;

  updateReqTable('/home/get_req_tp/');
}

function submitFilter() {
  updateReqTable('/home/get_req_tp/');
  company.value = 'all';
  reqStatus.value = 'all';
}

function openDetailModal(evt, row) {
  getReqsList('/home/detail_req_tp/', { reqId: row.id })
    .then((data) => {
      reqDetailData.value = data[0];
      displayDetailModal.value = true;
    });
}

const formSending = () => {
  submitForm.value = false;
  displayModalForm.value = false;
};

function updateReqTpTable(updateData) {
  rows.value.unshift(updateData[0]);
}

</script>

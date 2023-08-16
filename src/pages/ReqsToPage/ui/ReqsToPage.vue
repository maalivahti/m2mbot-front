<template>
  <section class="section req-to">
    <main-table :loading="loading" :columns="columns" :rows="rows" @row-click="openDetailModal">

      <!-- Тулбар таблицы (левая) -->
      <template #tableTopLeft>
        <icon-button icon="add" icon-color="green" @click="displayModalForm = true;" tooltip-text="Создать заявку на ТО"/>

        <q-option-group v-model="activeTable"
                        :options="tableSettings.options"
                        @update:model-value="() => updateReqTable('/home/get_req_to/')"
                        color="indigo"
                        inline
                        dense
        />
      </template>

      <!-- Тулбар таблицы (правый) -->
      <template #tableTopRight>
        <table-setting-select :selectItems="selectItems"
                              :selectLabel="selectLabel"
                              @changeCompany="changeCompany"
        />
        <q-btn flat round color="grey-10" icon="refresh"
               :disable="onecCodeCompany"
               @click="updateReqTable('/home/update_req_to/')"
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
    <base-modal-form modal-title="Новая заявка на тех.обслуживание"
                     v-model="displayModalForm"
                     @submit-form="submitForm=true"
                     class="valid-form"
    >
      <req-to-create-form v-model="createReqFormData"
                          v-model:submitForm="submitForm"
                          @form-sending="formSending"
      />
    </base-modal-form>

    <!-- Блок детализации заявки на ТО -->
    <div class="q-pa-md q-gutter-sm">
      <req-to-detail v-model="displayDetailModal" v-model:reqData="reqDetailData" v-if="activeTable === 'reqs'"/>
      <req-to-order-detail v-model="displayDetailModal" v-model:reqData="reqDetailData" v-else/>
    </div>
  </section>
</template>

<script setup>
import { date } from 'quasar';
import { ref } from 'vue';
import getDateMonthEarlier from 'src/app/helpers/getDateMonthEarlier';
import { TableSettingSelect } from 'src/shared/TableSettingSelect';
import { MainTable } from 'src/entities/MainTable/index';
import { TableFilter } from 'src/features/TableFilter';
import { FilterSelect } from 'src/shared/Form/FilterSelect';
import { FilterDatePicker } from 'src/shared/Form/FilterDatePicker';
import { useUserStore } from 'src/app/store/user-store';
import companyListForSelect from 'src/app/helpers/companyListForSelect';
import { BaseModalForm } from 'src/widgets/BaseModalForm';
import { ReqToDetail } from 'src/widgets/reqTo/ReqToDetail';
import { ReqToOrderDetail } from 'src/widgets/reqTo/ReqToOrderDetail';
import { ReqToCreateForm } from 'src/features/ReqToCreateForm';
import { IconButton } from 'src/shared/buttons/IconButton';
import { getData } from 'src/app/helpers/getData';
import convertObjectsToArray from '../helpers/convertObjectsToArray';
import getReqsList from '../api/getReqsList';
import tableSettings from '../module/reqToTableSettings';
import filterSettings from '../module/reqToFilterSettings';

const userStore = useUserStore();
const loading = ref(true);
const displayFilter = ref(false);

const selectLabel = ref('Компания');
const selectItems = ref(companyListForSelect(userStore.companyList, true));

const rows = ref([]);
const columns = ref(tableSettings.reqsTableHead);

const companySelectItems = ref(companyListForSelect(userStore.companyList, true));
const statusSelectItems = ref(filterSettings.reqStatus);
const onecCodeCompany = ref(true);

const activeTable = ref('reqs');
const company = ref('all');
const filterDateFrom = ref(date.formatDate(getDateMonthEarlier(), 'YYYY/MM/DD'));
const filterDateTo = ref(date.formatDate(new Date(), 'YYYY/MM/DD'));
const reqStatus = ref('all');

const displayModalForm = ref(false);
const displayDetailModal = ref(false);
const submitForm = ref(false);

const createReqFormData = ref({});
const reqDetailData = ref({});

getReqsList('/home/get_req_to/', {
  tableType: activeTable.value,
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

function updateReqTable(url) {
  displayDetailModal.value = false;
  loading.value = true;

  getReqsList(url, {
    tableType: activeTable.value,
    companyId: company.value,
    dateFrom: filterDateFrom.value,
    dateTo: filterDateTo.value,
    status: reqStatus.value,
  })
    .then((data) => {
      if (activeTable.value === 'reqs') {
        columns.value = tableSettings.reqsTableHead;
        statusSelectItems.value = filterSettings.reqStatus;
      } else {
        columns.value = tableSettings.orderTableHead;
        statusSelectItems.value = filterSettings.orderStatus;
      }

      rows.value = data;
    })
    .catch((error) => { if (error) throw error; })
    .finally(() => { loading.value = false; });
}

function changeCompany(companyID) {
  loading.value = true;
  company.value = companyID;

  const useCompanyStore = userStore.companyList.find((comp) => comp.id === companyID);

  if (useCompanyStore && useCompanyStore.one_c_code) onecCodeCompany.value = false;
  else onecCodeCompany.value = true;

  updateReqTable('/home/get_req_to/');
}

function showFilter() {
  displayFilter.value = !displayFilter.value;
  company.value = 'all';
}

function submitFilter() {
  updateReqTable('/home/get_req_to/');
  company.value = 'all';
  reqStatus.value = 'all';
}

function openDetailModal(evt, row) {
  if (activeTable.value === 'reqs') {
    getData('/home/detail_req_to/', { reqId: row.id })
      .then((data) => {
        reqDetailData.value = data.req_data;
        reqDetailData.value.objects = convertObjectsToArray(data.req_data.objects);
      })
      .then(() => {
        displayDetailModal.value = true;
      });
  } else {
    getData('/home/detail_req_order/', { orderId: row.id })
      .then((data) => {
        reqDetailData.value = JSON.parse(data.req_data)[0];
        reqDetailData.value.actList = data.act_list;
        displayDetailModal.value = true;
      });
  }
}

const formSending = () => {
  submitForm.value = false;
  displayModalForm.value = false;
};

</script>

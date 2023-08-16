<template>
  <section class="section ts-dispatch">
    <q-scroll-area style="height: 25vh; width: 100%;" class="q-mb-lg">
      <main-table :rows="dispatchListTblRows"
                  :columns="tableSettings.dispatchListTableHead"
                  :loading="loading"
                  :table-search="dispatchListSearch"
                  @row-click="showDispatchDetail"
      >
        <!-- Тулбар таблицы (левая) -->
        <template #tableTopLeft>
          <icon-button icon="add" icon-color="green" @click="displayModalForm = true;" tooltip-text="Создать отчет по диспетчеризации"/>
        </template>

        <!-- Тулбар таблицы (правый) -->
        <template #tableTopRight>
          <table-search-input v-model="dispatchListSearch"/>
        </template>
      </main-table>
    </q-scroll-area>
    <q-bar class="bg-white text-indigo" v-if="Object.keys(detailDispatchData).length">
      <q-tabs v-model="tab"
              dense class="text-light"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
              @update:model-value="switchDetailTable"
      >
        <q-tab v-for="tab in tabList.tabList"
               :key="tab.name"
               :name="tab.name"
               :label="tab.label"
               no-caps
        >
          <q-badge rounded color="primary" floating>{{ detailDispatchData[tab.badge].length }}</q-badge>
        </q-tab>
        <q-tab name="summary" label="Сводка" no-caps></q-tab>
      </q-tabs>
    </q-bar>
    <q-scroll-area style="height: 55vh; width: 100%;"
                   v-if="Object.keys(detailDispatchData).length"
    >
      <main-table flat bordered :rows="detailTblRows" :columns="detailTblHead" v-if="!displaySummary" :loading="loading"></main-table>

      <div class="ts-dispatch__summary ts-summary q-pa-sm" v-else>
        <support-dispatch-summary :summaryData="dispatchSummaryData" :title="dispatchSummaryTitle"/>
      </div>
    </q-scroll-area>

    <base-modal-form modal-title="Создание отчета по диспетчеризации"
                     v-model="displayModalForm"
                     @submit-form="submitForm=true"
    >
      <support-create-dispatch-form v-model="createDispSetting"/>
    </base-modal-form>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import getDataParse from 'src/app/api/getDataParse';
import getData from 'src/app/api/getData';
import { TableSearchInput } from 'src/shared/TableSearchInput';
import { MainTable } from 'src/entities/MainTable/index';
import { SupportCreateDispatchForm } from 'src/features/SupportCreateDispatchForm';
import { SupportDispatchSummary } from 'src/widgets/supportDispatch/SupportDispatchSummary';
import { BaseModalForm } from 'src/widgets/BaseModalForm';
import { IconButton } from 'src/shared/buttons/IconButton';
import tableSettings from '../module/tableSettings';
import tabList from '../module/tabList';

const loading = ref(true);
const dispatchListSearch = ref('');
const dispatchListTblRows = ref([]);
const detailTblHead = ref(tableSettings.workTableHead);
const detailTblRows = ref([]);

const displayModalForm = ref(false);
const displaySummary = ref(true);
const submitForm = ref(false);
const tab = ref('summary');
const detailDispatchData = ref({});
const dispatchSummaryData = ref({});
const dispatchSummaryTitle = ref('');

const createDispSetting = ref({});

onBeforeMount(() => {
  getDataParse('/lk_techsupp/get_dispatch_list/')
    .then((data) => {
      dispatchListTblRows.value = data;
    })
    .catch((error) => {
      if (error) throw error;
    })
    .finally(() => {
      loading.value = false;
    });
});

function showDispatchDetail(evt, row) {
  getData('/lk_techsupp/get_detail_dispatch/', { dispId: row.id })
    .then((data) => {
      dispatchSummaryData.value = JSON.parse(data.req_data.summary_data);
      dispatchSummaryTitle.value = JSON.parse(data.req_data.name_disp);
      Object.keys(data.req_data).forEach((props) => {
        detailDispatchData.value[props] = JSON.parse(data.req_data[props]);
      });
    })
    .then(() => {
      detailTblRows.value = detailDispatchData.value.work_data;
    });
}

function switchDetailTable() {
  displaySummary.value = false;
  switch (tab.value) {
    case 'work':
      detailTblHead.value = tableSettings.workTableHead;
      detailTblRows.value = detailDispatchData.value.work_data;
      break;
    case 'fdown':
      detailTblHead.value = tableSettings.fdownTableHead;
      detailTblRows.value = detailDispatchData.value.fdown_data;
      break;
    case 'refuel':
      detailTblHead.value = tableSettings.refuelTableHead;
      detailTblRows.value = detailDispatchData.value.refuel_data;
      break;
    case 'speed':
      detailTblHead.value = tableSettings.speedTableHead;
      detailTblRows.value = detailDispatchData.value.speed_data;
      break;
    case 'consum':
      detailTblHead.value = tableSettings.consumTableHead;
      detailTblRows.value = detailDispatchData.value.consum_data;
      break;
    case 'feedback':
      detailTblHead.value = tableSettings.feedbackTableHead;
      detailTblRows.value = detailDispatchData.value.feedback_data;
      break;
    case 'summary':
      displaySummary.value = true;
      break;
    default:
      detailTblHead.value = tableSettings.workTableHead;
      detailTblRows.value = detailDispatchData.value.work_data;
  }
}

</script>

<style scoped lang="scss">
.main-table {
  th {
    color: var(--color-light);
    border: 1px solid var(--color-separation);
    background-color: var(--color-indigo);
  }
}
.ts-summary {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-gap: 20px;
  background-color: var(--color-light);
  height: 55vh;
  min-height: 100%;
}
</style>

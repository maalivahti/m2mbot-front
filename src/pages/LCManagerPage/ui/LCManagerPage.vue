<template>
  <section class="section manager">
    <q-scroll-area style="height: 45vh; width: 100%;" class="q-mb-lg">
      <q-table class="main-table"
               flat bordered
               dense
               :rows="mainTblRows"
               :columns="mainTblCols"
               :loading="loading"
               :pagination="initialPagination"
               color="primary"
               row-key="name"
               separator="vertical"
               @row-click="openCompanySettingsModal"
      >
        <template v-slot:header="props">
          <q-tr>
            <q-th colspan="1" rowspan="2" key="company" :props="props" style="width: 14%;">Название компании</q-th>
            <q-th colspan="2" style="width: 18%;">Менеджеры</q-th>
            <q-th colspan="2" style="width: 8%;">Заявки</q-th>
            <q-th colspan="1" rowspan="2" key="contractBalance" :props="props" style="width: 7%;">Баланс АП</q-th>
            <q-th colspan="2" style="width: 9%;">Путевые листы</q-th>
            <q-th colspan="2" style="width: 9%;">Транзакции</q-th>
            <q-th colspan="2" style="width: 9%;">Сливы</q-th>
            <q-th colspan="1" rowspan="2" key="statusSmt" :props="props" style="width: 4%;">Статус</q-th>
            <q-th colspan="1" rowspan="2" key="commonBalance" :props="props" style="width: 7%;">Баланс (общий)</q-th>
            <q-th colspan="1" rowspan="2" style="width: 6%;">История</q-th>
          </q-tr>
          <q-tr :props="props">
            <q-th key="mainManager" :props="props">основной</q-th>
            <q-th key="servManager" :props="props">сервисный</q-th>
            <q-th key="reqToCount" :props="props">на ТО</q-th>
            <q-th key="reqTpCount" :props="props">на ТП</q-th>
            <q-th key="travelCount" :props="props">всего</q-th>
            <q-th key="badTravelCount" :props="props">проблем.</q-th>
            <q-th key="fuelTransCount" :props="props">всего</q-th>
            <q-th key="badFuelTransCount" :props="props">погр.</q-th>
            <q-th key="fdownCount" :props="props">всего</q-th>
            <q-th key="badFdownCount" :props="props">подтв.</q-th>
          </q-tr>
        </template>

        <!--  Слоты для тела таблицы   -->
        <template v-slot:body-cell-travelCount="rows">
          <q-td class="hover-bold" @click.stop="showDetailTable('travels', 'all', rows.row.id)">
            <span>{{ rows.row.travel_count }}</span>
            <q-tooltip>{{ checkModuleStatus(rows.row.travel_acc).statusDescr }}</q-tooltip>
            <q-icon :name="checkModuleStatus(rows.row.travel_acc).iconUrl" size="20px" class="float-right"/>
          </q-td>
        </template>
        <template v-slot:body-cell-badTravelCount="rows">
          <q-td class="hover-bold text-center" @click.stop="showDetailTable('travels', 'bad', rows.row.id)">
            {{ rows.row.travel_fault_count }}
          </q-td>
        </template>
        <template v-slot:body-cell-fuelTransCount="rows">
          <q-td class="hover-bold" @click.stop="showDetailTable('fuelTrans', 'all', rows.row.id)">
            {{ rows.row.trans_count }}
            <q-tooltip>{{ checkModuleStatus(rows.row.travel_acc).statusDescr }}</q-tooltip>
            <q-icon :name="checkModuleStatus(rows.row.trans_acc).iconUrl" size="20px" class="float-right"/>
          </q-td>
        </template>
        <template v-slot:body-cell-badFuelTransCount="rows">
          <q-td class="hover-bold text-center" @click.stop="showDetailTable('fuelTrans', 'bad', rows.row.id)">
            {{ rows.row.trans_fault_count }}
          </q-td>
        </template>
        <template v-slot:body-cell-fdownCount="rows">
          <q-td class="hover-bold" @click.stop="showDetailTable('fuelDown', 'all', rows.row.id)">
            {{ rows.row.fd_count }}
            <q-tooltip>{{ checkModuleStatus(rows.row.travel_acc).statusDescr }}</q-tooltip>
            <q-icon :name="checkModuleStatus(rows.row.fd_acc).iconUrl" size="20px" class="float-right"/>
          </q-td>
        </template>
        <template v-slot:body-cell-badFdownCount="rows">
          <q-td class="hover-bold text-center" @click.stop="showDetailTable('fuelDown', 'bad', rows.row.id)">
            {{ rows.row.fd_fault_count }}
          </q-td>
        </template>
        <template v-slot:body-cell-statusSmt="rows">
          <q-td class="text-center" v-if="rows.row.status_smt">
            <q-tooltip>Активна</q-tooltip>
            <q-icon name="img:icons/check_in_circle_icon.svg" size="20px"/>
          </q-td>
          <q-td class="text-center" v-else>
            <q-tooltip>Заблокирована</q-tooltip>
            <q-icon :name="'img:icons/red_circle_icon.svg'" size="20px"/>
          </q-td>
        </template>
        <template v-slot:body-cell-story="rows">
          <q-td class="text-center">
            <table-cell-btn @click.stop="openObjHistory(rows.row)"
                            tooltip="История по компании"
                            icon="history"
                            icon-color="grey-10"
            />
          </q-td>
        </template>
      </q-table>
    </q-scroll-area>

    <q-scroll-area style="height: 40vh; width: 100%;">
      <main-table :loading="loading"
                  :rows="detailTableRows"
                  :columns="detailTableCols"
                  v-if="displayDetailTable"
                  dense>

      </main-table>
    </q-scroll-area>
  </section>

  <base-modal-form :modal-title="modalTitle"
                   v-model="displaySettingsModal"
                   @update-data="updateCompanySett"
                   @submit-form="submitForm=true"
  >
    <company-settings-form v-model="companyFormData"
                           v-model:submitForm="submitForm"
                           @form-sending="formSending"
                           @update-manager-table="updateManagerTable"
    />
  </base-modal-form>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import getData from 'src/app/api/getData';
import getDataParse from 'src/app/api/getDataParse';
import checkModuleStatus from 'src/app/helpers/checkModuleStatus';
import { MainTable } from 'src/entities/MainTable';
import { BaseModalForm } from 'src/widgets/BaseModalForm';
import { CompanySettingsForm } from 'src/features/CompanySettingsForm';
import { TableCellBtn } from 'src/shared/TableCellBtn';
import travelTableSetting from 'src/pages/TravelsPage/module/tableSettings';
import fuelTransTableSetting from 'src/pages/TransactionsPage/module/tableSettings';
import fuelDownTableSetting from 'src/pages/FuelDownsPage/module/tableSettings';
import tableSetting from '../module/tableSettings';

const loading = ref(true);
const mainTblCols = ref(tableSetting.managerMainTableHead);
const mainTblRows = ref([]);
const initialPagination = { rowsPerPage: 20 };

const displaySettingsModal = ref(false);
const showHistoryModal = ref(false);
const modalTitle = ref('');
const companyFormData = ref({});

const detailTableCols = ref([]);
const detailTableRows = ref([]);
const displayDetailTable = ref(false);
const submitForm = ref(false);

onBeforeMount(() => {
  getData('/lk_manager/get_manager_table/')
    .then((data) => {
      mainTblRows.value = data.req_data;
      loading.value = false;
    });
});

const openCompanySettingsModal = (evt, row) => {
  companyFormData.value.compId = row.id;
  displaySettingsModal.value = true;
  modalTitle.value = `Настройки компании ${row.company_name}`;
};

const openObjHistory = (value) => {
  modalTitle.value = `История по объекту ${value.company_name}`;
  showHistoryModal.value = true;
};

const updateCompanySett = (updateData) => {
  const companyIndex = mainTblRows.value.findIndex((comp) => (comp.id === updateData.update_comp[0].id));
  mainTblRows.value[companyIndex] = updateData.update_comp[0];
};

const showDetailTable = (table, type, compId) => {
  getDataParse('/lk_manager/get_detail_table/', { compId, table, type })
    .then((data) => {
      if (table === 'travels') {
        detailTableCols.value = travelTableSetting.travelsTableHead;
      }
      if (table === 'fuelTrans') {
        detailTableCols.value = fuelTransTableSetting.fuelTransTableHead;
      }
      if (table === 'fuelDown') {
        detailTableCols.value = fuelDownTableSetting.fuelDownTableHead;
      }
      detailTableRows.value = data;
    })
    .then(() => {
      displayDetailTable.value = true;
    });
};

const formSending = () => {
  submitForm.value = false;
  displaySettingsModal.value = false;
};

function updateManagerTable(updateData) {
  mainTblRows.value = mainTblRows.value.map((comp) => {
    if (comp.id === updateData[0].id) return updateData[0];
    return comp;
  });
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
</style>

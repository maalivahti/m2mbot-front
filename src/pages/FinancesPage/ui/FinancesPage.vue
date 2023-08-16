<template>
  <section class="section finances">

    <!--  Главная таблица финансов  -->
    <main-table :loading="loading" :columns="listColumns" :rows="listRows" class="finances__table">
      <!-- Тулбар таблицы (левая) -->
      <template #tableTopLeft>
        <div class="row">
          <p class="text-subtitle2 text-grey-9 q-mr-xs">Бухгалтерия:</p>
          <a href="tel:73912053080" class="q-mr-sm">
            <q-icon name="mdi-cellphone" size="24px" color="blue-7"/>
            <span class="text-blue-grey-7">+7(391) 205-30-80</span>
          </a>
          <a href="mailto:m2m-s@mail.ru" class="q-mr-sm">
            <q-icon name="mdi-email-outline" size="24px" color="blue-7"/>
            <span class="text-blue-grey-7">m2m-s@mail.ru</span>
          </a>
        </div>
      </template>

      <!-- Тулбар таблицы (правый) -->
      <template #tableTopRight>
        <table-setting-select :selectItems="selectItems"
                              selectLabel="Компания"
                              @changeCompany="changeCompany"
        />

        <q-btn flat round color="grey-10" icon="refresh"
               :disable="onecCodeCompany"
               @click="updateTransactions"
        >
          <q-tooltip class="text-body2">Обновить данные</q-tooltip>
        </q-btn>

        <q-btn flat round color="grey-10"
               :disable="onecCodeCompany"
               icon="mdi-text-box-multiple-outline"
               @click.stop="openActListModal"
        >
          <q-tooltip class="text-body2">Получить акты-сверки</q-tooltip>
        </q-btn>
      </template>
    </main-table>

    <!--  Карточки договоров  -->
    <div class="finances__tabs q-gutter-sm column no-wrap justify-start content-start">
      <q-scroll-area style="height: 100%">
        <card-tab v-for="tab in contractData"
                  class="finances__tab"
                  :class="{
                    'finances__tab--active': activeContract === tab.number,
                    'finances__tab--negative': tab.summary < 0,
                  }"
                  :label="`Договор №${tab.number} от ${tab.date}`"
                  :text="`${tab.summary} ₽`"
                  :descr="tab.type_contract"
                  style="margin-bottom: 5px;"
                  @click="changeContract(tab.number, tab.id)"
                  :key="tab.id"/>
      </q-scroll-area>
    </div>

    <!--  Таблица с историей операций  -->
    <div class="finances__list q-gutter-sm column no-wrap justify-start content-start q-pb-sm" v-if="listRows.length">
      <main-table class="finances__table"
                  :loading="loading"
                  :columns="historyColumns"
                  dense
                  hide-header
                  hide-bottom
                  :rows="historyRows"
                  pagination="0"
      >

        <template v-slot:cellContentWithIcon="props">
          <q-td class="table__col-wrap" style="width: 65%">
            <q-icon v-if="['inv', 'inc_corr', 'corr', 'inv_r'].includes(props.slotProps.row.trans)"
                    class="q-mr-xs"
                    color="red-10"
                    name="mdi-chevron-double-right"
                    size="24px"
            />

            <q-icon v-else
                    class="q-mr-xs"
                    color="green"
                    name="mdi-chevron-double-left"
                    size="24px"
            /> {{ props.slotProps.row.reason ? props.slotProps.row.reason : 'Не указано' }}
          </q-td>
        </template>

        <template v-slot:cellButton="props">
          <q-td class="text-center" style="width: 5%">
            <a v-if="props.slotProps.row.trans === 'inv_r'"
               :href="`/home/doc/${props.slotProps.row.id}/get_sell_doc_r/`"
               target="_blank"
            >
              <q-btn flat
                     round
                     color="primary"
                     icon="mdi-file-download-outline"
              />
              <q-tooltip class="text-body2">Скачать счет</q-tooltip>
            </a>
            <a v-else-if="props.slotProps.row.trans === 'inv'"
               :href="`/home/doc/${props.slotProps.row.id}/get_sell_doc/`"
               target="_blank">
              <q-btn flat
                     round
                     color="indigo"
                     icon="mdi-file-download-outline"
              />
              <q-tooltip class="text-body2">Скачать счет</q-tooltip>
            </a>
          </q-td>
        </template>

        <!-- Тулбар таблицы (левая) -->
        <template #tableTopLeft>
          <p class="text-h6 text-blue-grey-7">История операций</p>
        </template>

        <!-- Тулбар таблицы (правый) -->
        <template #tableTopRight>
          <table-setting-select :selectItems="tableSetting.operationList"
                                selectLabel="Операция"
                                @changeCompany="changeOperation"
          />
          <a :href="contractDownloadLink" target="_blank">
            <q-btn flat round color="green"
                   icon="mdi-tray-arrow-down"
            />
            <q-tooltip class="text-body2">Скачать историю операций</q-tooltip>
          </a>

        </template>
      </main-table>
    </div>
  </section>

  <base-modal modal-title="Акты сверки" v-model="showModal" modal-width="40vw">
    <table-for-modal :columns="tableSetting.actListTableHead" :rows="actRows" style="max-width: 100%">
      <template v-slot:cellButton="props">
        <q-td class="text-center" style="width: 5%">
          <a :href="`/home/doc/${props.slotProps.row.id}/get_reconact/`"
             target="_blank"
          >
            <q-btn flat
                   round
                   color="red-10"
                   icon="mdi-file-download-outline"
            />
            <q-tooltip class="text-body2">Скачать акт-сверки</q-tooltip>
          </a>
        </q-td>
      </template>
    </table-for-modal>
  </base-modal>
</template>

<script setup>
import { ref } from 'vue';
import getData from 'src/app/api/getData';
import companyListForSelect from 'src/app/helpers/companyListForSelect';
import { useUserStore } from 'src/app/store/user-store';
import { MainTable } from 'src/entities/MainTable';
import { TableSettingSelect } from 'src/shared/TableSettingSelect';
import { CardTab } from 'src/entities/CardTab';
import { BaseModal } from 'src/widgets/BaseModal';
import { TableForModal } from 'src/entities/TableForModal';

import filterFinancesHistory from '../helpers/filterFinancesHistory';
import tableSetting from '../module/tableSettings';

// eslint-disable-next-line import/namespace
import { convertContractData } from '../helpers/convertContractData';

const userStore = useUserStore();
const loading = ref(true);
const listColumns = ref(tableSetting.financeTableHead);
const listRows = ref([]);
const contractData = ref([]);
const historyColumns = ref(tableSetting.financesStoryTableHead);
const historyRows = ref([]);
const activeContract = ref('');
const contractDownloadLink = ref('');
const activeOperation = ref(tableSetting.operationList[0].value);

const onecCodeCompany = ref(true);
const updateTrans = ref(false);
const selectItems = ref(companyListForSelect(userStore.companyList));
const company = ref(selectItems.value[0].value);

const showModal = ref(false);
const actRows = ref([]);

function getFinanceData() {
  getData('/home/get_finance_transaction/', {
    companyId: company.value,
    updateTrans: updateTrans.value,
  })
    .then((data) => {
      const contracts = JSON.parse(data.contract_data);
      const contractSumm = JSON.parse(data.calc_data);
      listRows.value = JSON.parse(data.req_data);
      actRows.value = JSON.parse(data.act_data);
      contractData.value = convertContractData(contracts, contractSumm);
      updateTrans.value = false;
    })
    .then(() => {
      activeContract.value = contractData.value[0].number;
      contractDownloadLink.value = `/home/finance/get_history/${contractData.value[0].id}`;
      historyRows.value = filterFinancesHistory(listRows.value, activeContract.value, activeOperation.value);
    })
    .catch((error) => { if (error) throw error; })
    .finally(() => { loading.value = false; });
}

getFinanceData('');

function changeCompany(companyID) {
  loading.value = true;
  company.value = companyID;

  const useCompanyStore = userStore.companyList.find((comp) => comp.id === companyID);

  if (useCompanyStore && useCompanyStore.one_c_code) onecCodeCompany.value = false;
  else onecCodeCompany.value = true;

  getFinanceData('/home/get_finance_transaction/');
}

function updateTransactions() {
  updateTrans.value = true;
  getFinanceData('/home/get_finance_transaction/');
}

function changeOperation(operation) {
  activeOperation.value = operation;
  historyRows.value = filterFinancesHistory(listRows.value, activeContract.value, activeOperation.value);
}

function changeContract(number, id) {
  activeContract.value = number;
  contractDownloadLink.value = `/home/finance/get_history/${id}`;
  historyRows.value = filterFinancesHistory(listRows.value, activeContract.value, activeOperation.value);
}

function openActListModal() {
  showModal.value = true;
}

</script>

<style lang="scss">
.finances {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
}

.finances__table {
  grid-area: 1 / 1 / 2 / 6;
  max-height: 42vh;
}

.finances__tabs {
  grid-area: 2 / 1 / 3 / 2;
  max-height: 49vh;
}

.finances__tab {

  .card-tab__label {
    color: var(--color-indigo);
  }

  .card-tab__descr {
    color: var(--color-malibu);
  }

  .card-tab__text {
    color: var(--color-fruit);
  }
}

.finances__tab--negative {
  .card-tab__text {
    color: var(--color-thunderbird);
  }
}

.finances__tab--active {
  background-color: var(--color-indigo) !important;

  .card-tab__label {
    color: var(--color-light);
  }
}

.finances__list {
  grid-area: 2 / 2 / 3 / 6;
}
</style>

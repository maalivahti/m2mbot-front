<template>
  <section class="section ts-company">
    <main-table :loading="loading"
                :columns="companyTableColumns"
                :rows="companyTableRows"
                :table-search="tableSearch"
                :slots="tableSettings.slotsList"
                @row-click="openUpdateCompanyForm">

      <!-- Тулбар таблицы (левая) -->
      <template #tableTopLeft>
        <icon-button icon="add" icon-color="green" @click="displayModalForm = true;" tooltip-text="Создать компанию"/>
      </template>

      <!-- Тулбар таблицы (правый) -->
      <template #tableTopRight>
        <table-search-input v-model="tableSearch"/>
      </template>

      <!--  Слоты для шапки таблицы   -->
      <template v-for="slot in tHeadSlots"
                :key="slot.cellName"
                v-slot:[`header-cell-${slot.cellName}`]>
        <q-th class="text-center">
          <q-tooltip>{{ slot.tooltipText }}</q-tooltip>
          <q-icon :name=slot.iconPath size="24px" :color="slot.color"/>
        </q-th>
      </template>

      <!--  Слоты для тела таблицы   -->
      <template v-for="slot in tBodySlots"
                :key="slot.cellName"
                v-slot:[`body-cell-${slot.cellName}`]="props"
      >
        <q-td class="text-center">
          <span v-if="props.slotProps.row[slot.field]">
            <q-icon name="img:icons/check_in_circle_icon.svg" size="20px"/>
          </span>
          <span v-else>
            <q-tooltip>{{ slot.tooltipText }}</q-tooltip>
            <q-icon name="img:icons/red_circle_icon.svg" size="20px"/>
          </span>
        </q-td>
      </template>
      <template v-for="slot in tBodyModuleSlots"
                 :key="slot.cellName"
                 v-slot:[`body-cell-${slot.cellName}`]="props">
        <q-td class="text-center">
          <q-tooltip>{{ checkModuleStatus(props.slotProps.row[slot.field]).statusDescr }}</q-tooltip>
          <q-icon :name="checkModuleStatus(props.slotProps.row[slot.field]).iconUrl" size="20px"/>
        </q-td>
      </template>
      <template v-slot:body-cell-story="props">
        <q-td class="text-center">
          <table-cell-btn @click.stop="openCompHistory(props.slotProps.row)"
                          tooltip="История по компании"
                          icon="history"
                          icon-color="grey-10"
          />
        </q-td>
      </template>

    </main-table>

    <base-modal :modal-title="modalTitle" v-model="displayModalHistory" >
      <table-for-modal :columns="companyHistoryTableCols" :rows="companyHistoryTableRows" />
    </base-modal>

    <base-modal-form modal-title="Создание компании"
                     v-model="displayModalForm"
                     @submit-form="submitForm=true"
                     class="valid-form"
    >
      <support-company-form v-model="companyFormData"
                            v-model:submitForm="submitForm"
                            @form-sending="displayModalForm=false"
                            @update-company-table="updateCompanyTable"
      />
    </base-modal-form>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { MainTable } from 'src/entities/MainTable/index';
import { TableSearchInput } from 'src/shared/TableSearchInput';
import { TableForModal } from 'src/entities/TableForModal';
import { BaseModal } from 'src/widgets/BaseModal';
import { TableCellBtn } from 'src/shared/TableCellBtn';
import { BaseModalForm } from 'src/widgets/BaseModalForm';
import { SupportCompanyForm } from 'src/features/SupportCompanyForm';
import { IconButton } from 'src/shared/buttons/IconButton';
import getDataParse from 'src/app/api/getDataParse';
import checkModuleStatus from 'src/app/helpers/checkModuleStatus';
import tableSettings from '../module/tableSettngs';

const loading = ref(true);
const companyTableColumns = ref(tableSettings.companyTableHead);
const companyTableRows = ref([]);
const tableSearch = ref('');
const tHeadSlots = tableSettings.tableHeadSlots;
const tBodySlots = tableSettings.tableBodySlots;
const tBodyModuleSlots = tableSettings.tableBodyModuleSlots;
const displayModalHistory = ref(false);
const displayModalForm = ref(false);
const modalTitle = ref('');
const companyHistoryTableCols = tableSettings.companyHistoryTableHead;
const companyHistoryTableRows = ref();

const companyFormData = ref({});
const submitForm = ref(false);

onBeforeMount(() => {
  getDataParse('/lk_techsupp/get_company_list/')
    .then((data) => {
      companyTableRows.value = data;
    })
    .catch((error) => { if (error) throw error; })
    .finally(() => { loading.value = false; });
});

function openCompHistory(row) {
  getDataParse('/lk_techsupp/get_history_comp/', { compId: row.id })
    .then((data) => {
      companyHistoryTableRows.value = data;
      modalTitle.value = `История по компании ${row.company_name}`;
    })
    .catch((error) => { if (error) throw error; })
    .finally(() => { displayModalHistory.value = true; });
}

function openUpdateCompanyForm(evt, row) {
  displayModalForm.value = true;
  companyFormData.value.companyId = row.id;
}

function updateCompanyTable(updateData, isUpdate) {
  if (isUpdate) {
    companyTableRows.value = companyTableRows.value.map((comp) => {
      if (comp.id === updateData[0].id) return updateData[0];
      return comp;
    });
  } else companyTableRows.value.unshift(updateData[0]);
}

</script>

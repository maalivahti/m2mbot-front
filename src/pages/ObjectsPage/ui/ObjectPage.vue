<template>
  <section class="section objects">
    <objects-tabs @switchObjectTable="switchObjectTable" @updateTable="updateTable"/>
    <main-table :loading="loading"
                :rows="rows"
                :columns="columns"
                :table-search="tableSearch"
                @row-click="openObjectSettingsModal"
                :table-class="{ 'no-row-hover': tableType !== 'bot'}"
    >
      <template v-slot:cellButton="props">
        <q-td class="text-center">
          <table-cell-btn @click.stop="openObjHistory(props.slotProps.row)"
                          tooltip="История по объекту"
                          icon="history"
                          icon-color="grey-10"
          />
        </q-td>
      </template>

      <template #tableTopRight>
        <table-search-input v-model="tableSearch"/>
        <table-setting-select @changeCompany="changeCompany"
                              :selectItems="selectItems"
                              :selectLabel="selectLabel"
        />
      </template>
    </main-table>

    <base-modal-form :modal-title="modalTitle"
                     v-model="displayModalForm"
                     @submit-form="submitForm=true"
    >
      <object-settings-form v-model="objectFormData"
                            v-model:submitForm="submitForm"
                            @form-sending="formSending"
                            @update-object-table="updateObjectTable"
      />
    </base-modal-form>

    <base-modal :modal-title="modalTitle" v-model="showModal">
      <table-for-modal :columns="objectHistory.head" :rows="objectHistory.body"/>
    </base-modal>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getData } from 'src/app/helpers/getData';
import { ObjectsTabs } from 'src/widgets/ObjectsTabs/index';
import { MainTable } from 'src/entities/MainTable/index';
import { TableSearchInput } from 'src/shared/TableSearchInput';
import { TableForModal } from 'src/entities/TableForModal';
import { BaseModalForm } from 'src/widgets/BaseModalForm';
import { TableCellBtn } from 'src/shared/TableCellBtn';
import { BaseModal } from 'src/widgets/BaseModal';
import { TableSettingSelect } from 'src/shared/TableSettingSelect';
import { useUserStore } from 'src/app/store/user-store';
import { ObjectSettingsForm } from 'src/features/ObjectSettingsForm';
import companyListForSelect from 'src/app/helpers/companyListForSelect';
import objectTableHead from '../module/objectTableHead';
import objectHistoryTbl from '../module/objectHistoryTbl';

const userStore = useUserStore();

const loading = ref(false);
const rows = ref([]);
const columns = ref([]);
const selectLabel = ref('Компания');
const selectItems = ref(companyListForSelect(userStore.companyList, true));

const company = ref('all');
const tableType = ref('bot');
const tableSearch = ref('');

const showModal = ref(false);
const modalTitle = ref('');
const displayModalForm = ref(false);
const submitForm = ref(false);
const objectFormData = ref({});
const objectHistory = ref(objectHistoryTbl.objectHistoryTbl);

function switchObjectTable(typeTable) {
  tableType.value = typeTable;
  loading.value = true;

  getData('/home/get_objects_list/', { company: 'all', type: tableType.value })
    .then((response) => {
      const objData = JSON.parse(response.obj_data);
      rows.value = objData.map((obj) => (obj));
    })
    .then(() => {
      if (typeTable === 'bot') {
        columns.value = objectTableHead.botObjectTableHead;
        selectItems.value = companyListForSelect(userStore.companyList, true);
        selectLabel.value = 'Компания';
      } else {
        columns.value = objectTableHead.wialonObjectTableHead;
        selectItems.value = companyListForSelect(userStore.wialonAccList, true);
        selectLabel.value = 'Учетная запись';
      }
    })
    .catch((error) => {
      if (error) throw error;
    })
    .finally(() => {
      loading.value = false;
    });
}

function updateTable() {
  getData('/home/update_objects_list/', {})
    .then((response) => {
      const objData = JSON.parse(response.obj_data);
      rows.value = objData.map((obj) => (obj));
    })
    .catch((error) => {
      if (error) throw error;
    })
    .finally(() => {
      loading.value = false;
    });
}

function changeCompany(companyID) {
  company.value = companyID;
  getData('/home/get_objects_list/', { company: company.value, type: tableType.value })
    .then((response) => {
      const objData = JSON.parse(response.obj_data);
      rows.value = objData.map((obj) => (obj));
    })
    .catch((error) => {
      if (error) throw error;
    })
    .finally(() => {
      loading.value = false;
    });
}

function createTableRows() {
  loading.value = true;
  getData('/home/get_objects_list/', { company: company.value, type: tableType.value })
    .then((response) => {
      const objData = JSON.parse(response.obj_data);
      columns.value = objectTableHead.botObjectTableHead;
      rows.value = objData.map((obj) => (obj));
    })
    .catch((error) => {
      if (error) throw error;
    })
    .finally(() => {
      loading.value = false;
    });
}

function openObjectSettingsModal(evt, row) {
  if (tableType.value !== 'bot') return;
  getData('/home/edit_object_settings/', { objectId: row.id })
    .then((response) => {
      const objData = JSON.parse(response.obj_data);
      objectFormData.value = objData[0];
      modalTitle.value = `Настройки объекта:  ${objData[0].name}`;
    })
    .then(() => {
      displayModalForm.value = true;
    });
}

const openObjHistory = (value) => {
  modalTitle.value = `История по объекту ${value.name}`;
  showModal.value = true;
};

const formSending = () => {
  submitForm.value = false;
  displayModalForm.value = false;
};

function updateObjectTable(updateData) {
  rows.value = rows.value.map((obj) => {
    if (obj.id === updateData[0].id) return updateData[0];
    return obj;
  });
}

onMounted(createTableRows);
</script>

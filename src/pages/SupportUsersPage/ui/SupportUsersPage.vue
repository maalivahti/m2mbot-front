<template>
  <section class="section ts-users">
    <main-table :loading="loading"
                :columns="userTableColumns"
                :rows="userTableRows"
                :table-search="tableSearch"
                :slots="tableSettings.slotsList"
                @row-click="openUpdateUserForm">
      <!-- Тулбар таблицы (левая) -->
      <template #tableTopLeft>
        <icon-button icon="add" icon-color="green" @click="displayModalForm = true;" tooltip-text="Создать пользователя"/>
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
                v-slot:[`body-cell-${slot.cellName}`]="props">
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
    </main-table>
    <base-modal-form modal-title="Создание пользователя"
                     v-model="displayModalForm"
                     @submit-form="submitForm=true"
                     class="support-form valid-form"
    >
      <support-user-form v-model="userFormData"
                         v-model:submitForm="submitForm"
                         @form-sending="displayModalForm=false"
                         @update-user-table="updateUserTable"
      />
    </base-modal-form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { MainTable } from 'src/entities/MainTable/index';
import { BaseModalForm } from 'src/widgets/BaseModalForm';
import { TableSearchInput } from 'src/shared/TableSearchInput';
import { SupportUserForm } from 'src/features/SupportUserForm';
import { IconButton } from 'src/shared/buttons/IconButton';
import getDataParse from 'src/app/api/getDataParse';
import tableSettings from '../module/tableSettngs';

const loading = ref(true);
const userTableColumns = tableSettings.userTableHead;
const userTableRows = ref([]);
const tableSearch = ref('');
const tBodySlots = tableSettings.tableBodySlots;
const tHeadSlots = tableSettings.tableHeadSlots;
const displayModalForm = ref(false);
const submitForm = ref(false);
const userFormData = ref({});

getDataParse('/lk_techsupp/get_user_list/')
  .then((data) => {
    userTableRows.value = data;
  })
  .catch((error) => { if (error) throw error; })
  .finally(() => { loading.value = false; });

function openUpdateUserForm(evt, row) {
  displayModalForm.value = true;
  userFormData.value.id = row.id;
}

function updateUserTable(updateData, isUpdate) {
  if (isUpdate) {
    userTableRows.value = userTableRows.value.map((user) => {
      if (user.id === updateData[0].id) return updateData[0];
      return user;
    });
  } else userTableRows.value.unshift(updateData[0]);
}

</script>

<style scoped>

</style>

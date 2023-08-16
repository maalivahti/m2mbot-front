<template>
  <section class="section ts-notif">
    <main-table :loading="loading"
                :columns="notifTableColumns"
                :rows="notifTableRows"
                :table-search="tableSearch">

      <!-- Тулбар таблицы (левая) -->
      <template #tableTopLeft>
        <icon-button @click="displayModalForm = true, modalTitle='Создание уведомления'"
                     icon="add"
                     icon-color="green"
                     tooltip-text="Создать уведомление"
        />
      </template>

      <!-- Тулбар таблицы (правый) -->
      <template #tableTopRight>
        <table-search-input v-model="tableSearch"/>
      </template>

      <template v-slot:cellButton="props">
        <q-td class="text-center">
          <table-cell-btn @click.stop="openEditNotifyForm(props.slotProps.row)"
                          tooltip="Редактировать уведомление"
                          icon="mdi-file-edit-outline"
                          icon-color="indigo"
          />
          <table-cell-btn @click.stop="showDeleteNotify(props.slotProps.row)"
                          tooltip="Удалить уведомление"
                          icon="mdi-delete-forever-outline"
                          icon-color="red-10"
          />
        </q-td>
      </template>
    </main-table>

    <!-- Форма создания заявки на ТО -->
    <base-modal-form :modal-title="modalTitle"
                     v-model="displayModalForm"
                     @submit-form="submitForm=true"
                     class="valid-form"
    >
      <support-notify-form v-model="notifFormData"
                           v-model:submitForm="submitForm"
                           @form-sending="displayModalForm=false"
                           @update-notify-table="updateNotifyTable"
      />

    </base-modal-form>

    <!-- Диалог подтверждения удаления уведомления -->
    <confirm-dialog :dialog-text="modalTitle"
                    v-model="displayConfirmDialog"
                    @confirm-action="deleteNotify"
    />
  </section>
</template>

<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { MainTable } from 'src/entities/MainTable/index';
import getDataParse from 'src/app/api/getDataParse';
import { BaseModalForm } from 'src/widgets/BaseModalForm';
import { TableSearchInput } from 'src/shared/TableSearchInput';
import { SupportNotifyForm } from 'src/features/SupportNotifyForm';
import { TableCellBtn } from 'src/shared/TableCellBtn';
import { ConfirmDialog } from 'src/entities/ConfirmDialog';
import { IconButton } from 'src/shared/buttons/IconButton';
import tableSettings from '../module/tableSettngs';

const loading = ref(true);
const notifTableColumns = ref(tableSettings.notifTableHead);
const notifTableRows = ref([]);
const tableSearch = ref('');
const modalTitle = ref('Создание уведомления');
const displayModalForm = ref(false);
const displayConfirmDialog = ref(false);
const notifFormData = ref({});
const submitForm = ref(false);
const selectedNotifyToDelete = ref(null);

onBeforeMount(() => {
  getDataParse('/lk_techsupp/get_user_notify_list/')
    .then((data) => { notifTableRows.value = data; })
    .catch((error) => { if (error) throw error; })
    .finally(() => { loading.value = false; });
});

function openEditNotifyForm(row) {
  notifFormData.value.notifId = row.id;
  modalTitle.value = 'Редактирование уведомления';
  displayModalForm.value = true;
}

function updateNotifyTable(updateData, isUpdate) {
  if (isUpdate) {
    notifTableRows.value = notifTableRows.value.map((notify) => {
      if (notify.id === updateData[0].id) return updateData[0];
      return notify;
    });
  } else notifTableRows.value.unshift(updateData[0]);
}

function showDeleteNotify(row) {
  modalTitle.value = `Вы действительно хотите удалить уведомление ${row.name}?`;
  selectedNotifyToDelete.value = row.id;
  displayConfirmDialog.value = true;
}

function deleteNotify() {
  axios.delete('/lk_techsupp/delete_notify/', { data: { notifyId: selectedNotifyToDelete.value } })
    .then(() => {
      notifTableRows.value = notifTableRows.value.filter((row) => row.id !== selectedNotifyToDelete.value);
    });
}

</script>

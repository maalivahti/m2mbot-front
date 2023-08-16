<template>
  <section class="section hr">
    <q-table class="main-table"
             flat bordered
             :rows="rows"
             :columns="columns"
             :loading="loading"
             color="primary"
             row-key="name"
             :pagination="initialPagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="icon" :props="props">
            <q-avatar
              size="40px"
              class="overlapping"
            >
              <img v-if="props.row.photo_url" :src="props.row.photo_url">
              <img v-else src="src/app/assets/images/empty_avatar.svg">
            </q-avatar>
          </q-td>
          <q-td key="lastName" :props="props">
            {{ props.row.last_name ? props.row.last_name : 'Не указан' }}
            <q-tooltip>{{ props.row.last_name }}</q-tooltip>
            <q-popup-edit v-model="props.row.last_name"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('last_name', props.row )"
            >
              <q-input v-model="scope.value" dense autofocus/>
            </q-popup-edit>
          </q-td>
          <q-td key="firstName" :props="props" :class="{'text-orange-14': !props.row.first_name}">
            {{ props.row.first_name ? props.row.first_name : 'Не указан' }}
            <q-tooltip>{{ props.row.first_name }}</q-tooltip>
            <q-popup-edit v-model="props.row.first_name"
                          buttons
                          v-slot="scope"
                          @update:model-value="updateStaffData('first_name', props.row )"
            >
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="secondName" :props="props" :class="{'text-orange-14': !props.row.second_name}">
            {{ props.row.second_name ? props.row.second_name : 'Не указан' }}
            <q-tooltip>{{ props.row.second_name }}</q-tooltip>
            <q-popup-edit v-model="props.row.second_name"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('second_name', props.row )"
            >
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="position" :props="props" :class="{'text-orange-14': !props.row.position}">
            {{ props.row.position ? props.row.position : 'Не указан' }}
            <q-tooltip>{{ props.row.position }}</q-tooltip>
            <q-popup-edit v-model="props.row.position"
                          buttons
                          v-slot="scope"
                          @update:model-value="updateStaffData('position', props.row )">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="department" :props="props">
            {{ props.row.department.label ? props.row.department.label : props.row.department }}
            <q-tooltip>{{ props.row.department }}</q-tooltip>
            <q-popup-edit v-model="props.row.department"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('department', props.row )">
              <q-select v-model="scope.value" dense options-dense autofocus :options="depList" label=""
                        @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="personalPhone" :props="props" :class="{'text-orange-14': !props.row.personal_phone}">
            {{ props.row.personal_phone ? props.row.personal_phone : 'Не указан' }}
            <q-tooltip>{{ props.row.personal_phone }}</q-tooltip>
            <q-popup-edit v-model="props.row.personal_phone"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('personal_phone', props.row )">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="workPhone" :props="props" :class="{'text-orange-14': !props.row.work_phone}">
            {{ props.row.work_phone ? props.row.work_phone : 'Не указан' }}
            <q-tooltip>{{ props.row.work_phone }}</q-tooltip>
            <q-popup-edit v-model="props.row.work_phone"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('work_phone', props.row )">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="eMail" :props="props" :class="{'text-orange-14': !props.row.e_mail}">
            {{ props.row.e_mail ? props.row.e_mail : 'Не указан' }}
            <q-tooltip>{{ props.row.e_mail }}</q-tooltip>
            <q-popup-edit v-model="props.row.e_mail"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('e_mail', props.row )">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="register" :props="props">
            {{ props.row.register }}
          </q-td>
          <q-td key="city" :props="props" :class="{'text-orange-14': !props.row.city}">
            {{ props.row.city ? props.row.city : 'Не указан' }}
            <q-tooltip>{{ props.row.city }}</q-tooltip>
            <q-popup-edit v-model="props.row.city"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('second_name', props.row )">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="persAddress" :props="props" :class="{'text-orange-14': !props.row.pers_address}">
            {{ props.row.pers_address ? props.row.pers_address : 'Не указан' }}
            <q-tooltip>{{ props.row.pers_address }}</q-tooltip>
            <q-popup-edit v-model="props.row.pers_address"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('pers_address', props.row )">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="ofAddress" :props="props" :class="{'text-orange-14': !props.row.of_address}">
            {{ props.row.of_address ? props.row.of_address : 'Не указан' }}
            <q-tooltip>{{ props.row.of_address }}</q-tooltip>
            <q-popup-edit v-model="props.row.of_address"
                          v-slot="scope"
                          @update:model-value="updateStaffData('of_address', props.row )">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="status" :props="props" :class="{'text-orange-14': !props.row.status}">
            <span v-if="props.row.status">{{
                props.row.status.label ? props.row.status.label : props.row.status
              }}</span>
            <span v-else>Не указан</span>
            <q-tooltip>{{ props.row.status }}</q-tooltip>
            <q-popup-edit v-model="props.row.status"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('status', props.row )"
            >
              <q-select v-model="scope.value" dense options-dense autofocus :options="statusList" label=""
                        @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="statusPers" :props="props" :class="{'text-orange-14': !props.row.status_pers}">
            <span v-if="props.row.status_pers">{{
                props.row.status_pers.label ? props.row.status_pers.label : props.row.status_pers
              }}</span>
            <span v-else>Не указан</span>
            <q-tooltip>{{ props.row.status_pers }}</q-tooltip>
            <q-popup-edit v-model="props.row.status_pers"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('status_pers', props.row )"
            >
              <q-select v-model="scope.value" dense options-dense autofocus :options="statusPersList" label=""
                        @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="addContactFio" :props="props" :class="{'text-orange-14': !props.row.add_contact_fio}">
            {{ props.row.add_contact_fio ? props.row.add_contact_fio : 'Не указан' }}
            <q-tooltip>{{ props.row.add_contact_fio }}</q-tooltip>
            <q-popup-edit v-model="props.row.add_contact_fio"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('add_contact_fio', props.row )"
            >
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
          <q-td key="addContactNum" :props="props" :class="{'text-orange-14': !props.row.add_contact_num}">
            {{ props.row.add_contact_num ? props.row.add_contact_num : 'Не указан' }}
            <q-tooltip>{{ props.row.add_contact_num }}</q-tooltip>
            <q-popup-edit v-model="props.row.add_contact_num"
                          v-slot="scope"
                          buttons
                          @update:model-value="updateStaffData('add_contact_num', props.row )"
            >
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import getData from 'src/app/api/getData';
import convertObjectsJSONToArray from 'src/app/helpers/convertObjectsJSONToArray';
import postData from 'src/app/api/postData';
import tableSetting from '../module/tableSettings';

const loading = ref(true);
const columns = ref(tableSetting.hrModuleTableHead);
const rows = ref([]);
const depList = ref([]);
const statusList = ref([]);
const statusPersList = ref([]);
const initialPagination = { rowsPerPage: 20 };

getData('/hr_module/get_staff_list/')
  .then((data) => {
    rows.value = JSON.parse(data.req_data.staffList);
    depList.value = convertObjectsJSONToArray(data.req_data.depList, 'name', 'id_dep');
    statusList.value = convertObjectsJSONToArray(data.req_data.statusList, 'name', 'id_status');
    statusPersList.value = convertObjectsJSONToArray(data.req_data.statusPersList, 'name', 'id_status');
  })
  .catch((error) => { if (error) throw error; })
  .finally(() => { loading.value = false; });

function updateStaffData(field, row) {
  const reqData = {
    updateFiled: field,
    value: row[field].label ? row[field].label : row[field],
  };
  postData('/hr_module/update_staff_vue/', reqData);
}
</script>

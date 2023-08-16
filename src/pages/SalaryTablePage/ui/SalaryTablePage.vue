<template>
  <table-from-list :table-head-cells="salaryListThead">
    <template #tableListTopLeft>
      <button-outline color="primary" label="Добавить займ" @click="showCreateModal('loan', 'Добавить займ')"/>
      <button-outline color="primary" label="Внести транзакцию" @click="showCreateModal('oneTrans', 'Внести транзакцию')"/>
      <button-outline color="primary" label="Внести группой"/>
    </template>
    <template #tableListTopRight>
      <table-period-picker dateLabel="Период" v-model:date="tableFilterPeriod" @date="changePeriod"/>
    </template>
    <template #tableListBody>
      <li class="list-table__main-item" v-for="(mainDep, index) in mainDepList" :key="mainDep.id">
        <table-from-list-expand-title v-model="mainDepList[index]" label-field="name"/>

        <salary-table-staff-details :parent-dep="mainDep" :trans-list="sortingTransList" :staff="staffList"/>

        <template v-for="(dep, index) in departmentList" :key="dep.id">
          <ul class="list-reset list-table__child-list" v-if="dep.parent_id === mainDep.id" v-show="mainDep.expand">
            <table-from-list-expand-title v-model="departmentList[index]"
                                          label-field="name"
                                          class="q-pl-lg bg-blue-7 text-white"
            />

            <template v-for="(subDep, index) in departmentList" :key="subDep.id">
              <ul class="list-reset list-table__child-list" v-if="subDep.parent_id === dep.id" v-show="dep.expand">
                <table-from-list-expand-title v-model="departmentList[index]"
                                              label-field="name"
                                              class="q-pl-xl bg-light-blue-2 text-indigo"
                />
                <salary-table-staff-details :parent-dep="subDep" :trans-list="sortingTransList" :staff="staffList"/>
              </ul>
            </template>
            <salary-table-staff-details :parent-dep="dep" :trans-list="sortingTransList" :staff="staffList"/>
          </ul>
        </template>
      </li>
    </template>

  </table-from-list>
  <base-modal-form :modal-title="modalTitle"
                   v-model="displayModalForm"
                   @submit-form="submitForm=true"
  >
    <salary-loan-form v-model="createLoadData"
                      v-model:submitForm="submitForm"
                      @form-sending="formSending"
                      :staff-list="staffList"
                      v-if="isActiveForm === 'loan'"
                      @form-server-error="serverErrorHandler.showServerErrorPopup();"
    />

    <salary-trans-form v-model="createLoadData"
                      v-model:submitForm="submitForm"
                      @form-sending="formSending"
                      @update-salary-table="updateSalaryTable"
                      :staff-list="staffList"
                      v-if="isActiveForm === 'oneTrans'"
                      @form-server-error="serverErrorHandler.showServerErrorPopup();"
    />
  </base-modal-form>

  <server-error-popup v-model="displayServerErrorPopup" />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { TableFromList } from 'src/shared/TableFromList';
import { TableFromListExpandTitle } from 'src/shared/TableFromListExpandTitle';
import { TablePeriodPicker } from 'src/shared/TablePeriodPicker';
import SalaryTableStaffDetails from 'pages/SalaryTablePage/ui/SalaryTableStaffDetails.vue';
import { ButtonOutline } from 'src/shared/buttons/ButtonOutline';
import { BaseModalForm } from 'src/widgets/BaseModalForm';
import { SalaryLoanForm } from 'src/features/SalaryLoanForm';
import { SalaryTransForm } from 'src/features/SalaryTransForm';
import { ServerErrorPopup } from 'src/shared/ServerErrorPopup';
import { serverErrorHandler } from 'src/app/helpers/serverErrorHandler';
import { salaryListThead } from '../module/tableSettings';
import { getSalaryData } from '../api/getSalaryData';
import { sortingTransByStaff } from '../helpers/sortingTransByStaff';

const departmentList = ref(null);
const mainDepList = ref(null);
const staffList = ref(null);
const transList = ref(null);
const sortingTransList = ref(null);
const tableFilterPeriod = ref();
const isActiveForm = ref('');
const displayModalForm = ref(false);
const modalTitle = ref('');
const submitForm = ref(false);
const createLoadData = ref({});
const displayServerErrorPopup = ref(serverErrorHandler.popupStatus);

onBeforeMount(() => {
  const currentDate = new Date();
  if (currentDate.getDay() > 1 && currentDate.getDay() < 15) tableFilterPeriod.value = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
  else tableFilterPeriod.value = new Date(currentDate);
  getSalaryData(departmentList, staffList, transList, sortingTransList, mainDepList);
});

function changePeriod() {
  getSalaryData(departmentList, staffList, transList, sortingTransList, mainDepList, tableFilterPeriod.value);
}

const formSending = () => {
  submitForm.value = false;
  displayModalForm.value = false;
};

function showCreateModal(formName, label) {
  isActiveForm.value = formName;
  displayModalForm.value = true;
  modalTitle.value = label;
}

function updateSalaryTable(data) {
  sortingTransList.value = sortingTransByStaff([...transList.value, ...data]);
}

</script>

<template>
  <div class="list-table full-width bg-white">
    <ul class="list-reset list-table__head flex no-wrap full-width">
      <li class="list-table__th"
          :style="thead.headerStyle"
          v-for="thead in tableSettings.persListThead"
          :key="thead.name"
      >
        {{ thead.label }}
      </li>
    </ul>

    <ul class="list-reset list-table__body">
      <li class="list-table__main-item" v-for="(mainDep, index) in mainDepList" :key="mainDep.id">
        <table-from-list-expand-title v-model="mainDepList[index]" label-field="name"/>

        <template v-for="staff in staffList" :key="staff.id">
          <table-from-list-row :field-list="tableSettings.persListThead"
                               :row-data="staff"
                               v-if="staff.dep_id === mainDep.id"
                               v-show="mainDep.expand"
          />
        </template>

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

                <template v-for="staff in staffList" :key="staff.id">
                  <table-from-list-row :field-list="tableSettings.persListThead"
                                       :row-data="staff"
                                       v-if="staff.dep_id === subDep.id"
                                       v-show="subDep.expand && mainDep.expand"
                  />
                </template>
              </ul>
            </template>

            <template v-for="staff in staffList" :key="staff.id">
              <table-from-list-row :field-list="tableSettings.persListThead"
                                   :row-data="staff"
                                   v-if="staff.dep_id === dep.id"
                                   v-show="dep.expand && mainDep.expand"
              />
            </template>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import getData from 'src/app/api/getData';
import { TableFromListRow } from 'src/shared/TableFromListRow';
import { TableFromListExpandTitle } from 'src/shared/TableFromListExpandTitle';
import tableSettings from '../module/tableSettings';

const departmentList = ref(null);
const mainDepList = ref(null);
const staffList = ref([]);

onBeforeMount(() => {
  getData('/salary/get_salary_pers')
    .then((data) => {
      departmentList.value = JSON.parse(data.department_list).map((dep) => ({ ...dep, expand: false }));
      staffList.value = JSON.parse(data.staff_list).map((staff) => {
        const fullName = `${staff.last_name} ${staff.first_name} ${staff.second_name}`;
        return { ...staff, full_name: fullName };
      });
      mainDepList.value = departmentList.value.filter((dep) => dep.parent_id === 1);
    });
});
</script>

<style lang="scss" scoped>
.list-table__th {
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  border: 0 rgba(0, 0, 0, 0.12) solid;
  border-bottom-width: 1px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}
</style>

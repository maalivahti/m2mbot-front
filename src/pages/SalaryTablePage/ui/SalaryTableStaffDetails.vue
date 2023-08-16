<template>
  <template v-for="(pers, index) in staffList" :key="pers.name">
    <salary-table-staff-row :field-list="salarySummaryListThead"
                            v-if="pers.dep_id === parentDep.id"
                            :row-data="transactions[pers.id]"
                            v-model="staffList[index]"
                            v-show="parentDep.expand"
                            class="q-pl-xl bg-white text-indigo"
    />
    <template v-for="transaction in transactions[pers.id]" :key="transaction.id">
      <table-from-list-row :field-list="salaryListThead"
                           :row-data="transaction"
                           v-if="pers.dep_id === parentDep.id"
                           v-show="pers.expand && parentDep.expand"
      />
    </template>
  </template>
</template>

<script setup>
import { computed } from 'vue';
import { TableFromListRow } from 'src/shared/TableFromListRow';
import SalaryTableStaffRow from './SalaryTableStaffRow.vue';
import { salaryListThead, salarySummaryListThead } from '../module/tableSettings';

const props = defineProps({
  staff: { type: Array, required: true },
  transList: { type: Object, required: true },
  parentDep: { type: Object, required: true },
});

const emit = defineEmits(['update:staff', 'update:trans']);

const staffList = computed({
  get() {
    return props.staff;
  },
  set(value) {
    emit('update:staff', value);
  },
});

const transactions = computed({
  get() {
    return props.transList;
  },
  set(value) {
    emit('update:trans', value);
  },
});
</script>

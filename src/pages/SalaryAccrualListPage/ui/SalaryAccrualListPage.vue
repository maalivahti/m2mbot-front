<template>
  <section class="section salary-trans">
    <main-table
      :loading="loading"
      :columns="columns"
      :rows="rows"
      :table-search="tableSearch"
    >
      <!-- Тулбар таблицы (правый) -->
      <template #tableTopRight>
        <table-search-input v-model="tableSearch"/>
        <q-btn flat round color="grey-10"
               icon="mdi-filter-outline"
               @click="displayFilter = !displayFilter"
        />
      </template>
    </main-table>

    <!-- Блок фильтра таблицы -->
    <div class="q-pa-md q-gutter-sm">
      <table-filter v-model="displayFilter" @submit-filter="submitFilter">
        <template #filterInputs>
          <filter-date-picker dateLabel="Период" v-model:date="filterDateFrom"/>
          <filter-select :selectItems="companySelectItems"
                         selectLabel="Сотрудник"
                         v-model="company"
                         @change-filter-select="(value) => company = value"
          />
          <filter-select :selectItems="companySelectItems"
                         selectLabel="Ответственный"
                         v-model="company"
                         @change-filter-select="(value) => company = value"
          />
          <filter-select :selectItems="companySelectItems"
                         selectLabel="Основание"
                         v-model="company"
                         @change-filter-select="(value) => company = value"
          />
        </template>
      </table-filter>
    </div>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import getData from 'src/app/api/getData';
import { MainTable } from 'src/entities/MainTable/index';
import { TableSearchInput } from 'src/shared/TableSearchInput';
import { TableFilter } from 'src/features/TableFilter';
import { FilterSelect } from 'src/shared/Form/FilterSelect';
import { FilterDatePicker } from 'src/shared/Form/FilterDatePicker';
import tableSetting from '../module/tableSettings';

const loading = ref(true);
const columns = ref(tableSetting.salaryTransTableSett);
const rows = ref([]);
const tableSearch = ref('');
const displayFilter = ref(false);

onBeforeMount(() => {
  getData('/salary/get_accrual_list/')
    .then((data) => {
      rows.value = JSON.parse(data.salary_list);
    })
    .catch((error) => { if (error) throw error; })
    .finally(() => { loading.value = false; });
});
</script>

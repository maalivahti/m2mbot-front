<template>
  <q-table class="main-table"
           flat
           bordered
           dense
           :rows="rows"
           :columns="columns"
           :loading="loading"
           :filter="tableSearch"
           :pagination="initialPagination"
           color="primary"
           row-key="name">

    <template v-slot:body-cell-beforeIcon="rows">
      <slot name="cellContentWithIcon" v-bind:slotProps="rows"/>
    </template>

    <!--   Динамический слот для ячеек   -->
    <template v-for="slot in slots" v-slot:[`${slot}`]="rows">
      <slot :name="slot" v-bind:slotProps="rows"/>
    </template>

    <!--   Удалить, заменив на динамический слот   -->
    <template v-slot:body-cell-button="rows">
      <slot name="cellButton" v-bind:slotProps="rows"/>
    </template>

    <template #top-left>
      <slot name="tableTopLeft"/>
    </template>

    <template v-slot:top-right>
      <slot name="tableTopRight"/>
    </template>
  </q-table>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps({
  title: { type: String, required: false },
  rows: { type: Array, required: true },
  columns: { type: Array, required: true },
  pagination: { type: Number, required: false, default: 20 },
  loading: { type: Boolean, required: false },
  tableSearch: { type: String, required: false, default: '' },
  slots: { type: Array },
});

const initialPagination = { rowsPerPage: props.pagination };

</script>

<style lang="scss">
.main-table {
  table {
    table-layout: fixed;
  }
  .q-table td {
    padding: 5px;
  }
}
</style>

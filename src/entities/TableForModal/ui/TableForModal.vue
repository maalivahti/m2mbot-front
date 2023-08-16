<template>
  <q-table class="modal-table"
        flat bordered
        :rows="rows"
        :columns="columns"
        color="primary"
        row-key="name"
        :loading="loading"
        :rows-per-page-options="[0]"
        :pagination="pagination"
        dense
  >
    <template v-slot:body-cell-icon="rows">
      <slot name="cellButton" v-bind:slotProps="rows"/>
    </template>
  </q-table>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps({
  rows: { type: Array, required: true },
  columns: { type: Array, required: true },
  loading: { type: Boolean, required: false },
});

const pagination = {
  page: 1,
  rowsPerPage: 0,
};

</script>

<style lang="scss">
.modal-table {
  table {
    table-layout: fixed;
  }
}
</style>

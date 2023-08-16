<template>
  <ul class="list-reset list-table__tr flex full-width justify-between no-wrap bg-light-blue-1">
    <li class="list-table__td"
        :style="fieldList[i].headerStyle"
        v-for="(val, i) in fieldList"
        :key="fieldList[i].name"
    >
      {{ fieldList[i].field(rowData[fieldList[i].name], rowData) }}
    </li>
  </ul>
</template>

<script setup>
defineProps({
  rowData: { type: Object, required: true },
  fieldList: { type: Array, required: true },
});
</script>

<style scoped>

.list-table__td {
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  border: 0 rgba(0, 0, 0, 0.12) solid;
  border-bottom-width: 1px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}
</style>

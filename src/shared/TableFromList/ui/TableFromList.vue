<template>
  <div class="list-table full-width bg-white">
    <div class="list-table__top-bar row" v-if="tableTop">

      <div class="col flex justify-start q-gutter-sm">
        <slot name="tableListTopLeft"/>
      </div>

      <div class="col flex justify-end">
        <slot name="tableListTopRight"/>
      </div>

    </div>
    <ul class="list-reset list-table__head flex no-wrap full-width">
      <li class="list-table__th"
          v-for="thead in tableHeadCells"
          :style="thead.headerStyle"
          :key="thead.name"
      >
        {{ thead.label }}
      </li>
    </ul>
    <ul class="list-reset list-table__body">
      <slot name="tableListBody" />
    </ul>
  </div>
</template>

<script setup>
defineProps({
  tableHeadCells: { type: Array, required: true },
  tableTop: { type: Boolean, required: false, default: true },
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

.list-table__top-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 6px 16px;
  background-color: var(--color-light);
}
</style>

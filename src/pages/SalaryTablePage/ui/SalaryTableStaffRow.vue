<template>
<ul :class="`${rowData ? 'cursor-pointer' : ''} list-reset list-table__tr flex full-width justify-between no-wrap`"
    @click="dataValue.expand = !dataValue.expand"
>
  <li class="list-table__td"
      :style="fieldList[i].headerStyle"
      v-for="(val, i) in fieldList"
      :key="fieldList[i].name"
  >
    {{ fieldList[i].field(rowData, modelValue) }}
  </li>
</ul>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: { type: Object, required: true },
  rowData: { type: Object, required: true },
  fieldList: { type: Array, required: true },
});

const dataValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style scoped lang="scss">
.list-table__tr {
  padding-left: 48px !important;
  font-weight: 500;
}

.list-table__td {
  padding: 12px 8px;
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 12px;
  line-height: 18px;

  &:nth-child(1) {
    padding-left: 26px;
  }
}
</style>

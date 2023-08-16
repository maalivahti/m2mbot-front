<template>

  <q-dialog class="table-filter__wrap" v-model="displayFilter"
            seamless
            position="right">
    <q-card class="table-filter">
      <q-card-section class="table-filter__head">
        <div class="table-filter__title text-h6">Фильтр</div>
      </q-card-section>
      <q-separator/>
      <q-card-section class="col items-center no-wrap q-gutter-sm">
        <slot name="filterInputs"/>
      </q-card-section>
      <q-space />
      <q-card-section class="row justify-center">
        <q-btn color="primary" label="Применить" @click="applyFilter"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['change', 'delete', 'update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const displayFilter = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function applyFilter() {
  displayFilter.value = false;
  emit('submitFilter');
}

</script>

<style lang="scss">
.table-filter__wrap {
  .fixed-right {
    right: 15px;
    top: -300px;
  }
}
.table-filter {
  width: 350px;
  border: 1px solid var(--color-indigo);
}
.table-filter__head {
  padding-top: 5px;
  padding-bottom: 5px;
}
.table-filter__title {
  font-size: 18px;
  color: var(--color-shaft);
}
</style>

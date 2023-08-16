<template>
  <q-select class="q-ml-sm table-select"
            filled
            dense
            options-dense
            :options="options"
            :label="selectLabel"
            v-model="selectValue"
            use-input
            input-debounce="200"
            @filter="filterFn"
            @update:model-value="(value) => changeSelectValue(value)">
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          Не найдено
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import {
  onBeforeMount,
  ref,
  watch,
  toRefs,
  defineProps,
} from 'vue';

const props = defineProps({
  selectItems: { type: Array, required: true },
  selectLabel: { type: String, required: false },
});

const emit = defineEmits(['change', 'delete']);

const selectValue = ref('');
const { selectItems } = toRefs(props);
const options = ref([]);

const createCompanySelect = () => {
  options.value = selectItems.value;
  selectValue.value = options.value[0];
};

const changeSelectValue = (value) => {
  emit('changeCompany', value.value);
};

onBeforeMount(createCompanySelect);

watch(selectItems, createCompanySelect);

function filterFn(val, update) {
  if (val === '') {
    update(() => {
      options.value = selectItems.value;
    });
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = selectItems.value.filter((v) => v.label.toLowerCase().includes(needle));
  });
}

</script>

<style lang="scss" scoped>
.table-select {
  width: 180px;
  font-size: 12px;

  .q-field__native {
    flex-wrap: nowrap;

    .q-select .q-field__input {
      min-width: 10px !important;
    }

    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>

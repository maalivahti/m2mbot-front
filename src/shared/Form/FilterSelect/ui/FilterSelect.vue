<template>
  <q-select class="q-ml-sm filter-select"
            dense
            label-color="blue-grey-7"
            :options="options"
            :label="selectLabel"
            v-model="selectValue"
            emit-value
            map-options
            @update:model-value="(value) => changeSelectValue(value)"
  />
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
  emit('changeFilterSelect', value.value);
};

onBeforeMount(createCompanySelect);

watch(selectItems, createCompanySelect);

</script>

<style lang="scss">
.filter-select {
  font-size: 12px;
  white-space: nowrap;
}
</style>

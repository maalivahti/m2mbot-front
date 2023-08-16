<template>
  <q-select outlined
            dense
            options-dense
            v-model="dataValue"
            :options="selectOptions"
            label=""
            emit-value
            map-options
            use-input
            input-debounce="200"
            @filter="filterFn"
            @update:model-value="(value) => changeSelectValue(value)"
            class="base-modal__select col-7"
  />
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  options: { type: Array, required: true },
  modelValue: { type: String, required: false },
});

const selectOptions = ref(props.options);

const emit = defineEmits(['change', 'delete', 'update:modelValue']);

const dataValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const changeSelectValue = (value) => {
  dataValue.value = value;
};

function filterFn(val, update) {
  if (val === '') {
    update(() => {
      selectOptions.value = props.options.value;
    });
  }

  update(() => {
    const needle = val.toLowerCase();
    selectOptions.value = props.options.filter((v) => v.label.toLowerCase().includes(needle));
  });
}

</script>

<style lang="scss">
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
</style>

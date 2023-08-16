<template>
  <q-bar class="bg-white text-indigo">
    <q-tabs v-model="accessTabs"
            dense class="text-light"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
    >
      <q-tab v-for="{name, label} in formOptions.accessTabsItems"
             :name="name"
             :label="label"
             :key="name"
      />
    </q-tabs>
  </q-bar>

  <q-tab-panels v-model="accessTabs" animated>
    <q-tab-panel name="company">
      <dragndrop-list second-list-title="Выбранные компании:"
                      :second-list-data="compList"
                      first-list-title="Доступные компании:"
                      :first-list-data="allCompList"
                      v-model="dataValue.company"
      />
    </q-tab-panel>

    <q-tab-panel name="accounts">
      <dragndrop-list second-list-title="Выбранные Уч.записи:"
                      :second-list-data="accList"
                      first-list-title="Доступные Уч.записи:"
                      :first-list-data="allAccList"
                      v-model="dataValue.company"
      />
    </q-tab-panel>

    <q-tab-panel name="reports">
      <dragndrop-list second-list-title="Выбранные Доп.отчеты:"
                      :second-list-data="reportList"
                      first-list-title="Доступные Доп.отчеты:"
                      :first-list-data="allReportList"
                      v-model="dataValue.company"
      />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { computed, ref } from 'vue';
import { DragndropList } from 'src/features/DragndropList';
import formOptions from '../module/formOptions';

const accessTabs = ref('company');
const props = defineProps({
  modelValue: { type: Object, required: true },
  compList: { type: Array, required: true },
  allCompList: { type: Array, required: true },
  accList: { type: Array, required: true },
  allAccList: { type: Array, required: true },
  reportList: { type: Array, required: true },
  allReportList: { type: Array, required: true },
});

const emit = defineEmits(['update:modelValue']);

const dataValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

</script>

<template>
  <div class="row justify-between">
    <q-card class="my-card col">
      <q-card-section class="bg-light-blue-2 text-indigo q-pa-sm sticky">
        <div class="text-subtitle2 text-center">{{ firstListTitle }}</div>
      </q-card-section>
      <q-card-section class="q-pa-sm">
        <search-input v-model="firstSearchValue" @update:model-value="filterFirstList"/>
      </q-card-section>
      <q-card-section class="q-pa-sm">
        <q-scroll-area style="height: 250px;">
          <q-list dense padding class="rounded-borders col first-list">
            <q-item v-for="item in firstList"
                    :key="item.value"
                    :active-class="'item-selected'"
                    :active="item.selected"
                    clickable v-ripple
                    @click="selectedElementList(item.value, 'firstList'), item.selected = !item.selected">
              <q-item-section>
                {{ item.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-card-section>
      <div class="flex justify-center items-center">
        <q-btn flat rounded no-caps color="primary" label="Выделить все" size-xs @click="selectedAllElements('firstList')"/>
      </div>
    </q-card>

    <div class="col-1 column justify-center q-gutter-sm">
      <q-btn flat round color="primary" icon="mdi-arrow-left-bold-outline" :disable="!secondSelectedElements.length" @click="addToFirstList"/>
      <q-btn flat round color="primary" icon="mdi-arrow-right-bold-outline" :disable="!firstSelectedElements.length" @click="addToSecondList"/>
    </div>

    <q-card class="my-card col">
      <q-card-section class="bg-blue-4 text-indigo q-pa-sm sticky">
        <div class="text-subtitle2 text-center">{{ secondListTitle }}</div>
      </q-card-section>
      <q-card-section class="q-pa-sm">
        <search-input v-model="secondSearchValue" @update:model-value="filterSecondList"/>
      </q-card-section>
      <q-card-section class="q-pa-sm">
        <q-scroll-area style="height: 250px;">
          <q-list dense padding class="rounded-borders col second-list">
            <q-item v-for="item in secondList"
                    :key="item.value"
                    clickable v-ripple
                    :active="item.selected"
                    :active-class="'item-selected'"
                    @click="selectedElementList(item.value, 'secondList'), item.selected = !item.selected">
              <q-item-section>
                {{ item.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-card-section>
      <div class="flex justify-center items-center">
        <q-btn flat rounded no-caps color="primary" label="Выделить все" size-xs @click="selectedAllElements('secondList')"/>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { SearchInput } from 'src/shared/SearchInput';

// eslint-disable-next-line
const props = defineProps({
  firstListData: { type: Array, required: true },
  firstListTitle: { type: String, required: true },
  secondListData: { type: String, required: true },
  modelValue: { type: Array, required: true },
  secondListTitle: { type: String, required: true },
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

// Список id элементов во втором списке
const secondListValues = ref(props.secondListData.map((el) => (el.value)));

// Список элементов первого списка
const filteredFirstList = computed(() => (props.firstListData.filter((el) => !secondListValues.value.includes(el.value))));

// Список элементов первого списка с примененным поиском
const firstList = computed(() => (Object.assign((filteredFirstList.value), { selected: false })));
const secondList = ref(props.secondListData); // Список элементов второго списка

const firstSearchValue = ref(null); // Модель поиска первого списка
const secondSearchValue = ref(null); // Модель поиск второго списка

const firstSelectedElements = ref([]); // Список с выбранными элементами первого списка
const secondSelectedElements = ref([]); // Список с выбранными элементами первого списка

// Поиск по первому списку
function filterFirstList(value) {
  firstList.value = filteredFirstList.value.filter(((el) => (el.label.toLowerCase().includes(value.toLowerCase()))));
}

// Поиск по второму списку
function filterSecondList(value) {
  secondList.value = props.secondListData.filter(((el) => (el.label.toLowerCase().includes(value.toLowerCase()))));
}

// Выбор элементов списка
function selectedElementList(itemId, list) {
  let selectedList;

  if (list === 'firstList') selectedList = firstSelectedElements;
  else selectedList = secondSelectedElements;

  if (selectedList.value.includes(itemId)) selectedList.value = selectedList.value.filter((el) => (el !== itemId));
  else selectedList.value.push(itemId);
}

// Перемещение элементов из первого списка во второй
function addToSecondList() {
  secondListValues.value = [...secondListValues.value, ...firstSelectedElements.value]; // Массив id с элементами для второго списка
  secondList.value = props.firstListData.filter((el) => (secondListValues.value.includes(el.value)));
  secondList.value.forEach((el) => { el.selected = false; }); // Сброс у элемента выделения
  dataValue.value = secondListValues.value;
  firstSelectedElements.value = [];
}

// Перемещение элементов из второго в первый
function addToFirstList() {
  secondList.value.forEach((el) => { el.selected = false; }); // Сброс у элемента выделения
  secondList.value = secondList.value.filter((el) => (secondSelectedElements.value.includes(el.value) === false));
  secondListValues.value = secondList.value.map((el) => (el.value)); // Массив id с элементами для второго списка
  dataValue.value = secondListValues.value;
  secondSelectedElements.value = [];
}

function selectedAllElements(list) {
  const originList = list === 'firstList' ? firstList : secondList;
  const selectedElemList = list === 'firstList' ? firstSelectedElements : secondSelectedElements;

  if (selectedElemList.value.length < originList.value.length) {
    selectedElemList.value = originList.value.map((el) => (el.value));
    originList.value.forEach((el) => { el.selected = true; });
  } else {
    selectedElemList.value = [];
    originList.value.forEach((el) => { el.selected = false; });
  }
}

</script>

<style scoped lang="scss">
.q-list--dense > .q-item, .q-item--dense {
  padding: 2px 8px;
  font-size: 12px;
}

.item-selected {
  background-color: var(--color-french);
}
</style>

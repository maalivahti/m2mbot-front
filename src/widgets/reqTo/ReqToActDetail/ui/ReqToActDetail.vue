<template>
  <p class="detail-sheet__title text-h5">Акт тех.обслуживания № {{ modelValue.number }} от {{ modelValue.date }}</p>
  <ul class="detail-sheet__list list-reset">
    <li class="detail-sheet__item row">
      <modal-list-item label="Объект заявки:" :descr="modelValue.object" />
    </li>

    <li class="detail-sheet__item">
      <modal-list-item label="Тех.специалист: "
                       :descr="staff"
                       v-for="staff in staffList"
                       :key="staff"
      />
    </li>

    <li class="detail-sheet__item" v-if="modelValue.res_inspect">
      <p class="detail-sheet__label col-4">Результат осмотра: </p>
      <p class="detail-sheet__descr col-8">{{ modelValue.res_inspect }}</p>
    </li>

    <li class="detail-sheet__item" v-if="modelValue.res_diagnost">
      <p class="detail-sheet__label col-4">Результат диагностики: </p>
      <p class="detail-sheet__descr col-8">{{ modelValue.res_diagnost }}</p>
    </li>

    <li class="detail-sheet__item" v-if="modelValue.res_execut">
      <p class="detail-sheet__label col-4">Выполненные работы: </p>
      <p class="detail-sheet__descr col-8">{{ modelValue.res_execut }}</p>
    </li>
  </ul>
  <q-card-section horizontal class="q-mt-lg">
    <q-btn label="Оставить отзыв" type="button" color="indigo"/>
    <q-space />
    <q-btn label="Скачать акт" type="button" color="green"/>
  </q-card-section>
</template>

<script setup>
import { ModalListItem } from 'src/shared/ModalListItem';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const staffList = computed(() => (Array.from(Object.values(props.modelValue.staff_list))
  .map((staff) => (`${staff[0]} (${staff[1]})`))));

</script>

<style scoped>

</style>

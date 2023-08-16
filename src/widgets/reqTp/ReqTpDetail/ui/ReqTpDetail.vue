<template>
  <table-row-detail-modal v-model="modalState" :modal-title="title">
    <modal-list-item label="Компания: " :descr="reqData.company"/>
    <modal-list-item label="Статус: " :descr="reqData.status"/>
    <modal-list-item label="Ответственный:" :descr="reqData.author"/>
    <modal-list-item label="Оператор:" :descr="reqData.operator"/>
    <div class="col" v-if="reqData.problem">
      <p class="detail-sheet__label row">Описание проблемы: </p>
      <p class="detail-sheet__descr row">{{ reqData.problem }}</p>
    </div>
    <div class="col" v-if="reqData.resolve">
      <p class="detail-sheet__label row">Результат анализа: </p>
      <p class="detail-sheet__descr row">{{ reqData.resolve }}</p>
    </div>
  </table-row-detail-modal>
</template>

<script setup>
import { computed, ref } from 'vue';
import { TableRowDetailModal } from 'src/widgets/TableRowDetailModal';
import { ModalListItem } from 'src/shared/ModalListItem';

const emit = defineEmits(['change', 'delete', 'update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
  reqData: {
    type: Object,
    required: true,
  },
});

const title = ref('Заявка в тех. поддержку УТ-00002278 от 18.05.2022');

const modalState = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

</script>

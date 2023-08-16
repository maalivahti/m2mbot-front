<template>
  <table-row-detail-modal v-model="modalState" :modal-title="title">
    <div class="row">
      <modal-list-item label="Номер заявки: " :descr="reqData.number" />
      <modal-list-item label="Местоположение: " :descr="reqData.address" />
    </div>
    <div class="row">
      <modal-list-item label="Компания: " :descr="reqData.company" />
      <modal-list-item label="Логист: " :descr="reqData.logist" />
    </div>
    <div class="row">
      <modal-list-item label="Планируемая дата: " :descr="reqData.datePlan" />
      <modal-list-item label="Автор: " :descr="reqData.author" />
    </div>
    <div class="row">
      <modal-list-item v-if="reqData.comment" label="Комментарий к заявке: " :descr="reqData.comment" />
    </div>

    <q-card-section class="col items-center no-wrap q-gutter-sm">
      <table-for-modal :columns="tableSettings.reqsTableHead" :rows="reqData.objects"/>
    </q-card-section>
  </table-row-detail-modal>
</template>

<script setup>
import { computed, ref } from 'vue';
import { TableRowDetailModal } from 'src/widgets/TableRowDetailModal';
import { ModalListItem } from 'src/shared/ModalListItem';
import { TableForModal } from 'src/entities/TableForModal';
import tableSettings from '../module/reqToDetailTableSettings';

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

const title = ref('Заявка на проведение тех.обслуживания');

const modalState = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

</script>

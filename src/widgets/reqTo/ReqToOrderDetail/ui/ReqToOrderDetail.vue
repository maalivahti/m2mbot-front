<template>
  <table-row-detail-modal v-model="modalState" :modal-title="`Заказ-наряд № ${reqData.number} от ${reqData.date}`">
    <q-card style="box-shadow: none">
      <q-card-section horizontal>
        <q-card-section class="col-6" style="padding: 0">
          <modal-list-item label="Компания: " :descr="reqData.company" />

          <div class="col row" v-if="reqData.obj_list.length > 1">
            <span class="base-modal__label col-4">Объект заявки: </span>
            <q-select class="detail-sheet__select"
                      borderless
                      v-model="activeObject"
                      :options="reqData.obj_list"
                      @update:model-value="(value) => getObjectTerminal(value)"/>
          </div>

          <modal-list-item label="Объект заявки: " :descr="reqData.obj_list[0]" v-if="reqData.obj_list.length === 1"/>
          <modal-list-item label="Модель терминала: " :descr="orderData.terminalModel" />
          <modal-list-item label="ID терминала: " :descr="orderData.terminalNumber" />
          <modal-list-item label="Планируемая дата: " :descr="reqData.desterm" />
          <modal-list-item label="Фактическая дата: " :descr="reqData.date" />
          <modal-list-item label="Местоположение: " :descr="reqData.number" />
          <modal-list-item label="Автор заявки: " :descr="reqData.author" />
          <modal-list-item label="Тех. специалист: " :descr="reqData.number" />
          <modal-list-item label="Менеджер: " :descr="manager" />
          <modal-list-item label="Комментарий: " :descr="reqData.comment" />
          <div class="col row" v-if="reqData.actList.length">
            <span class="base-modal__label col-4">Проведенные акты: </span>
            <q-btn flat
                   color="primary"
                   class="base-modal__descr text-body2 base-modal__descr--btn"
                   v-for="act in reqData.actList"
                   @click.prevent="getActDetail(act.act_id)"
                   :key="act.act_id"
                   :label="act.act_number"/>
          </div>
        </q-card-section>

        <q-card-section class="col-6" style="padding: 0" v-if="displayDetailAct">
          <req-to-act-detail v-model="actData"/>
        </q-card-section>
      </q-card-section>
    </q-card>
  </table-row-detail-modal>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { TableRowDetailModal } from 'src/widgets/TableRowDetailModal';
import { ModalListItem } from 'src/shared/ModalListItem';
import { ReqToActDetail } from 'src/widgets/reqTo/ReqToActDetail';
import { getData } from 'src/app/helpers/getData';

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

const modalState = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const displayDetailAct = ref(false);
const actData = ref({});
const activeObject = ref();

const orderData = computed({
  get() {
    return props.reqData;
  },
  set(value) {
    emit('update:reqData', value);
  },
});

function getObjectTerminal(objName) {
  getData('/home/get_object_terminal/', { objName })
    .then((data) => {
      orderData.value.terminalModel = data.obj_info[0];
      orderData.value.terminalNumber = data.obj_info[1];
    });
}

watch(
  () => props.reqData,
  (state) => {
    displayDetailAct.value = false;
    activeObject.value = state.obj_list[0];
    getObjectTerminal(state.obj_list[0]);
  },
);

const manager = computed(() => (props.reqData.serv_manager ? props.reqData.serv_manager : props.reqData.main_manager));

function getActDetail(act) {
  getData('/home/detail_req_act/', { actId: act })
    .then((data) => {
      actData.value = JSON.parse(data.req_data)[0];
    })
    .then(() => {
      displayDetailAct.value = true;
    });
}

</script>

<style lang="scss">
.detail-sheet__title {
  padding-left: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid var(--color-separation);
}

.detail-sheet__item {
  padding: 5px;
  border-bottom: 1px solid var(--color-separation);

  &:not(:last-child) {
    margin-bottom: 5px;
   }
}

.detail-sheet__label {
  font-size: 12px;
  font-weight: 700;
  color: #284669;
}

.detail-sheet__descr {
  font-size: 12px;
  color: #546E7A;
}

.detail-sheet__select {
  font-size: 12px;
  color: #546E7A;

  .q-field__inner, .q-field__control, .q-field__marginal  {
    height: 20px;
  }
  .q-field__native {
    padding: 0;
    min-height: 20px;
    color: #546E7A;
  }
}
</style>

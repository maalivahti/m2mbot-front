<template>
  <q-card-section class="bg-primary text-white q-pa-sm ts-summary__title">Сводка по отчету: {{ title }}</q-card-section>
  <!-- Сводка по работе оборудования -->

  <q-card class="ts-summary__work" flex flat bordered>
    <q-scroll-area style="width: 100%; height: 100%;">
      <q-card-section class="bg-deep-purple-2 text-indigo q-pa-sm sticky">
        <div class="text-subtitle2 text-center">Работа оборудования:</div>
      </q-card-section>
      <q-card-section>
        <q-tree :nodes="workDetailTreeData"
                node-key="label"
                dense
        >
          <template v-slot:header-head="prop">
            <div class="row items-center col-12">
              <list-item :label="prop.node.label">{{ prop.node.count }}</list-item>
            </div>
          </template>
          <template v-slot:header-child="prop">
            <div class="row items-center col-12">
              <list-item :label="prop.node.label">{{ prop.node.count }}</list-item>
            </div>
          </template>
        </q-tree>

        <!--        <q-list dense>-->
        <!--          <list-item label="Всего подключено:">{{ summaryData.work_items.all_item }}</list-item>-->
        <!--          <list-item label="Исправно:">{{ summaryData.work_items.okay_item }}</list-item>-->
        <!--          <list-item label="С замечаниями:">{{ summaryData.work_items.bad_item }}</list-item>-->
        <!--          <list-item label="Не выходят на связь:">{{ summaryData.work_items.not_online }}</list-item>-->
        <!--        </q-list>-->

      </q-card-section>
    </q-scroll-area>
  </q-card>

  <!-- Сводка по сливам топлива -->
  <q-card class="ts-summary__fdown" flex flat bordered>
    <q-scroll-area style="width: 100%; height: 100%;">
      <q-card-section class="bg-yellow-3 text-indigo q-pa-sm sticky">
        <div class="text-subtitle2 text-center">Сливы топлива:</div>
      </q-card-section>
      <q-card-section>
        <q-tree :nodes="fdownDetailTreeData"
                node-key="label"
                dense
        >
          <template v-slot:header-head="prop">
            <div class="row items-center col-12">
              <list-item :label="prop.node.label">{{ prop.node.count }} ({{ prop.node.vol }} л)</list-item>
            </div>
          </template>

          <template v-slot:header-child="prop">
            <div class="row items-center col-12">
              <list-item :label="prop.node.label">{{ prop.node.count }} л</list-item>
            </div>
          </template>

        </q-tree>
      </q-card-section>
    </q-scroll-area>
  </q-card>

  <!-- Сводка по расходу топлива -->
  <q-card class="ts-summary__consum" flex flat bordered>
    <q-scroll-area style="width: 100%; height: 100%;">
      <q-card-section class="bg-deep-orange-4 text-indigo q-pa-sm sticky">
        <div class="text-subtitle2 text-center">Расход топлива:</div>
      </q-card-section>
      <q-card-section>
        <q-tree :nodes="consumDetailTreeData"
                node-key="label"
                dense
        >
          <template v-slot:header-head="prop">
            <div class="row items-center col-12">
              <list-item :label="prop.node.label" v-if="prop.node.count">{{ prop.node.count }} л</list-item>
              <list-item :label="prop.node.label" v-else>{{ prop.node.vol }} л / {{ prop.node.perc }} %</list-item>
            </div>
          </template>

          <template v-slot:header-child="prop">
            <div class="row items-center col-12">
              <list-item :label="prop.node.label">{{ prop.node.count }} л/ {{ prop.node.vol }} %</list-item>
            </div>
          </template>

        </q-tree>
      </q-card-section>
    </q-scroll-area>
  </q-card>

  <!-- Сводка по заправкам -->
  <q-card class="ts-summary__refuel" flex flat bordered>
    <q-scroll-area style="width: 100%; height: 100%;">
      <q-card-section class="bg-green-4 text-indigo q-pa-sm sticky">
        <div class="text-subtitle2 text-center">Заправки:</div>
      </q-card-section>
      <q-card-section>
        <q-list dense>
          <list-item label="Выдано по ведомости:">{{ summaryData.fup_items.check_count }}
            ({{ summaryData.fup_items.check_sum }} л)
          </list-item>
          <list-item label="Выдано по СМТ:">{{ summaryData.fup_items.smt_count }} ({{ summaryData.fup_items.smt_sum }}
            л)
          </list-item>
          <list-item label="Разница:">{{ summaryData.fup_items.dif_sum }} л ({{ summaryData.fup_items.dif_avg_p }} %)
          </list-item>
        </q-list>
      </q-card-section>
    </q-scroll-area>
  </q-card>

  <!-- Сводка по превышениям скорости -->
  <q-card class="ts-summary__speed" flex flat bordered>
    <q-scroll-area style="width: 100%; height: 100%;">
      <q-card-section class="bg-red-2 text-indigo q-pa-sm sticky">
        <div class="text-subtitle2 text-center">Превышения скорости:</div>
      </q-card-section>
      <q-card-section>
        <q-tree :nodes="speedDetailTreeData"
                node-key="label"
                dense
        >
          <template v-slot:header-head="prop">
            <div class="row items-center col-12">
              <list-item :label="prop.node.label">{{ prop.node.count }} л</list-item>
            </div>
          </template>

          <template v-slot:header-child="prop">
            <div class="row items-center col-12">
              <list-item :label="prop.node.label">{{ prop.node.count }}</list-item>
            </div>
          </template>

        </q-tree>
      </q-card-section>
    </q-scroll-area>
  </q-card>
</template>

<script setup>
import { computed } from 'vue';
import { ListItem } from 'src/shared/ListItem';
import convertDetailDataToTree from '../helpers/convertDetailDataToTree';

// eslint-disable-next-line
const props = defineProps({
  summaryData: { type: Object, required: true },
  title: { type: String, required: true },
});

const workDetailTreeData = computed(() => ([
  {
    label: 'Всего подключено:',
    count: props.summaryData.work_items.all_item,
    header: 'head',
  },
  {
    label: 'Исправно:',
    count: props.summaryData.work_items.okay_item,
    header: 'head',
  },
  {
    label: 'С замечаниями:',
    count: props.summaryData.work_items.bad_item,
    header: 'head',
    children: convertDetailDataToTree(props.summaryData.work_items.bad_item_data, 'name_obj', 'child', 'res_row'),
  },
  {
    label: 'Не выходят на связь:',
    count: props.summaryData.work_items.not_online,
    header: 'head',
    children: [
      {
        label: 'причина не уточнена:',
        count: props.summaryData.work_items.hz_data.length,
        header: 'child',
        children: convertDetailDataToTree(props.summaryData.work_items.hz_data, 'name_obj', 'child'),
      },
      {
        label: 'необходим выезд:',
        count: props.summaryData.work_items.work_bad_data.length,
        header: 'child',
        children: convertDetailDataToTree(props.summaryData.work_items.work_bad_data, 'name_obj', 'child'),
      },
      {
        label: 'простой:',
        count: props.summaryData.work_items.stay_b_data.length,
        header: 'child',
        children: convertDetailDataToTree(props.summaryData.work_items.stay_b_data, 'name_obj', 'child'),
      },
      {
        label: 'ремонт:',
        count: props.summaryData.work_items.repair_data.length,
        header: 'child',
        children: convertDetailDataToTree(props.summaryData.work_items.repair_data, 'name_obj', 'child'),
      },
    ],
  },
]));

const fdownDetailTreeData = computed(() => ([
  {
    label: 'Подтверждено:',
    count: props.summaryData.fd_items.fd_count,
    vol: props.summaryData.fd_items.fd_sum,
    header: 'head',
    children: convertDetailDataToTree(props.summaryData.fd_items.fd_detail, 'name_obj', 'child', 'vol'),
  },
]));

const consumDetailTreeData = computed(() => ([
  {
    label: 'Расход по нормам:',
    count: props.summaryData.consum_items.consum_norm,
    header: 'head',
  },
  {
    label: 'Расход по СМТ:',
    count: props.summaryData.consum_items.consum_smt,
    header: 'head',
  },
  {
    label: 'перерасход (-) / экономия (+):',
    perc: props.summaryData.consum_items.dif_perc_avg,
    vol: props.summaryData.consum_items.dif_sum,
    header: 'head',
    children: convertDetailDataToTree(props.summaryData.consum_items.dif_detail, 'name_obj', 'child', ['dif_cons', 'dif_p']),
  },
]));

const speedDetailTreeData = computed(() => ([
  {
    label: 'Количество нарушений:',
    count: props.summaryData.overspeed_items.ovsp_count,
    header: 'head',
    children: convertDetailDataToTree(props.summaryData.overspeed_items.ovsp_detail, 'name_obj', 'child', 'count_ovsp'),
  },
]));

console.log('summaryData', props.summaryData);
</script>

<style lang="scss" scoped>
.ts-summary__title {
  grid-area: 1/1/2/7;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.ts-summary__work {
  grid-area: 2/1/13/3;
}

.ts-summary__fdown {
  grid-area: 2/3/7/5;
}

.ts-summary__consum {
  grid-area: 7/3/13/5;
}

.ts-summary__refuel {
  grid-area: 2/5/8/7;
}

.ts-summary__speed {
  grid-area: 8/5/13/7;
}

.q-item {
  padding: 8px 0;
  min-height: 32px;
  width: 100%;
}
</style>

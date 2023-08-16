<template>
  <q-input class="filter-input"
           dense
           label-color="blue-grey-7"
           v-model="formatDate"
           :label="dateLabel"
           @click="$refs.qDateProxy.show()"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer" color="primary">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale" ref="qDateProxy">
          <q-date v-model="dateValue" emit-immediately @update:model-value="checkValue" default-view="Months">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat/>
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { computed, ref } from 'vue';
import { date } from 'quasar';

const emit = defineEmits(['date', 'update:date']);

const props = defineProps({
  date,
  dateLabel: { type: String, required: false },
});

const dateValue = computed({
  get() {
    return props.date;
  },
  set(value) {
    emit('update:date', value);
    emit('date', value);
  },
});

const formatDate = computed(() => date.formatDate(dateValue.value, 'MMMM YYYY'));
const qDateProxy = ref(null);

function checkValue(val, reason) {
  if (reason === 'month') {
    qDateProxy.value.hide();
  }
}

</script>

<style lang="scss">
.filter-input {
  width: 180px;
  font-size: 12px;
  white-space: nowrap;
}
</style>
